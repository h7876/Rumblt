import React, {Component} from 'react';
import  {connect} from 'react-redux';
import axios from 'axios'
import './ExplorePosts.css'
import AddLike from '../../DashBoard/Icons/AddLike';
import Reblog from '../../DashBoard/Icons/Reblog';
class ExplorePosts extends Component{
    constructor(props){
        super(props)

        this.state={
            liked: false,
            likenum: 0,
            hide: false
        }
    }


componentDidMount(){
    console.log('post porps', this.props)
    this.numberWithCommas();
        this.getUserLikes();
}

getUserLikes() {
    let userid = this.props.authUser.uid;
    axios.get('/api/userLikes/' + userid).then((likesResponse) => {
        likesResponse.data.map((el, i) => {
            if (el.userid == userid && el.postid == this.props.id) {
                this.setState({liked: true})
            }
        })
    })
}

like(){
    let userid = this.props.authUser.uid
    let postid = this.props.id
    if(this.state.liked === false){
        axios.post('/api/likes/', {userid, postid}).then(
            this.setState({liked: !this.state.liked,
                likenum: this.state.likenum+1
            })
        )
    }
    else {
        axios.delete(`/api/likes/${userid}/${postid}`,).then(
            this.setState({liked: !this.state.liked,
                likenum: this.state.likenum-1})
            
        )
    }

}

numberWithCommas(){
    const num = Math.floor(Math.random()*10000);
    var commaNum = num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    this.setState({likenum: num})
}

    render(){
        return(
            <div id='dpmain'>
                <div className="dpheader">
                <div className="dphimg">
                <img src={this.props.userimg !== null ? this.props.userimg : 'https://78.media.tumblr.com/7836b60682b22daba411f54abe10fe4b/tumblr_o51oavbMDx1ugpbmuo8_540.png'} alt=""/>
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
                <img src={this.props.img} alt=""/>
                </div>
                :
                <div className='pdtext'>
                <p>{this.props.content}</p>
                </div>
                }
                </div>

                <div className="dpfooter">
                <div className="dpfnotes">
                notes
                </div>
                <div className="dpficons">
                <Reblog/>
                <AddLike/>
                </div>
                
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state) => ({
    authUser: state.sessionState.authUser
});

export default connect(mapStateToProps)(ExplorePosts);