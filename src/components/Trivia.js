import React, { Component } from "react";
import axios from 'axios'

class Trivia extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount(){
      axios.get("/api/trivia")
  }
  render() {
    return (
      <div>
        <h1>Triva</h1>
      </div>
    );
  }
}

export default Trivia;
