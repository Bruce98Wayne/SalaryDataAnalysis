import React, { Component } from 'react';
import * as d3 from 'd3'
import d3tip from 'd3-tip'

class BarChart extends Component {

constructor(props) {
    super(props);

    this.state = {
        x: null,
        y: null,
        chat: null,
        allgroup: null,
        tooltip: null,
    };
    console.log(props)
    }

  componentDidMount() {
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

  setChart() {
    const margin = {top: 20, right: 20, bottom: 70, left: 40},
      width = 800 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;
      var barHeight = 20;
      this.setState({margin, width, height, barHeight}) 
      
    var x = d3.scaleBand().rangeRound([0, width]).padding(0.1)
    
    var y = d3.scaleLinear().range([height, 0]);

    var chart = d3.select(".chart")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)

    var allgroup = chart.append("g")
                      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");   

    var this1 = this;
    var tooltip = d3tip()
      .attr('class', 'd3-tip')
      .offset([-10, 0])
      .html(function(d) {
      return "<span style='color:palevioletred'>" + d.state +": " + this1.numberWithCommas(d.population) +  "</span>";
      })

      allgroup.call(tooltip);
    this.setState({x, y, chart, allgroup, tooltip}) 
  }

  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  createBarPlot = async () => {
    console.log(this.props.tempData)
    await this.setChart()
    var this1 = this;
    
    this.state.x.domain(d3.range(this.props.tempData.length))
    this.state.y.domain([0, d3.max(this.props.tempData, function(d) { return d.population; })]);
  
    this.state.chart.attr("height", this1.state.margin.top + this1.state.barHeight * this1.props.tempData.length);
      
    var bar = this.state.allgroup.selectAll("g")
                  .data(this.props.tempData)
                  .enter()
                  .append("rect")
                  .attr("fill", "turquoise")
                  .attr("transform", function(d, i) { return "translate(0," + this1.state.barHeight + ")"; })
                  .attr("x", function(d,i) { return this1.state.x(i);})
                  .attr("width", this1.state.x.bandwidth())
                  .attr("y", function(d) { return this1.state.y(d.population); })
                  .attr("height", function(d) { return this1.state.height - this1.state.y(d.population); })
                  .on('mouseover', function(d){
                      d3.select(this).attr("fill", "pink")
                      this1.state.tooltip.show(d, this);
                  })
                  .on('mouseout', function(d){
                      d3.select(this).attr("fill", "turquoise")
                      this1.state.tooltip.hide(d, this);
                  });
                //   .on("click",sortBar);

  }

  render() {
    return (
      <div className="App">
        <svg className="chart"></svg>
      </div>
    );
  }
}

export default BarChart;