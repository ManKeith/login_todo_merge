import {NavLink} from 'react-router-dom'
import React, {Component} from 'react';
import Todo from './TodoApp'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
class Dashboard extends Component{
    render(){
        const {auth } = this.props;
        if (!auth.uid) return <Redirect to='/' /> 
        return(

            <Todo/>
        )
    }
}
const mapStateToProps = (state) => {
    return{
      auth: state.firebase.auth
    }
  }
  export default connect(mapStateToProps)(Dashboard)
// export default Dashboard;