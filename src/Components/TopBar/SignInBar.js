import React from 'react'
import {NavLink} from 'react-router-dom'
const SignInBar = () =>{
    return(
    <ul className="right">
     <li><NavLink to='/'>To Do List </NavLink></li>
     <li><NavLink to='/'>Sign Out </NavLink></li>
     <li><NavLink to='/' className="btn btn-floating blue lighten-1"> AA </NavLink></li>
    </ul>
    )
}

export default SignInBar