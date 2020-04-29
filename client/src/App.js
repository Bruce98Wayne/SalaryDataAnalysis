import React, { useState, useEffect, Component }from 'react';
import './App.css';
import * as d3 from 'd3'
import * as d3tip from 'd3-tip'
import BarChart from './barChart'
import ScatterPlot from './scatterPlot'
import Pie from './pie'
class App extends Component {
state = {
    data: null,
  };

  componentDidMount() {
    this.callBackendAPI()
      .then(res => this.setState({ data: res.express })).then(()=> {console.log(this.state.data)})
      .catch(err => console.log(err));
  }

  callBackendAPI = async () => {
    const response = await fetch('/express_backend');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message) 
    }
    return body;
  };

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

  render() {
    return (
      <div>
        <div>
        <span className="label">SVG Elements</span>
        <Pie
          data={this.tempData}
          width={200}
          height={200}
          innerRadius={50}
          outerRadius={100}
        />
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