import React, { useState, useEffect, Component }from 'react';
import './App.css';
import * as d3 from 'd3'
import * as d3tip from 'd3-tip'
import BarChart from './barChart'
import ScatterPlot from './scatterPlot'
import Pie from './pie'
import Form from './form'
class App extends Component {
state = {
    data: null,
    value: null
  };

  componentDidMount() {
  }

  tempData = [ {state: "Alabama", population: 4822023, gdp: 157272},
   {state: "Alaska", population: 731449, gdp: 44732},
   {state: "Arizona", population: 6553255, gdp: 230641},
   {state: "Arkansas", population: 2949131, gdp: 93892},
   {state: "California", population: 38041430, gdp: 1751002},
   {state: "Colorado", population: 5187582, gdp: 239884},
   {state: "Connecticut", population: 3590347, gdp: 197202},
   {state: "Delaware", population: 917092, gdp: 56110},
   {state: "District_of_Columbia", population: 632323, gdp: 92106},
   {state: "Florida", population: 19317568, gdp: 672287},
   {state: "Georgia", population: 9919945, gdp: 374000},
   {state: "Hawaii", population: 1392313, gdp: 61877},
   {state: "Idaho", population: 1595728, gdp: 50976},
   {state: "Illinois", population: 12875255, gdp: 594201},
   {state: "Indiana", population: 6537334, gdp: 255380},
   {state: "Iowa", population: 3074186, gdp: 129799},
   {state: "Kansas", population: 2885905, gdp: 118523},
   {state: "Kentucky", population: 4380415, gdp: 146829} ]

   tempData1 = [ {state: "Alabama", population: 4822023, gdp: 157272},
   {state: "Alaska", population: 731449, gdp: 44732},
   {state: "Arizona", population: 6553255, gdp: 230641},
   {state: "Arkansas", population: 2949131, gdp: 93892},
   {state: "California", population: 38041430, gdp: 1751002}, ]

    handleSubmit = async (event, value) => {
    event.preventDefault()
    const response = await fetch(`query?q=${this.state.value}`).
    then(data => data.json()).
    then((data)=>{this.setState({data})});
  }

  handleChange = (event) => {
    this.setState({value: event.target.value})
  }

  render() {
    console.log(this.state.data)
    return (
      <div>
        <Form handleSubmit={this.handleSubmit} handleChange={this.handleChange}/>
        <div>
        <span className="label">SVG Elements</span>
        {this.state.data === null ? <br />:  <Pie
          data={this.state.data}
          width={200}
          height={200}
          innerRadius={50}
          outerRadius={100}
        />}
       
      </div>
      <BarChart tempData={this.tempData} top={0}/>
      <ScatterPlot tempData={this.tempData} top={0}/>
    </div>
       
        
        /* <BarChart tempData={this.tempData} top={300}/> */
      // </div>
    );
  }
}

export default App;