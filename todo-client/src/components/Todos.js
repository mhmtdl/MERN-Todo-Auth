import React, { Component } from 'react'
import axios from 'axios'
export default class Todos extends Component {

    state= {
        todoArray: [],
        inputText: ""
      }

      componentDidMount() {
          this.getTodoList();
      }

      handleInputChange = (event) => {
        this.setState({ inputText: event.target.value });
      };

      addTodoList = (todo) => {

        this.getTodoList();
        const todoList = {todo,id:this.props.loggedInUser._id}
        axios.post(process.env.REACT_APP_SERVER_URL +'/addtodolist',todoList)
        .then(response=> {
            console.log(response)
        })

        this.getTodoList();
    }

    getTodoList = () => {
        const id = this.props.loggedInUser ? this.props.loggedInUser._id : null
        axios.get(process.env.REACT_APP_SERVER_URL +'/user/'+id)
        .then(response=> {
            
            console.log(response)
            this.setState({
                todoArray:response.data.todo
            })
        })
    }

    render() {
        return (
            <div>
                    <input type='text' onChange={this.handleInputChange}/>
                    <button onClick={()=>this.addTodoList(this.state.inputText)}>Add</button>
                    {this.state.todoArray.map((p) => (
                        <h5 key={p} value={p}>
                            {p}
                        </h5>
                ))}
            </div>
        )
    }
}
