import axios from 'axios'
import React, { Component } from 'react'
// import ChatInput from './ChatInput'
import {groupChat} from '../store/action/chatAction'
import {connect} from 'react-redux'
import {GroupChatServices} from '../store/services/chatServices'


 class createRoom extends Component {
    constructor(props) {
        super(props)
        // this.greet = this.greet.bind(this)
        this.state = {
            docs: []
        }
    }

    // greet(value) {
    //     const {docs} = this.state
    //     return this.setState({
    //         docs : docs.concat(value),
    //     })
    // }

    componentDidMount() {
        // this.props.dispatch(groupChat());
        this.props.GroupChatServices();
     
    }

    render() {
        console.log("react->app", this.props.chats)
        return (
            <div>
                <div className="side-menu">
                    <a className="room-button">Hello World</a>
                    {this.props.chats.map((doc, index) => (
                        <a className="room-button" href={`/private/${doc.id}`}>{doc.name}</a>
                    ))}
                    <a className="room-button" id = "create-room-button" href="/home">
                        <strong>+</strong>
                    </a>
                </div>
                
              
            </div>
            
        )
    }
}


const mapStateToProps = (state) => (
    {
        chats: state.chat.chats
    }
) 

export default connect(mapStateToProps,{GroupChatServices})(createRoom)
