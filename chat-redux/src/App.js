import React, { Component } from 'react'
import {connect} from 'react-redux'
import LoginConn from './components/Login'
import * as actions from './store/action/actionTypes'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import useToken from './useToken';
import Home from './components/Home';
import Register from './components/Register'
import Private from './components/Private'
import Find from './components/Find'
import Dashboard from './components/Dashboard'
import Chat from './components/Chat';

// class App extends Component {
//   constructor(){
//     super()
//   }
//   render() {
//     console.log("redux-> action" , this.props)
//     const { token, setToken } = useToken();
  
//   if(!token) {
//     return <Login setToken={setToken} /> 
//   }
// else if(token){
//   return (
//     <div className="wrapper">
     
//       <BrowserRouter>
//         <Switch>
//           <Route path="/" exact>
//             <Home />
//           </Route> 
//           {/* <Route path="/login" component={Login}/>
//           <Route path="/find" component={Find}/>
//           <Route path="/privates/:id" component={Privates} />
//           <Route path="/home" component={Home}/>
//           <Route path ="/register" component={Register} /> */}
//         </Switch>
//       </BrowserRouter>
//     </div>
//   ) 
// }
//   }
// }

// const mapStateToProps = (state) => ( {
//   name: state.auth.username,
//   email: state.auth.email
// })

// export default connect(mapStateToProps,null)(App)






 function App() {
  const { token, setToken } = useToken();
  
  if(!token) {
    return <LoginConn setToken={setToken} /> 
  }
else if(token){
  return (
    <div className="wrapper">
     
      <BrowserRouter>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route> 
          <Route path="/login" component={LoginConn}/>
          <Route path="/find" component={Find}/>
          <Route path="/private/:id" component={Private} />
          <Route path="/home" component={Home}/>
          <Route path ="/register" component={Register} />
          <Route path ="/dashboard" component={Chat} />

        </Switch>
      </BrowserRouter>
    </div>
  ) 
}
}





const mapStateToProps = (state) => ( {
  name: state.auth.username,
  email: state.auth.email
})

export default connect(mapStateToProps,null)(App)

