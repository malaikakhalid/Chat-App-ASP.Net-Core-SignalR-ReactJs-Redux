import React, { Component } from 'react'
import * as actions from '../store/action/actionTypes'
import {getUsernameServices} from '../store/services/authServices'
import {connect} from 'react-redux';
import {getUsername} from '../store/action/authAction'
import CreateRoom from './CreateRoom';

 class Header extends Component {
    constructor(props){
        super(props)
        this.state={
            // docs:[]
        }

    }

    componentDidMount(){
   
        this.props.dispatch(getUsername());
   
    }


    render() {
    //    console.log("react->app" , this.props)
        return (
            <div>
           
            <div className="navbar">
                <a href="/home">Home</a>
                <a href="#">Private</a>
                <a href="/find">Find</a>
                <a href="/dashboard">Dashboard</a>

                
                <a className="profile_name">{this.props.username}</a>
            </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => (
    {  
        username: state.auth.username
    }
) 

export default connect(mapStateToProps,null)(Header)
