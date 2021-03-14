import React, { Component } from 'react';
import {BrowserRouter, Switch,Route} from 'react-router-dom'
import Navbar from './Components/TopBar/Navbar';
import SignIn from './Components/AccountManage/SignIn'
import SignUp from './Components/AccountManage/SignUp'
import TodoApp from './TodoList/TodoApp'
class App extends Component{
  render() {
    return(
      <BrowserRouter>
      <div className = "topbar">
        <Navbar/>
      </div>
      <Switch>
        <Route path = '/signin' component={SignIn}/>
        <Route path = '/signup' component={SignUp}/>
        <Route path ='/' component={TodoApp}/>
      </Switch>
      </BrowserRouter>
    )
  }
}

export default App;
