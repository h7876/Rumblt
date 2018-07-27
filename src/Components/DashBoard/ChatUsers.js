import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import './ChatUsers.css'
import AddChat from './Icons/AddChat'

export class ChatUsers extends Component{
    constructor(){
        super()

        this.state={
            users: []
        }
    }
componentDidMount(){
    let followersArr = [];
    axios.get(`/api/followers/${this.props.authUser.uid}`).then(res=>{
        let followerIDArray = res.data;
        followerIDArray.map(el =>{
            axios.get(`/api/users/${el.followeduserid}`).then((res) => {
                let follower = res.data[0];
                followersArr.push(follower);
            }).then(() => {
                this.setState({users: followersArr})
            })
        })
    })
}

// followUser() {
//     axios.post(`/api/newFollower/${this.props.authUser.uid}/:followeduserid`)
// }

    render(){
        return(
            <div>
                {this.state.users.map(user=>{
                    let followuserid = user.userid;
                    return(
                        <div id='cu' key={user.id} onClick={() => {window.location.href=`#/profile/${user.userid}`}}>
                            <div id="culeft">
                            <div id="chatimage">
                            <img src={user.userimg} alt=""/>
                            </div>
                            <div id="cutextcontainer">
                            <div id="username">
                            {user.username}
                            </div>
                            <div id="cublogtitle">
                            {user.blogtitle}
                            </div>
                            </div>
                            </div>
                            <div id="curight">
                            <div id="acbutton">
                            <AddChat/>
                            </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    authUser: state.sessionState.authUser
});

const authCondition = (authUser) => !!authUser;
export default connect(mapStateToProps)(ChatUsers);