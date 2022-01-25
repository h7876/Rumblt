import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

class ProfileFeed extends Component {
  constructor(props) {
    super(props)
    this.state = {
      likenum: 0,
      liked: false
    }
    this.getPostLikes = this.getPostLikes.bind(this);
    this.like = this.like.bind(this);
    this.getUserLikes = this.getUserLikes.bind(this);
  }

  componentDidMount() {
    this.getUserLikes();
    this.getPostLikes();
  }

  componentDidUpdate(prevProps) {
    if (this.props.subheader !== prevProps.subheader) {
      this.getUserLikes();
    }
  }

  getPostLikes() {
    axios.get('/api/getLikeCount/' + this.props.id).then((response) => {
      this.setState({ likenum: response.data[0].count })
    })
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


  getUserLikes() {
    let userid = this.props.authUser.uid
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

  render() {
    let notes = this.state.likenum + ' notes';
    return (
      <div>
        <div className='profile_posts'>
          <div className="postcontainer">
            <div className="postimgcontainer">
              <img src={this.props.userimg} alt="" />
            </div>
            <div key={this.props.id} className='profile_post'>
              <div className="ppheader">
                {this.props.username}
              </div>
              <div className='profile_post_content_container'>
                {this.props.type === 'img' ?
                  <img className='postcontentimg' src={this.props.img} alt='profile post content' /> :
                  <p className='postcontenttext'>{this.props.content}</p>}
              </div>
              <div className='profile_post_footer'>
                <div className="ppfnotes">
                  {notes}
                </div>
                <div className='profile_post_actions_container'>
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
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  authUser: state.sessionState.authUser
});

const authCondition = (authUser) => !!authUser;
export default connect(mapStateToProps)(ProfileFeed)