import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios'
import './ExplorePosts.css'
import Reblog from '../../DashBoard/Icons/Reblog';

class ExplorePosts extends Component {
    constructor(props) {
        super(props)

        this.state = {
            liked: false,
            likenum: 0,
            hide: false,
            likenum: 0
        }
        this.like = this.like.bind(this);
        this.getPostLikes = this.getPostLikes.bind(this);
    }

    componentDidMount() {
        this.getUserLikes();
        this.getPostLikes();
    }

    getUserLikes() {
        let userid = this.props.authUser.uid;
        axios.get('/api/userLikes/' + userid).then((likesResponse) => {
            likesResponse.data.map((el, i) => {
                if (el.userid == userid && el.postid == this.props.id) {
                    this.setState({ liked: true })
                }
            })
        })
    }

    like() {
        let userid = this.props.authUser.uid
        let postid = this.props.id
        if (this.state.liked === false) {
            axios.post('/api/likes/', { userid, postid }).then(
                this.setState({
                    liked: !this.state.liked,
                    likenum: this.state.likenum + 1
                })
            )
        }
        else {
            axios.delete(`/api/likes/${userid}/${postid}`,).then(
                this.setState({
                    liked: !this.state.liked,
                    likenum: this.state.likenum - 1
                })
            )
        }
    }

    getPostLikes() {
        axios.get('/api/getLikeCount/' + this.props.id).then((response) => {
            this.setState({ likenum: response.data[0].count })
        })
    }

    render() {
        let notes = this.state.likenum + ' notes';

        return (
            <div id='dpmain'>
                <div className="dpheader">
                    <div className="dphimg">
                        <img src={this.props.userimg !== null ? this.props.userimg : 'https://78.media.tumblr.com/7836b60682b22daba411f54abe10fe4b/tumblr_o51oavbMDx1ugpbmuo8_540.png'} alt="" />
                    </div>
                    <div className="dphusername">
                        {this.props.username}
                    </div>
                    <div className="dphfollow">
                        Follow
                    </div>
                </div>

                <div className="dpcontent">
                    {this.props.type === 'img' ?
                        <div className="pdcontent">
                            <img src={this.props.img} alt="" />
                        </div>
                        :
                        <div className='pdtext'>
                            <p>{this.props.content}</p>
                        </div>
                    }
                </div>
                <div className="dpfooter">
                    <div className="dpfnotes">
                        {notes}
                    </div>
                    <div className="dpficons">
                        <Reblog />
                        <div id='addLike'>
                            <svg
                                id="footicon"
                                data-name="Layer 1"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 315 278.01">
                                <title>{this.state.liked ? 'unlove' : 'love'}</title>
                                <path id={this.state.liked ? 'heartActive' : 'heart'} onClick={this.like}
                                    d="M663,211a81,81,0,0,0-146-48.33A81,81,0,1,0,400.6,273.6L508.51,381.51a12,12,0,0,0,17,0L633.4,273.6A80.83,80.83,0,0,0,663,211Z"
                                    transform="translate(-359.5 -118.5)"
                                />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    authUser: state.sessionState.authUser
});

const authCondition = (authUser) => !!authUser;
export default connect(mapStateToProps)(ExplorePosts);