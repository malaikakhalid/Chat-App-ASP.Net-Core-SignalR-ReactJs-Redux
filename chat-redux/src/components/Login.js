import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { userLogin } from '../store/action/authAction'
import '../components/Login.css'
class LoginConn extends Component {

  constructor(props) {
    super(props);

    const { setToken } = this.props
    this.state = {
      username: '',
      password: ''
    };

  }

  executeLogin = () => {

    var model = {
      username: this.state.username,
      Password: this.state.password
    }

    // this.props.setToken(model);
    this.props.Login(model);
    console.log("running", model)
  }

  render() {
    return (
      <div >
       <div className="login">
        <div className="login__container">
            <h1>Login</h1>
           {/* <form onSubmit={this.executeLogin}> */}
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

              <button type="submit" onClick={this.executeLogin} className="login__signInButton" >Login</button>
              {/* </form> */}
          </div>
          
        </div>

        {/* <br />
                Login:
        <input
          type="text"
          value={this.state.username}
          onChange={e => this.setState({ username: e.target.value })}
        />
        <br />
                Password:
        <input
          type="password"
          value={this.state.password}
          onChange={e => this.setState({ password: e.target.value })}
        />

        <button onClick={this.executeLogin}>Login</button> */}

      </div>
    );
  }

}

LoginConn.protoTypes = {
  setToken: PropTypes.func.isRequired
}

function mapDispatchToProps(dispatch) {
  return {
    Login: model => dispatch(userLogin(model)),

  };
}
const mapStateToProps = state => {
  return { username: state.username };
};
const Login = connect(mapStateToProps, mapDispatchToProps)(LoginConn);

export default Login;