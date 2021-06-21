
import Header from './Header'
import CreateRoom from './CreateRoom'
import React, { Component } from 'react'
import axios from 'axios'
import Message from './Messages'
import {FindChatServices} from '../store/services/chatServices'
import {connect} from 'react-redux'

 class Find extends Component {

    constructor(props) {
        super(props)
        this.state = {
            // docs: []

        }
    }

    componentDidMount() {
        this.props.FindChatServices();
    }



    render() {
        console.log("react->apps", this.props.users)
        return (
            <div>
                <Header />
                <CreateRoom />
                
                <div className="finding">
                    {this.props.users.map((doc, index) => (
                        <a className="room-button" href={`/${doc.id}`}>{doc.userName}</a>
                    ))}

                   
                </div>
            </div>
        )
    }
}



const mapStateToProps = (state) => (
    {
        users: state.msg.users
    }
) 

export default connect(mapStateToProps,{FindChatServices})(Find)

