import React, { Component } from "react";
import shortid from "shortid";

class TodoForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.onSubmit({
      id: shortid.generate(),
      text: this.state.text,
      complete: false
      // date: moment()
    });
    this.setState({ text: "" });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          name="text"
          placeholder="What do you need to do?"
          value={this.state.text}
          onChange={this.handleChange}
        />
        <button onClick={this.handleSubmit}>Add</button>
      </form>
    );
  }
}

export default TodoForm;
