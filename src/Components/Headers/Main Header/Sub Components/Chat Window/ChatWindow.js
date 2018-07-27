import React, {Component} from 'react';
import './ChatWindow.css'


export default function ChatWindow(){

    

        return(
            
        <div id='mainChat'>

        <div className="mctop">
            <div className="mctheader">
            <div className="mctimg">
            IMG
            USERNAME
            </div>
            <div className="mctnew">
            New Message
            </div>
            </div>
        </div>

            <div className="mcbottom">
            <div className="cbody">
            Chat Body
            </div>
            </div>

        </div>
    )

}