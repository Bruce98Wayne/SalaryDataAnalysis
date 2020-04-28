import React, { Component } from 'react';
import './App.css';
import * as d3 from 'd3'
import * as d3tip from 'd3-tip'
class App extends Component {
state = {
    data: null,
    margin: {},
    width: 0,
    height: 0,
    barHeight: 0,
    x: null,
    y: null,
    chat: null,
    allgroup: null,
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

      this.createBarPlot()

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

  setChart() {
    const margin = {top: 20, right: 20, bottom: 70, left: 40},
      width = 800 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;
      var barHeight = 20;
      this.setState({margin, width, height, barHeight}) 
      

    // var x = d3.scaleOrdinal().rangeRoundBands([0, width], .05);
    var x = d3.scaleBand().rangeRound([0, width]).padding(0.1)
    
    var y = d3.scaleLinear().range([height, 0]);

    var chart = d3.select(".chart")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)

    console.log(chart)
    var allgroup = chart.append("g")
                      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");   

    this.setState({x, y, chart, allgroup}) 

    // var tooltip = d3tip.tip()
    //   .attr('class', 'd3-tip')
    //   .offset([-10, 0])
    //   .html(function(d) {
    //   return "<span style='color:palevioletred'>" + d.state +": "+ numberWithCommas(d.population) + "</span>";
    //   })

      // allgroup.call(tooltip);
  }

  createBarPlot = async () => {
    // const rawData = await fetch('/barPlot')
    // const data = await rawData.json();

    await this.setChart()
    console.log(this.state.barHeight)
    console.log(this.state.y)
  var this1 = this;
    
    this.state.x.domain(d3.range(this.tempData.length))
    this.state.y.domain([0, d3.max(this.tempData, function(d) { return d.population; })]);
  
    this.state.chart.attr("height", this1.state.margin.top + this1.state.barHeight * this1.tempData.length);
      
    var bar = this.state.allgroup.selectAll("g")
                  .data(this.tempData)
                  .enter()
                  .append("rect")
                  .attr("fill", "turquoise")
                  .attr("transform", function(d, i) { return "translate(0," + this1.state.barHeight + ")"; })
                  .attr("x", function(d,i) { return this1.state.x(i);})
                  .attr("width", this1.state.x.bandwidth())
                  .attr("y", function(d) { return this1.state.y(d.population); })
                  .attr("height", function(d) { return this1.state.height - this1.state.y(d.population); })
                  // .on('mouseover', function(d){
                  //     d3.select(this).attr("fill", "pink")
                  //     tooltip.show(d);
                  // })
                  // .on('mouseout', function(d){
                  //     d3.select(this).attr("fill", "turquoise")
                  //     tooltip.hide(d);
                  // });
                  // .on("click",sortBar);

  }

  render() {
    return (
      <div className="App">
        {/* <div id="test"></div>
        <div id="d3_1"></div> */}
        <svg className="chart"></svg>
      </div>
    );
  }
}

export default App;