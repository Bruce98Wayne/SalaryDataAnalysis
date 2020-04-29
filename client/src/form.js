import React, {Component} from "react";

class Form extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        value: null,
      }
    }
  
    render() {
      //{const this1 = this}
      return (
        <form onSubmit={this.props.handleSubmit}>
          <label htmlFor="username">Enter query</label>
          <input 
            id="input" 
            placeholder="Type something..." 
            name="input"
            type="text" 
            onChange={this.props.handleChange}
            />
          <button>Execute Query!</button>
        </form>
      );
    }
  }

  export default Form;