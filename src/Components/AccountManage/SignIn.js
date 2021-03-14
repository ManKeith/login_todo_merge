import React, {Component} from 'react';

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
        console.log(this.state)
    }
    render(){
        return(
            <div className="container">
                <form onSubmit={this.handleSubmit} className="white">
                    <h3 className="grey-text text-darken-3"> Sign In</h3>
                    <div className = "input-field">
                        <label htmlFor="email">E-mail</label>
                        <input type = "email" id="email" onChange={this.handleChange}/>
                    </div>
                    <div className = "input-field">
                        <label htmlFor="password">Password</label>
                        <input type = "password" id="password" onChange={this.handleChange}/>
                    </div>
                    <div className = "input-field">
                        <button className="btn pink lighten-1 z-depth-0">Sign In</button>
                    </div>
                </form>
            </div>
        ) 
    }
}


export default SignIn