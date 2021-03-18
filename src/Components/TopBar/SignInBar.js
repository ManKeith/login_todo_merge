import React from 'react'
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import {signOut} from '../../store/actions/authAction'
import { Redirect } from 'react-router-dom'
const SignInBar = (props) =>{
    return(
    <ul className="right">
     {/* <li><NavLink to='/Dashboard'>To Do List </NavLink></li> */}
     <li><a onClick={props.signOut}>Log Out</a> <Redirect to='/Signin' />  </li>
      
    </ul>
    )
}
const mapDispatchToProps = (dispatch) => {
    return {
      signOut: () => dispatch(signOut())
    }
  }
export default connect(null,mapDispatchToProps)(SignInBar)