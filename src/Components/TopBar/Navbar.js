import React from 'react'
import {Link} from 'react-router-dom'
import SignInBar from './SignInBar'
import SignOutBar from './SignOutBar'
import {connect} from 'react-redux'
const Navbar = (props) =>{
    const { auth } = props;
    //console.log(auth);
    const BarItemShown = auth.uid ? <SignInBar/> : <SignOutBar/>;
    var linkto = new String(""); 
    if(auth.id){
      linkto = "/"
    }
    else{
      linkto ="/Signin"
    }
    return(
    <nav className="nav-wrapper grey darken-3">
      <div className="container">
        <Link to={linkto} className="brand-logo">TODO</Link>
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