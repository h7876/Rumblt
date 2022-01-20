// eslint-disable-next-line

import React, { Component } from 'react';
import './Dashfeed.css'
import AddLike from '../Icons/AddLike';
import { connect } from 'react-redux';
import axios from 'axios';

class DashFeed extends Component {
    constructor(props) {
        super(props)

        this.state = {
            randomImg: ['https://78.media.tumblr.com/7d376efd024eadd902a8bb60c8155c94/tumblr_o51oavbMDx1ugpbmuo4_540.png', 'https://78.media.tumblr.com/004fac2f3b9691a47941d0710496bfff/tumblr_o51oavbMDx1ugpbmuo9_540.png', 'https://78.media.tumblr.com/9f9b498bf798ef43dddeaa78cec7b027/tumblr_o51oavbMDx1ugpbmuo7_540.png', 'https://78.media.tumblr.com/2060fe62b7ed3b46e5789356942a305e/tumblr_o51oavbMDx1ugpbmuo2_540.png'],
            liked: false,
            likedPost: '',
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
                    likenum: ++this.state.likenum
                })
            )
        }
        else {
            axios.delete(`/api/likes/${userid}/${postid}`,).then(
                this.setState({
                    liked: !this.state.liked,
                    likenum: --this.state.likenum
                })
            )
        }
    }

    getPostLikes(){
        axios.get('/api/getLikeCount/' + this.props.id).then((response) => {
            this.setState({likenum: response.data[0].count})
        })
    }

    render() {
        let notes = this.state.likenum + ' notes';

        return (
            <div id='maindashfeed'>
                <div className="posterimage">
                    {this.props.userimg !== null ?
                        <img src={this.props.userimg} alt="" /> :
                        <img src={this.state.randomImg[Math.floor(Math.random() * this.state.randomImg.length)]} alt="" />
                    }
                </div>
                <div className="postdisplay">
                    <div className="pdheader" onClick={() => { window.location.href = `/#/profile/${this.props.userid}` }}>
                        {this.props.username}
                    </div>
                    {this.props.type === 'img' ?
                        <div className="pdcontent">
                            <img src={this.props.img} alt="" />
                        </div>
                        :
                        <div className='pdtext'>
                            <p>{this.props.content}</p>
                        </div>
                    }
                    <div className="pdfooter">
                        <div className="desc">
                            {this.props.tag === null || this.props.tag === '' ? null :
                                `#${this.props.tag}`
                            }
                        </div>
                        <div className="footerfooter">
                            <div className="notes">
                                { notes }
                            </div>
                            <div id="fficons">
                                {/* Replace this with addlike */}
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
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    authUser: state.sessionState.authUser
});

const authCondition = (authUser) => !!authUser;
export default connect(mapStateToProps)(DashFeed)