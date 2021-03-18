import React from 'react'
import {NavLink} from 'react-router-dom'
const SignOutBar = () =>{
    return(
    <ul className="right">
        <li><NavLink to='/Signup'>Sign up</NavLink></li>
        <li><NavLink to='/Signin'>Sign in</NavLink></li>
        <li><NavLink to='/Todor'>testing</NavLink></li>
    </ul>
    )
}

export default SignOutBar