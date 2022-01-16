import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import './TextPost.css';
const CancelToken = axios.CancelToken;
const source = CancelToken.source();

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

    handleTextChange(event) {
        this.setState({ textInput: event.target.value })
    }

    handleTagChange(event) {
        this.setState({ tagInput: event.target.value })
    }

    sendText() {
        let { textInput, type, tagInput } = this.state;
        let { uid } = this.props.authUser;
        axios.post('/api/posts/new', { textInput, type, tagInput, uid }, { cancelToken: source.token }).then((response) => {
            this.setState({ textInput: '', tagInput: '' }, this.props.toggleClose)
        }).catch(function (thrown) {
            if (axios.isCancel(thrown)) {
                console.log('Request canceled', thrown.message);
            } else {
                console.log("Error posting text")
            }
        })
    }

    render() {

        return (
            <div className='text-input'>
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
                    <button onClick={() => { this.sendText() }} >Post</button>
                    <button onClick={() => this.props.toggleClose()}>Close</button>
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
