// eslint-disable-next-line

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { getUserFollowers } from '../../reducers/following';
import MainHeader from './../Headers/Main Header/MainHeader';
import love from './icons/love.svg';
import notloved from './icons/notloved.svg';
import default_profile_img from './temp_images/default_profile_pic.png';
import './Profile.css';
import ProfileFeed from './ProfileFeed';
import PFTwo from './PFTwo';

var imgStyle = {
  width: 25,
  height: 25
}

export class Profile extends Component {
  constructor() {
    super();

    this.state = {
      isExploreCurrent: false,
      profile_pic: default_profile_img,
      blog_title: 'blog title',
      user_id: '',
      posts: [],
      like_ids: [],
      subheader: 'Posts',
      headerImage: '',
      username: 'username',
      name: 'name',
      likenum: 0,
      followedByAuthUser: false
    }
    this.retriveProfileData = this.retriveProfileData.bind(this);
    this.getPostsByUser = this.getPostsByUser.bind(this);
    this.getLikeIds = this.getLikeIds.bind(this);
    this.handleChangeToPosts = this.handleChangeToPosts.bind(this);
    this.handleChangeToLikes = this.handleChangeToLikes.bind(this);
    this.handlePostLikeOnClick = this.handlePostLikeOnClick.bind(this);
    this.handlePostUnlikeOnClick = this.handlePostUnlikeOnClick.bind(this);
    this.checkFollowStatus = this.checkFollowStatus.bind(this);
  }

  componentDidMount() {
    this.checkFollowStatus();

    document.body.background = '#36465d';
    this.setState({ isExploreCurrent: true });
    this.retriveProfileData();
    this.getPostsByUser();
    // this.getFollowedBlogInfo();
    this.getLikeIds();
    this.getHeaderImg();

  }

  componentWillUnmount() {
    this.setState({ isExploreCurrent: false })
  }

  retriveProfileData() {
    axios.get(`/api/users/${this.props.match.params.userid}`).then((res) => {
      this.setState({
        profile_pic: res.data[0].userimg,
        blog_title: res.data[0].blogtitle,
        user_id: res.data[0].userid,
        username: res.data[0].username,
        name: res.data[0].name,
      })
    })
  }

  getPostsByUser() {
    this.setState({ subheader: 'Posts' });
    axios.get(`/api/posts/${this.props.match.params.userid}`).then(response => {
      this.setState({ posts: response.data });
    }).catch(response => {
      console.log('get profile posts error', response);
    })
  }

  getHeaderImg() {
    var images = ['https://media.giphy.com/media/leaEbNXAEY0rm/giphy.gif', 'https://i.imgur.com/nbhzCHk.gif', 'https://media.giphy.com/media/wGY9K8upRdJFm/giphy.gif', 'http://community.wolfram.com//c/portal/getImageAttachment?filename=vgrid17c.gif&userId=610054', 'https://s.tmimgcdn.com/blog/wp-content/uploads/2017/07/5963490e3d940026220505.gif?x54449',];

    var image = images[Math.floor(Math.random() * images.length)]
    this.setState({ headerImage: image })

  }

  getLikeIds() {
    axios.get(`/api/get_like_ids/${this.props.match.params.userid}`).then(response => {
      let newArray = response.data.map(obj => {
        return +obj.postid
      })
      this.setState({ like_ids: newArray });
    }).catch(error => {
      console.log('get like ids error', error);
    })
  }

  handleChangeToPosts() {
    this.getPostsByUser();
  }

  handleChangeToLikes() {
    this.setState({ subheader: 'Likes' });
    axios.get(`/api/get_profile_user_likes/${this.props.match.params.userid}`).then(response => {
      this.setState({ posts: response.data });
    }).catch(error => {
      console.log('get profile trending posts error', error);
    })
  }

  handlePostLikeOnClick(userid, postid) {
    axios.post(`/api/likes/`, {
      userid: userid,
      postid: postid
    }).then(() => {
      this.getLikeIds();
      this.setState({ likenum: this.state.likenum + 1 })
    }).catch(error => {
      console.log('add post like error', error)
    })
  }

  handlePostUnlikeOnClick(userid, postid) {
    axios.delete(
      `/api/likes/${userid}/${postid}`
    ).then(() => {
      this.getLikeIds();
    }).catch(error => {
      console.log('delete post like error', error)
    })
  }

  numberWithCommas() {
    const num = Math.floor(Math.random() * 10000);
    var commaNum = num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return num;
  }

  follow() {
    axios.post(`/api/newFollower/${this.props.authUser.uid}/${this.props.match.params.userid}`).then(() => {
      //add toaster
    })
  }

  unfollow() {
    axios.delete(`/api/unfollow/${this.props.authUser.uid}/${this.props.match.params.userid}`).then(() => {
      //add toaster
    })
  }

  checkFollowStatus() {
    axios.get(`/api/user/following/${this.props.authUser.uid}`).then(res => {
      res.data.map((el, id) => {
        if (el.followeduserid == this.props.match.params.userid) {
          this.setState({ followedByAuthUser: true })
        } else {
          this.setState({ followedByAuthUser: false })
        }
      })
    })
  }

  render() {
    return (
      <div id='profileMain'>
        <div id="headerdiv">
          <MainHeader />
        </div>
        <section className='below_header'>
          <div id="headerimgcontainer">
            <img id='headerImg' src={this.state.headerImage} alt="" />
          </div>
          <div className='profile_info_and_nav'>
            <div className="profpiccontainer">
              {this.state.profile_pic != null ?
                <img className='profile_pic' src={this.state.profile_pic} alt='profile pic' /> :
                <img className='profile_pic' src={default_profile_img} alt='profile pic' />}
            </div>
            <div className="profileuserinfo">
              <h1 className='name_of_blog'>
                {this.state.blog_title}
              </h1>
            </div>

            <div className='profile_navs_container'>
              <div className='profile_posts_nav ppn' onClick={this.getPostsByUser}>Posts</div>
              <div className='profile_trending_nav ppn' onClick={this.handleChangeToLikes}>Likes</div>
              {
                this.state.followedByAuthUser ?
                  <div className="ppn" onClick={() => { this.unfollow(), this.setState({ followedByAuthUser: false }) }}>Unfollow</div>
                  :
                  <div className="ppn" onClick={() => { this.follow(), this.setState({ followedByAuthUser: true }) }}>Follow</div>
              }
            </div>
          </div>
          <div className='posts_and_following_list'>
            {this.state.posts[0] ?
              <div className='profile_posts'>
                {this.state.posts.map((obj, i) => {
                  return (
                    <div className="postcontainer" key={i}>
                      <div className="postimgcontainer">
                        <img src={obj.userimg} alt="" />
                      </div>
                      <div key={obj.id} className='profile_post'>
                        <div className="ppheader">
                          "hello"
                        </div>
                        <div className='profile_post_content_container'>
                          {obj.type === 'img' ?
                            <img className='postcontentimg' src={obj.img} alt='profile post content' /> :
                            <p className='postcontenttext'>{obj.content}</p>}
                        </div>

                        <div className='profile_post_footer'>
                          <div className="ppfnotes">
                            {`${this.numberWithCommas()} notes`}
                          </div>
                          <div className='profile_post_actions_container'>
                            <svg
                              id="footicon"
                              data-name="Layer 1"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 315 278.01">
                              <title>love</title>
                              <path id={this.state.liked ? 'heartActive' : 'heart'}
                                d="M663,211a81,81,0,0,0-146-48.33A81,81,0,1,0,400.6,273.6L508.51,381.51a12,12,0,0,0,17,0L633.4,273.6A80.83,80.83,0,0,0,663,211Z"
                                transform="translate(-359.5 -118.5)"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div> :
              <p>no posts made yet!</p>}
          </div>
        </section>
      </div>
    )
  }
}
const mapStateToProps = (state) => ({
  authUser: state.sessionState.authUser,
  getUserFollowers
});

const authCondition = (authUser) => !!authUser;

export default connect(mapStateToProps)(Profile);

