import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { CreateMessage, getMsg } from '../store/action/messageAction'
import { HubConnectionBuilder, LogLevel, HttpTransportType } from '@microsoft/signalr'
import Privates from './Private'

class ChatInput extends Component {

    constructor(props) {
        super(props)
        // this.connectionId = this.connectionId.bind(this)
        // this.joinRoom = this.joinRoom.bind(this)

        this.state = {
            Text: "",
            id: +this.props.paramID,
            form: null,
            Name: "Malaika",
            list: []
        }
    }

    componentDidMount() {
        var _connectionId = '';
        console.log(this.state.id);
        let self = this.state
        var connection = new HubConnectionBuilder()
            .withUrl("https://localhost:44369/chatHub"
                , {
                    skipNegotiation: true,
                    transport: HttpTransportType.WebSockets
                })
            .configureLogging(LogLevel.Information)
            .build()

        // connection
        // .start()
        // .then(() => console.log("Connected",connection.id))
        // .catch((err) => console.log("error while starting the connection",err))

console.log("componentDidMount List",this.state.list)

        connection.start()
            .then(function () {
                connection.invoke('getconnectionId')
                    .then(function (connectionId) {
                        // const {id} = this.state
                        // console.log(id)
                        _connectionId = connectionId;
                        const tokenString = sessionStorage.getItem('token');
                        const userToken = JSON.parse(tokenString);
                        const str = "Bearer " + userToken.token;
                        console.log("Bearers " + userToken.token)
                        console.log("slef", self.id)

                        axios.post("https://localhost:44369/Chat/joinRoom/" + _connectionId + `/${self.id}`,
                            {
                                headers: {
                                    'Authorization': str,
                                    'Content-Type': 'application/json',
                                }
                            }).then((res) => {
                                console.log("Room Joined!", res)

                            });
                    })
            })
            .catch(function (err) {
                console.log("Failed to Join Room !", err);

                console.log(err);
            })


        connection.on("RecieveMessage", (data) => {
            console.log("testing", data)
            this.state.list.push(data);
            console.log("list",this.state.list);

            // console.log("chatInput",this.props.messages.messages)
            let arr2 =  this.state.list
            let arr1 = this.props.messages.messages
             Array.prototype.push.apply(arr1,arr2)
             while(this.state.list.length > 0) {
                this.state.list.pop();
            }
            console.log("result",arr1);
            console.log("hfdjshf");
        

        })


    }



    executeLogin = () => {

        var model = {
            ChatId: +this.state.id,
            Name: this.props.username,
            Text: this.state.Text,
        }
        console.log("model", model)


        this.props.AddChat(model);

    }



    sendMessage = (event) => {
        event.preventDefault();
        this.form = event.target
        console.log(this.form)
        console.log(this.state.id);
        // var data = new FormData(this.form)
        console.log(this.props.username)
        // debugger;
        var data = {
            ChatId: this.state.id,
            Name: this.props.username,
            Text: this.state.Text,
        }
        console.log(data);
        const tokenString = sessionStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        const str = "Bearer " + userToken.token;
        console.log("Bearers " + userToken.token)
        this.setState({Text: ''})
        axios.post('https://localhost:44369/Chat/SendMessage', data, {
            headers: {
                'Authorization': str,
                'Content-Type': 'application/json',
            }
        })
            .then(res => {
                console.log("Message Sent!", res)
                console.log(res.data);
            })
            .catch(err => {
                console.log("error Message", err)
            })
    }


    render() {
      
        return (

            <div className="chat__input">

                <form onSubmit={this.sendMessage.bind(this)} class="chat-input">
                    <input type="hidden" name="chatId" value={this.state.id} />
                    <input type="hidden" name="roomName" value={this.props.username} />
                    <input
                        type="text"
                        name="Text"
                        value={this.state.Text}
                        onChange={e => this.setState({ Text: e.target.value })}
                    />

                    <button type="submit" >Send</button>
                </form>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {

        AddChat: chats => dispatch(CreateMessage(chats))
    };
}

const mapStateToProps = (state) => ({

    messages: state.msg.messages,
    username: state.auth.username,
    chats: state.msg.chats

});

const Input = connect(mapStateToProps, mapDispatchToProps)(ChatInput);

export default Input;
