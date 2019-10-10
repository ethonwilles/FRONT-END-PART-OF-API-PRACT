import React from "react";
import axios from "axios";
import TodoItem from "./todo-item";
import { throwStatement } from "@babel/types";
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      todos: [],
      todo: ""
    };
  }
  componentDidMount() {
    fetch("http://localhost:5000/todos")
      .then(res => {
        return res.json();
      })
      .then(data => {
        this.setState({
          todos: data
        });
      });
  }

  renderTodos = () => {
    return this.state.todos.map(todo => {
      return (
        <TodoItem
          key={todo.id}
          title={todo.title}
          id={todo.id}
          done={todo.done}
          delete={this.deleteTodo}
        />
      );
    });
  };

  handleChange = event => {
    this.setState({
      todo: event.target.value
    });
  };

  addTodo = event => {
    event.preventDefault();

    fetch("http://localhost:5000/todo", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        title: this.state.todo,
        done: false
      })
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .then(
        this.setState({
          todos: [...this.state.todos, this.state.todo],
          todo: ""
        })
      );
  };

  deleteTodo = id => {
    console.log(id);
    fetch(`http://localhost:5000/todo/${id}`, {
      method: "DELETE"
    });
  };

  render() {
    return (
      <div className="App">
        <h1>ToDo List</h1>
        <form onSubmit={this.addTodo}>
          <input
            className="input-box"
            type="text"
            placeholder="Add Todo"
            value={this.state.todo}
            onChange={this.handleChange}
          />
          <button type="submit">Add</button>
        </form>
        {this.renderTodos()}
      </div>
    );
  }
}

export default App;
