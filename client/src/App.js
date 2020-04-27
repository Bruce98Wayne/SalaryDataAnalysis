import React, { Component } from 'react';
import './App.css';
import * as d3 from 'd3'

class App extends Component {
state = {
    data: null
  };

  componentDidMount() {
      // Call our fetch function below once the component mounts
    this.callBackendAPI()
      .then(res => this.setState({ data: res.express })).then(()=> {console.log(this.state.data)})
      .catch(err => console.log(err));

      const temperatureData = [ 8, 5, 13, 9, 12 ]
      d3.select("#test")
          .selectAll("h2")
          .data(temperatureData)
          .enter()
              .append("h2")
              .text("New Temperature")

  }
    // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
  callBackendAPI = async () => {
    const response = await fetch('/express_backend');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message) 
    }
    return body;
  };

  render() {
    return (
      <div className="App">
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Home Page</h1>
        </header> */}
        {/* <p className="App-intro">{this.state.data}</p> */}
        <div id="test"></div>
      </div>
    );
  }
}

export default App;