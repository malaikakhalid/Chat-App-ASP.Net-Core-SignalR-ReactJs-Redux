import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { userLogin, userRegister } from '../store/action/authAction'
import '../components/Login.css'
class Register extends Component {

    constructor(props) {
        super(props);

       
        this.state = {
            username: '',
            password: '',
            email: '',
            fullname: ''
        };

    }

    executeLogin =  () => {

        var model =  {
            username: this.state.username,
            Password: this.state.password,
            email: this.state.email,
            fullname: this.state.fullname
        }

        
        this.props.Register(model);
        console.log("running", model)
    }

    render() {
        return (
            <div>
                <div className="login">
                    <div className="login__container">
                        <h1>Register</h1>
<form onSubmit = {this.executeLogin}>
                        <h5>Username</h5>
                        <input
                            type="text"
                            value={this.state.username}
                            onChange={e => this.setState({ username: e.target.value })}
                        />
                        <h5>Password</h5>
                        <input
                            type="password"
                            value={this.state.password}
                            onChange={e => this.setState({ password: e.target.value })}
                        />

                        <h5>Email</h5>
                        <input
                            type="email"
                            value={this.state.email}
                            onChange={e => this.setState({ email: e.target.value })}
                        />

                        <h5>FullName</h5>
                        <input
                            type="Fullname"
                            value={this.state.fullname}
                            onChange={e => this.setState({ fullname: e.target.value })}
                        />

                        <button type ="submit" className="login__signInButton" >Register</button>

                        </form>
                    </div>

                </div>

                

            </div>
        );
    }

}



function mapDispatchToProps(dispatch) {
    return {
        Register : model => dispatch( userRegister(model)),

    };
}
const mapStateToProps = state => {
    return { username: state.username,
    email : state.email,
    fullname : state.fullname
    };
};
const Login = connect(mapStateToProps, mapDispatchToProps)(Register);

export default Login;