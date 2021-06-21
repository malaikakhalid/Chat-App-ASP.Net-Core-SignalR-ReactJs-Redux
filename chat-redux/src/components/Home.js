import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { userLogin } from '../store/action/authAction'
import '../components/Login.css'
import { createRoom } from '../store/action/chatAction';
import Header from './Header';
import CreateRoom from './CreateRoom';
class Home extends Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    // this.eventClick = this.eventClick.bind(this);
    // this.greet = this.greet.bind(this)
    this.state = {
      name: '',
      text: []
    };

  }


//   greet(name) {
//     //console.log(value);
//     const {text} = this.state
//     return this.setState({
//       text: text.concat(name),
    
//     });

//   }
    handleChange(event) {
        this.setState({ name: event.target.value });
    }

    //   eventClick() {
    //     this.greet(this.state.name);
    //   }


    executeLogin = () => {

        var model = {
        name: this.state.name,
        
        }
        // this.props.setToken(model);
        this.props.Room(model);
        this.greet(this.state.name);

        console.log("running", model)
        
    }

  render() {
    return (
      <div >
          <Header/>
          <CreateRoom />
       <div className="login">
        <div className="login__container">
            
           <form onSubmit={this.executeLogin}>
              <h5>Room Name</h5>
              <input
                type="text"
                value={this.state.name}
                onChange={this.handleChange}
              />

              <button type="submit"className="login__signInButton" >Register </button>
              </form>
          </div>
          
        </div>

       

      </div>
    );
  }

}



function mapDispatchToProps(dispatch) {
  return {
    Room: model => dispatch(createRoom(model)),

  };
}
const mapStateToProps = state => {
//   return { name: state.name };
};
const Homie = connect(mapStateToProps, mapDispatchToProps)(Home);

export default Homie;