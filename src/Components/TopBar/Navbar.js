import React from 'react'
import {Link} from 'react-router-dom'
import SignInBar from './SignInBar'
import SignOutBar from './SignOutBar'
import {connect} from 'react-redux'
const Navbar = (props) =>{
    const { auth } = props;
    console.log(auth);
    const BarItemShown = auth.uid ? <SignInBar/> : <SignOutBar/>;
    return(
    <nav className="nav-wrapper grey darken-3">
      <div className="container">
        <Link to='/' className="brand-logo">TODO</Link>
      { BarItemShown }
      </div>
    </nav>
    )
}
const mapStateToProps =(state) =>{
  //console.log(state);
  return{
      auth: state.firebase.auth
  }
}
export default connect(mapStateToProps)(Navbar)