import React, {Component} from 'react';
import axios from 'axios';
import love from './icons/love.svg';
import notloved from './icons/notloved.svg';

var imgStyle = {
    width: 25,
    height: 25
  }

export default class ProfileFeed extends Component{
    constructor(props){
        super(props)

        this.state={
            likenum: 0
        }
    }

componentDidMount(){
    console.log(this.props)
    this.numberWithCommas();
}

numberWithCommas(){
    const num = Math.floor(Math.random()*10000);
    var commaNum = num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    this.setState({likenum: num})
}

    getLikeIds() {
        axios.get(`/api/get_like_ids/${this.props.match.params.userid}`).then( response => {
          // console.log('TEST get like ids', response.data);
          let newArray = response.data.map( obj => {
            return +obj.postid
          })
          // console.log('newArray!!', newArray)
          this.setState({like_ids: newArray});
        }).catch( error => {
          console.log('get like ids error', error);
        })
      }
      
      //Set up method handleChangeToPosts() axios.get the posts they have made,  
      //(starting with the most recent), set them on state
      handleChangeToPosts() {
        this.getPostsByUser();
      }
      
      //Set up method handleChangeToLikes() axios.get the posts they have made 
      //which have the most “hearts”. Sort from most to least.
      handleChangeToLikes() {
        this.setState({subheader: 'Likes'});
        axios.get(`/api/get_profile_user_likes/${this.props.match.params.userid}`).then( response => {
          // console.log('get profile liked posts results', response.data);
          this.setState({posts: response.data});
        }).catch ( error => {
          console.log('get profile trending posts error', error);
        })
      }
      
      //Set up handlePostLikeOnClick()
      handlePostLikeOnClick(userid, postid) {
        axios.post(`/api/likes/`, {
          userid: userid,
          postid: postid
        }).then( () => {
          this.getLikeIds();
          this.setState({likenum: this.state.likenum+1})
        }).catch( error => {
          console.log('add post like error', error)
        })
      }
      
      //Set up handlePostUnlikeOnClick()
      handlePostUnlikeOnClick(userid, postid) {
        axios.delete(
          `/api/likes/${userid}/${postid}`
        ).then( () => {
          this.getLikeIds();
        }).catch( error => {
          console.log('delete post like error', error)
        })
      }

    render(){
        return(
            <div>
                 {this.props.posts ?
            <div className='profile_posts'>
              {this.props.posts.map( obj => {
                console.log(obj)
                return (

                  <div className="postcontainer">
                  <div className="postimgcontainer">
                  <img src={obj.userimg} alt=""/>
                  </div>
                  <div key={obj.id} className='profile_post'>

                  <div className="ppheader">
                  {obj.username}
                  </div>
                    <div className='profile_post_content_container'>
                      {obj.type === 'img' ? 
                      <img className='postcontentimg' src={obj.img} alt='profile post content' /> : 
                      <p className='postcontenttext'>{obj.content}</p>}
                    </div>

                    <div className='profile_post_footer'>
                    <div className="ppfnotes">
                    {`${this.state.likenum} notes`}
                    </div>
                      <div className='profile_post_actions_container'>
                        {/* {this.state.like_ids.indexOf(obj.id) < 0 ? 
                          <img className='profile_post_action_notloved' src={notloved} alt='Not Loved Icon' style={imgStyle} onClick={ () => this.handlePostLikeOnClick(this.props.match.params.userid, obj.id) }/> : 
                          <img className='profile_post_action_loved' src={love} alt='Love Icon' style={imgStyle} onClick={ () => this.handlePostUnlikeOnClick(this.props.match.params.userid, obj.id) }/>
                        } */}
                      </div>
                    </div>
                    </div>
                  </div>
                )
              })}
            </div> :
            <p>no posts made yet!</p> }
            </div>
        )
    }
}