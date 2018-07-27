import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import './TextPost.css';

export class TextPost extends Component {
    constructor() {
        super();
        this.state = {
            textInput: '',
            tagInput: '',
            type: 'text',
        
        }
        this.handleTagChange = this.handleTagChange.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.sendText = this.sendText.bind(this);
    }

    handleTextChange (event) {
        this.setState({ textInput: event.target.value })
    }

    handleTagChange (event) {
        this.setState({ tagInput: event.target.value })
    }

    sendText () {
        let {textInput, type, tagInput} = this.state;
        let {uid} = this.props.authUser;
        axios.post('/api/posts/new', {textInput, type, tagInput, uid}).then(() => {
            this.setState({textInput: '', tagInput: ''})
        })
    }
    

    render () {
        
        return (
            <div className = 'text-input'>

                <textarea
                id='inputone'
                value={this.state.textInput}
                onChange={this.handleTextChange}
                type='text'
                placeholder='Whatcha thinkin about?'
                />
                 <input
                 id='inputtwo'
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
   
   export default connect(mapStateToProps)(TextPost);
