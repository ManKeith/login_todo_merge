import React, {Component} from 'react';
import {connect} from 'react-redux'
import {signUp} from '../../store/actions/authAction'
import { Redirect } from 'react-router-dom'
import "./Signup.css"
class SignUp extends Component{
    state = {
        username:'',
        email:'',
        password:''
    }
    handleChange = (e) =>{
        this.setState({
        [e.target.id]: e.target.value
        })
    }
    handleSubmit = (e) =>{
        e.preventDefault();
        this.props.signUp(this.state);
    }
    render(){
        const { auth, authError } = this.props;
        if (auth.uid) return <Redirect to='/' /> 
        return(
            <div className="container">
                <form id="right" onSubmit={this.handleSubmit} >
                    <h3 > Sign Up</h3>
                    <div id="uname" className = "input-field">
                        <label  htmlFor="username">User Name</label>
                        <input type = "text" id="username" onChange={this.handleChange}/>
                    </div>
                    <div id="email" className = "input-field">
                        <label htmlFor="email">E-mail</label>
                        <input type = "email" id="email" onChange={this.handleChange}/>
                    </div>
                    <div id="pw" className = "input-field">
                        <label htmlFor="password">Password</label>
                        <input type = "password" id="password" onChange={this.handleChange}/>
                    </div>
                    <div className = "input-field">
                        <button className="btn pink lighten-1 z-depth-0">Sign Up</button>
                        <div className="red-text center">
                            {authError ? <p>{authError}</p> : null}
                        </div>
                    </div>
                </form>
            </div>
        ) 
    }
}

const mapStateToProps = (state) =>{
    return {
        auth: state.firebase.auth,
        authError: state.auth.authError
    }
}

const mapDispatchToProps =(dispatch) => {
    return {
        signUp: (creds)=>dispatch(signUp(creds))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(SignUp)