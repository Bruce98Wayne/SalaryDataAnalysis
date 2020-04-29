import React, {Component} from "react";

class Form extends React.Component {
    constructor() {
      super();
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleSubmit(event) {
      event.preventDefault();
    //   const data = new FormData(event.target);
      
      fetch('http://localhost:4000/query', {
        method: 'GET'
      });
    }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="username">Enter query</label>
          <input id="username" name="username" type="text" />
          <button>Execute Query!</button>
        </form>
      );
    }
  }

  export default Form;