import React, { Component } from 'react';
import axios from 'axios';
import './RandomPost.css'
import AddChat from './Icons/AddChat';
import Reblog from './Icons/Reblog';
import { connect } from 'react-redux';

class RandomPost extends Component {
    constructor(props) {
        super(props)
        this.state = {
            displayPost: {},
            likenum: 0,
            liked: false
        }
        this.getRandomPost = this.getRandomPost.bind(this);
        this.like = this.like.bind(this);
        this.getPostLikes = this.getPostLikes.bind(this);
    }

    componentDidMount() {
        this.getRandomPost();
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
            axios.delete(`/api/likes/${userid}/${this.state.displayPost.id}`,).then(
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

    getRandomPost(){
        axios.get('/api/randpost/').then(res => {
            this.setState({ displayPost: res.data });
        })
    }
    followUser() {
        axios.post(`/api/newFollower/${this.props.authUser.uid}/:followeduserid`)
            .then(
                this.getPostLikes()
            )
    }

    render() {
        let t = this.state.displayPost;
        let notes = this.state.likenum + ' notes';

        return (
            <div>
                <div className='radar'>
                    RADAR
                </div>
                <div id="rpheader">
                    <div className="rpright">
                        <div id='rpimage' onClick={() => { window.location.href = `#/profile/${t.userid}` }}>
                            {t.userimg === null ? <img src='https://78.media.tumblr.com/9f9b498bf798ef43dddeaa78cec7b027/tumblr_o51oavbMDx1ugpbmuo7_540.png' alt="" /> : <img src={t.userimg} alt="" />}
                        </div>
                        <div id='rpuserinfo'>
                            <div id='rpusername'>
                                {t.username}
                            </div>
                            <div className='rpblogtitle'>
                                {t.blogtitle}
                            </div>
                        </div>
                    </div>
                    <div className="rpleft">
                        <div className="rpaddbutton">
                            <AddChat />
                        </div>
                    </div>
                </div>
                <div id="rpcontent">
                    {this.state.displayPost.type === 'img' ?
                        <div id='rpbkg'>
                            <img src={t.img ? t.img : t.content} alt="" />
                        </div>
                        : <div id='nonimage'>
                            {t.content}
                        </div>}
                </div>
                <footer id='rpfoot'>
                    <div className="footleft">
                        { notes }
                    </div>
                    <div className="footright">
                        <Reblog />
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
                </footer>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    authUser: state.sessionState.authUser
});

const authCondition = (authUser) => !!authUser;
export default connect(mapStateToProps)(RandomPost)