import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import './MainHeader.css'
import compass from './icons/compass.svg'
import home from './icons/home.svg';
import message from './icons/message.svg';
import profile from './icons/profile.svg';
import edit from './icons/edit.svg';
import search from './icons/search.svg';
import aHome from './icons/homeActive.svg'
import aExplore from './icons/aExplore.svg'
import aChat from './icons/aChat.svg'
import aProfile from './icons/aProfile.svg'
import UserInfo from './Sub Components/UserInfo/UserInfo';
import axios from 'axios';
import ChatWindow from './Sub Components/Chat Window/ChatWindow';
import ChatModal from './Sub Components/ChatModal/ChatModal';








export class MainHeader extends Component{
    constructor(){
        super()
        this.state={
            chatActive: false,
            profileActive: false,
            likeCount: 0,
            postCount: 0,
            users: []
           
        }
    }

    hideAll(){
        this.setState({
            chatActive: false,
            profileActive: false
        })
    }

   getLikeCount(){
        axios.get(`/api/likeCount/${this.props.authUser.uid}`).then(res=>{
            let cc = res.data[0]
            this.setState({likeCount: cc.count})
            
        })
   }
   
   getPostCount(){
        axios.get(`/api/postCount/${this.props.authUser.uid}`).then(res=>{
            let pc = res.data[0]
            this.setState({postCount: pc.count})
        })
   }

   getUsers(){
    axios.get('/api/users/').then(res=>{
        this.setState({users: res.data})
    })
   }


    componentDidMount(){
        this.getLikeCount();
        this.getPostCount();
        this.getUsers();
    }

    render(){
        return(
            <div id='headercontainer'>

            <div id='navBar'>
                <div id='logoContainer'>

                    <Link to='/dashboard'>
                        {/* <img  src={logo} alt="Link to dashboard"/> */}
                        <div id='logoh'>
        <svg id='headerLogo' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 71.5   83.61"><title>logo</title><path d="M883.29,476.83h0l0,0a14,14,0,0,    0-4.13-5.29c-10.11-9.89-23-3.28-30.21,1.94a12.68,12.68,0,0,0-3.65,2.88l-1,  .93-.83.65c-.91-1.75-.91-9.4-.91-9.4L813, 468v18h11v47H813v17h47V533l-11.5-.5v-41s0-6.61,8.26-6.31a14,14,0,1,0,    26.53-8.36Z" transform="translate(-813 -466.39)"/></svg>
        </div>
                    </Link>

                    <div id="search">
                        <div id="searchbar">
                            <img className='glass' src={search} alt="Search icon"/>
                                Search rumblt
                        </div>
                    </div>

                </div>

                <div id='iconContainer'>

                    <Link to='/dashboard'>
                        <img id='iconh' src={this.props.isDashCurrent ? aHome : home} alt=""  />
                    </Link>

                    <Link to='/explore'>
                        <img id='iconh' src={this.props.isExploreCurrent? aExplore : compass}   alt=""/>
                    </Link>

                    <img id='iconh' src={this.state.chatActive ? aChat : message} alt="" onClick={()=>
                    {this.setState({chatActive: !this.state.chatActive, profileActive: false})}}/>



                    <img id='iconh' src={this.state.profileActive ? aProfile : profile} alt=""
                    onClick={()=>{
                        this.setState({profileActive: !this.state.profileActive, chatActive: false})
                        this.getPostCount();
                        this.getLikeCount();
                    }}
                    />

                    <img id='edit' src={edit} alt=""/>

                </div>

            </div>

            <div id="modals">
            {this.props.isExploreCurrent ? 
            <section className='subheader'>
              <div className="categories">
                <p className='trending' onClick={this.handleChangeToTrending}>Trending</p>
                <p className='staff_picks' onClick={this.handleChangeToStaffPicks}>Staff Picks</p>
                <p className='text' onClick={this.handleChangeToText}>Text</p>
                <p className='photos' onClick={this.handleChangeToPhotos}>Photos</p>
              </div>
              </section>
        : null}
            <div className={this.state.profileActive ? 'userinfomod' : 'userinfomod hidemodal'}>
            <UserInfo currentuser={this.props.currentuser} postCount={this.state.postCount} likeCount={this.state.likeCount}/>
            </div>

            <div className={this.state.chatActive ? 'chatmod' : 'chatmod hidemodal'}>
            <ChatModal users={this.state.users} currentuser={this.props.currentuser}/>
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

export default connect(mapStateToProps)(MainHeader);