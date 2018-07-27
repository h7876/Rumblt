import React, {Component} from 'react';
import './LoginHeader.css';
import logo from './icons/logo.svg';
import search from './icons/search.svg';




export default class LoginHeader extends Component{
    constructor(){
        super()
        this.state={
            
        }

    }

    render(){
        return(
            <div id='loginnavBar'>
                <div id='loginlogoContainer'>
                    <img id='logo' src={logo} alt=""/>
                    <div id="search">
                    <div id="searchbar">
                    <img className='glass' src={search} alt=""/>
                    Search rumblt
                    </div>
                    </div>
                </div>
               
            </div>
        )
    }
}