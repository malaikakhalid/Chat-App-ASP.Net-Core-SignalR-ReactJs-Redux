import React, { Component } from 'react';
import { render } from 'react-dom';


export default class Dashboard extends React.Component {
    constructor(props) {
        super(props)
      this.greet = this.greet.bind(this);
      this.handleChange = this.handleChange.bind(this);
    this.eventClick = this.eventClick.bind(this);
      this.state = {
        text: [],
        value: ''
      };
    }
    
    handleChange(event) {
        this.setState({ value: event.target.value });
      }
    
      eventClick() {
        this.greet(this.state.value);
      }
    
  
    greet(value) {
      //console.log(value);
  
      const {text} = this.state
      return this.setState({
        text: text.concat(value),
      
      });
  
    }
  
    render() {
      return (
        <div>
            <input type="text" value={this.state.value} onChange={this.handleChange} />
<button type="button" onClick={this.eventClick}>Submit </button>
          {/* <Child onGreet={this.greet} /> */}
          <ul>
          {this.state.text.map(x => (<li>{x}</li>))}
          </ul>
        </div>
      )
    }
  };


// export class Child extends React.Component {

//   constructor(props) {
//       super(props)
//     this.state = { value: '' };
//     this.handleChange = this.handleChange.bind(this);
//     this.eventClick = this.eventClick.bind(this);
//   }

//   handleChange(event) {
//     this.setState({ value: event.target.value });
//   }

//   eventClick() {
//     this.props.onGreet(this.state.value);
//   }

//   render() {
//     return (
//       <div>
// <input type="text" value={this.state.value} onChange={this.handleChange} />
// <button type="button" onClick={this.eventClick}>Submit </button>
//       </div>
//     )
//   }
// };