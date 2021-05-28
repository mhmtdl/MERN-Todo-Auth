import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import AuthService from '../services/authService'
import { Redirect} from 'react-router-dom'
export default class Signup extends Component {
    
    
  state = {
    username: '',
    password: '',
    redirect:false
  }


  service = new AuthService()

  handleFormSubmit = e => {
    e.preventDefault()
    this.service.signup(this.state.username, this.state.password)
    .then(response => {
      console.log(response)
      this.setState({
        username: '',
        password: '',
        redirect:true,
        errorMsg:'',
      })
    })
    .catch(err => {
      console.log(err)
      this.setState({
          errorMsg:err.response.data.message
      })
    })
 }

 handleChange = e => {
   const { name, value } = e.target
   this.setState({
     [name]: value
   })
 }
    
    
    render() {
      

        if(this.state.redirect) {
            return <Redirect to = '/login'></Redirect>
        }
       
      
      
        return (
            <div>
                  <h1>Signup</h1>
        <form onSubmit={this.handleFormSubmit}>
          <label>Username</label>
          <input type="text" name="username" value={this.state.username} onChange={this.handleChange} />

          <label>Password</label>
          <input type="password" name="password" value={this.state.password} onChange={this.handleChange}/>
          
          <button type='submit'>Create Account</button>
          <p>Already have an account? 
            <Link to="/login">Login</Link>
          </p>
        </form>
        {this.state.errorMsg}
            </div>
        )
    }
}
