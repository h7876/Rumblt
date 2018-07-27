import React, {Component} from 'react';
import './ExplorePosts.css'
class ExplorePosts extends Component{


componentDidMount(){
    console.log('post porps', this.props)
}

    render(){
        return(
            <div id='dpmain'>
                <div className="dpheader">
                header
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
                footer
                
                </div>
            </div>
        )
    }
}

export default ExplorePosts;