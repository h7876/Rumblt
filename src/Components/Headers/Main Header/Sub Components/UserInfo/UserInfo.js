import React from 'react';
import axios from 'axios';
import './UserInfo.css';
import {connect} from 'react-redux';
import SignOutButton from '../../../../Login/signOut';

export class UserInfo extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
                id: '',
                img: '',
                username: '',
                blogtitle: '',
                followingCount:0,
                followerCount:0
        }
        this.getFollowerCount = this.getFollowerCount.bind(this);
        this.getFollowingCount = this.getFollowingCount.bind(this);
    }

    componentDidMount () {
        this.getFollowerCount();
        this.getFollowingCount();

        this.setState({id: this.props.authUser.uid })

        axios.get(`/api/users/${this.props.authUser.uid}`).then((res) => {
            let {userimg, username, blogtitle} = res.data[0];
            this.setState({img: userimg, username: username, blogtitle: blogtitle})
            this.getFollowingCount();
        })
    }

    getFollowingCount () {
        axios.get(`/api/followingCount/${this.props.authUser.uid}`).then((res) => {
            console.log(res.data)
            this.setState({followingCount: res.data[0]});
        })
    }

    getFollowerCount() {
        axios.get(`/api/followerCount/${this.props.authUser.uid}`).then((res) => {
            this.setState({followerCount: res.data[0]});
        })
    }

    render () {
        console.log(this.state)
        console.log(this.props)
    return(
        <div id='ui'>
            <div className="uitop">

                <div className="uiheader">

                    <div className="uiheaderleft">
                    ACCOUNT
                    </div>

                    <div className="uiheaderright">
                    <SignOutButton/>
                    </div>

                </div>

                <div className="uilikes uicolumn hov">

                <div className="leftwrapper">

                    <div className="uiimage">
                    
                    </div>

                    <div className="uitext">
                    Likes
                    </div>

                </div>

                    <div className="uinum">
                    {this.props.likeCount}
                    </div>

                </div>
                
                <div className="uifollowing uicolumn hov">

                <div className="leftwrapper">

                    <div className="uiimage">
                    
                    </div>

                    <div className="uitext">
                    Following
                    </div>

                </div>

                    <div className="uinum">
                    {this.state.followingCount.count}
                    </div>

                </div>

                <div className="uisettings uicolumn hov">

                <div className="leftwrapper">
                    <div className="uiimage">
                    
                    </div>

                    <div className="uitext">
                    Settings
                    </div>
                </div>

                </div>

                <div className="uihelp uicolumn hov">

                <div className="leftwrapper">
                    
                    <div className="uiimage">
                    
                    </div>

                    <div className="uitext">
                    Help
                    </div>
                </div>
                
                </div>

            </div>


            <div className="uibottom">
                <div className="uiheader">

                    <div className="uiheaderleft">
                    RUMBLTRS
                    </div>

                    <div className="uiheaderright">
                    +New
                    </div>

                </div>

                <div className="uiuser hov" onClick={() => {window.location.href=`#/profile/${this.state.id
            }`}}>
                
                <div className="uiuserimg">
                <img src={this.state.img} alt=""/>
                </div>

                <div className="uiuserinfo">
                <div className="uiusername">
                {this.state.username}
                </div>
                <div className="uiblogtitle">
                {this.state.blogtitle}
                </div>
                </div>

                </div>

                <div className="uibtext hov">
                    <div className='uitext'>
                    Posts
                    </div>
                    <div className='uinum'>
                        {this.props.postCount}
                    </div>
                </div>

                <div className="uibtext hov">
                    <div className="uitext">
                    Followers
                    </div>
                    <div className='uinum'>
                        {this.state.followerCount.count}
                    </div>
                </div>

            </div>
        </div>
    )}
}

const mapStateToProps = (state) => ({
    authUser: state.sessionState.authUser
  });
  
  const authCondition = (authUser) => !!authUser;
  
  export default connect(mapStateToProps)(UserInfo);