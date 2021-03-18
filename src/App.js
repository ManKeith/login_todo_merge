import React, { Component } from 'react';
import {BrowserRouter, Switch,Route} from 'react-router-dom'
import Navbar from './Components/TopBar/Navbar';
import SignIn from './Components/AccountManage/SignIn'
import SignUp from './Components/AccountManage/SignUp'
import App_ from './Todo_test/TodoApp'
class App extends Component{
  render() {
    return(
      <BrowserRouter>
      <div className = "topbar">
        <Navbar/>
      </div>
      <Switch>
        <Route path = '/Signin' component={SignIn}/>
        <Route path = '/signup' component={SignUp}/>
        {/* <Route path ='/a' component={TodoApp}/> */}
        <Route path ='/' component={App_}/>
      </Switch>
      </BrowserRouter>
    )
  }
}

export default App;
