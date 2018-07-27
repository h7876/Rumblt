import React from 'react';
import axios from 'axios'
import './ChatModal.css'

export default function ChatModal(props){
    

    return(
        <div id='cmmain'>
            <div className="cmheader">
                <div className="cmhleft">

                    <div className="cmimg">
                        <img src='https://refsheet.net/assets/default.png' alt=""/>
                    </div>

                    <div className="cmusername">
                        USERNAME
                    </div>

                </div>

                <div className="cmhright">
                    <div className="cmnewmessage">
                        New Message
                    </div>
                </div>
            </div>

            <div className="cmbody">
            <div className="cmaddmessage">
            FOLLOWING
            </div>
            <div className="cmpeople">
            {props.users.map(user=>{
                return(
                    <div id='cmpeoplecontainer' key={user.id}>
                        <div className="peopleimg">
                        <img src={user.userimg !== null ? user.userimg : 'https://78.media.tumblr.com/004fac2f3b9691a47941d0710496bfff/tumblr_o51oavbMDx1ugpbmuo9_540.png'} alt=""/>
                        </div>
                        <div className="peopletext">
                        <div  className='txt weight'>{user.username}</div>
                        <div className='txt'>{user.blogtitle}</div>
                        <div className='txt mess'>Send a message</div>
                        
                        </div>
                    </div>
                )
            })}
            </div>
            
            </div>
        </div>
    )
}
