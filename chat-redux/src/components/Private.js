import Header from './Header'
import CreateRoom from './CreateRoom'
import React, { Component } from 'react'
import axios from 'axios'
import Message from './Messages'
import ChatInput from './ChatInput'
import { connect } from 'react-redux'
import { CreateMessage, getMsg } from '../store/action/messageAction'


class Private extends Component {

    constructor(props) {
        super(props)
        this.state = {
            Text:"",
            id :this.props.paramid
        }
    }

    componentDidMount() {
        // const id = this.props.match.params.id;
        // console.log(this.state.id);
        // console.log("idssss", this.props.paramid)
        console.log("ideas",this.state.id)
        var id = this.props.paramid;
        //    this.props.AddChat

        this.props.MessagePage(id)

    }


    executeLogin = () => {

        var model = {
            ChatId: +this.props.paramid,
            Name: this.props.username,
            Text: this.state.Text,
        }
        console.log("model", model)
    
        
        this.props.AddChat(model);
     
      }


    render() {
        
        const { id } = this.state;
        console.log("react->apps", this.props.messages)
        // console.log("username", this.props.username)
        // console.log("idssss0", this.props.paramid)
        // console.log("id", this.props.MessagePage())

        // let obj1 = {id: 10, name: "quershi", text: "Hi Not Errors", timestamp: "2015-05-02T00:00:00", chatId: 2}
        // let  obj = {...this.props.messages.messages, ...obj1 };
        // console.log("obj",obj)
        
        // let arr1 = ({...this.props.messages.messages});
        // console.log("fgfgf",arr1)
        // let arr2 = [{id: 10, name: "quershi", text: "Hi Not Errors", timestamp: "2015-05-02T00:00:00", chatId: 2}]
        // Array.prototype.push.apply(arr1,arr2);
        // console.log("test",arr1);
        
        console.log(this.state.Text)
        return (
            <div>
                <Header />
                <CreateRoom />


                <ul >
                    {(this.props.messages.messages)?.map((doc, index) => (
                        <li data-index={index} className="message home" >
                            <header>{doc.name}</header>
                            <p>{doc.text}</p>
                            <footer>{doc.timestamp}</footer>
                        </li>
                    ))}

                </ul>
                <ChatInput paramID ={id}/>


            </div>
        )
    }
}



function mapDispatchToProps(dispatch) {
    return {
        MessagePage: paramid => dispatch(getMsg(paramid)),
        AddChat: chats => dispatch(CreateMessage(chats))
    };
}

const mapStateToProps = (state, ownProps) => ({
    paramid: ownProps.match.params.id,
    messages: state.msg.messages,
    username: state.auth.username,
    chats: state.msg.chats

});

const Privates = connect(mapStateToProps, mapDispatchToProps)(Private);

export default Privates;