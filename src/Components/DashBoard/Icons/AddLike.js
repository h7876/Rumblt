import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Icons.css'

//TODO: Evaluate and possibly remove. OR move all methods to here and remove from exploreposts/dashfeed etc
class AddLike extends Component {

    constructor(props) {
        super(props)

        this.state = {
            liked: false
        }
        this.likedPost = this.likedPost.bind(this);
    }

    likedPost() {
        this.setState({ liked: !this.state.liked })

    }

    render() {
        return (
            <div id='addLike'>
                <svg
                    id="footicon"
                    data-name="Layer 1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 315 278.01">
                    <title>{this.state.liked ? 'unlove' : 'love'}</title>
                    <path id={this.state.liked ? 'heartActive' : 'heart'} onClick={this.likedPost}
                        d="M663,211a81,81,0,0,0-146-48.33A81,81,0,1,0,400.6,273.6L508.51,381.51a12,12,0,0,0,17,0L633.4,273.6A80.83,80.83,0,0,0,663,211Z"
                        transform="translate(-359.5 -118.5)"
                    />
                </svg>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    authUser: state.sessionState.authUser
});

const authCondition = (authUser) => !!authUser;
export default connect(mapStateToProps)(AddLike)