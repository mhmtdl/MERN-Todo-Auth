import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import AuthService from '../services/authService'
import Todos from './Todos';

export default class Welcome extends Component {
  
    service = new AuthService()

    logout = () => {
      
      this.service.logout()
      .then(response => {
         console.log(response)
         this.props.getTheUser(null)
      })
      .catch(err => {
          console.log(err)
      })
    }
  
    render() {
        return (
            <div>
                
                <Link to='/login' onClick ={this.logout}>Logout</Link>
              <Todos loggedInUser={this.props.loggedInUser}/>
            </div>
        )
    }
}
