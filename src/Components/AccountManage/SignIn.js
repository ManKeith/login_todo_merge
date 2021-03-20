import React, {Component} from 'react';
import {connect} from 'react-redux'
import {signIn} from '../../store/actions/authAction'
import { Redirect } from 'react-router-dom'
import './SignIn.css'
class SignIn extends Component{
    state = {
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
        this.props.signIn(this.state)
    }
    render(){
        const { authError, auth } = this.props;
        if (auth.uid) return <Redirect to='/Dashboard' /> 

        return(
            <div className="container">
                <form onSubmit={this.handleSubmit} id='right'>
                    <h3 id="Signin"> Sign In</h3>
                    <div id="email" className = "input-field">
                        <label htmlFor="email">E-mail</label>
                        <input type = "email" id="email" onChange={this.handleChange}/>
                    </div>
                    <div id="pw" className = "input-field">
                        <label htmlFor="password">Password</label>
                        <input type = "password" id="password" onChange={this.handleChange}/>
                    </div>
                    <div className = "input-field">
                        <button className="btn pink lighten-1 z-depth-0">Sign In</button>
                        <div className="red-text center">
                            { authError ?   <p>{authError}</p> : null }
                        </div>
                    </div>
                </form>
                
            </div>
        ) 
    }
}
const mapStateToProps =(state)=>{
    return {
        authError: state.auth.authError,
        auth : state.firebase.auth
    }
}
const mapDispatchToProps = (dispatch)=>{
    return{
        signIn:(creds)=>dispatch(signIn(creds))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(SignIn)