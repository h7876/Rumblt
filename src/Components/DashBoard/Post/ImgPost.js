import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import './ImgPost.css';

export class ImgPost extends Component {
    constructor() {
        super();
        this.state = {
            imgurl: '',
            textInput:'',
            tagInput:'',
            type:'img'
        }
        this.handleTagChange = this.handleTagChange.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleUrlChange = this.handleUrlChange.bind(this);
        this.sendText = this.sendText.bind(this);
    }

    handleTextChange (event) {
        this.setState({ textInput: event.target.value })
    }

    handleTagChange (event) {
        this.setState({ tagInput: event.target.value })
    }

    handleUrlChange (event) {
        this.setState({ imgurl: event.target.value })
    }

    sendText () {
   
        let {imgurl, textInput, type, tagInput} = this.state;
        let {uid} = this.props.authUser;
        axios.post('/api/posts/new', {type, tagInput, textInput, uid, imgurl}).then(() => {
            this.setState({textInput: '', tagInput: '', imgurl: ''})
        
        })
    }

    render() {
        
        return (
            <div className='img-input'>
                <input
                id='inputtwo'
                value={this.state.imgurl}
                onChange={this.handleUrlChange}
                type='text'
                placeholder='image url'
                />
                 <textarea
                id='inputone'
                value={this.state.textInput}
                onChange={this.handleTextChange}
                type='text'
                placeholder='Whatcha thinkin about?'
                />
                 <input
                 id='tag'
                value={this.state.tagInput}
                onChange={this.handleTagChange}
                type='text'
                placeholder='add some tags!'
                />
             <div className="buttonwrapper">
                <button onClick={()=>{this.sendText(), this.props.toggleClose()}} >Post</button>
                <button onClick={()=>this.props.toggleClose()}>Close</button>
                </div>

            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    authUser: state.sessionState.authUser
   });
   
   const authCondition = (authUser) => !!authUser;
   
   export default connect(mapStateToProps)(ImgPost);