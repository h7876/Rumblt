import React, { Component } from 'react';
import axios from 'axios';
import './RandomPost.css'
import AddChat from './Icons/AddChat';
import AddLike from './Icons/AddLike';
import Reblog from './Icons/Reblog';

export default class RandomPost extends Component {
    constructor() {
        super()
        this.state = {
            displayPost: {}
        }
    }

    componentDidMount() {
        axios.get('/api/randpost/').then(res => {
            this.setState({ displayPost: res.data });
        })
    }

    followUser() {
        axios.post(`/api/newFollower/${this.props.authUser.uid}/:followeduserid`)
    }

    numberWithCommas() {
        const num = Math.floor(Math.random() * 10000);
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    render() {
        let t = this.state.displayPost;
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
                        {`${this.numberWithCommas()} notes`}
                    </div>
                    <div className="footright">
                        <Reblog />
                        <AddLike />
                    </div>
                </footer>
            </div>
        )
    }
}
