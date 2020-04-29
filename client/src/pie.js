
import React from "react";
import * as d3 from "d3";
import d3tip from 'd3-tip'

const Arc = ({ data, index, createArc, colors, format }) => (
  <g key={index} className="arc">
    <path className="arc" d={createArc(data)} fill={colors(index)} />
    <text
      transform={`translate(${createArc.centroid(data)})`}
      textAnchor="middle"
      alignmentBaseline="middle"
      fill="black"
      fontSize="10"
    >
      {`${data.data.gender}`}
    </text>
  </g>
  // d3.select()
);

const Pie = props => {
  const this1 = this
  var tooltip = d3tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
  return "<span style='color:palevioletred'>" + d.state +": " + this1.numberWithCommas(d.population) +  "</span>";
  })
  d3.select('#pie').call(tooltip)
  const createPie = d3
    .pie()
    .value(d => d.count)
    .sort(null);

  const createArc = d3
    .arc()
    .innerRadius(props.innerRadius)
    .outerRadius(props.outerRadius);
  
    const colors = d3.scaleOrdinal(d3.schemeCategory10);
  const format = d3.format(".2f");
  const data = createPie(props.data);
  return (
    <div id="pie">    
      <svg width={props.width} height={props.height}>
      <g transform={`translate(${props.outerRadius} ${props.outerRadius})`}>
        {data.map((d, i) => (
          <Arc
            key={i}
            data={d}
            index={i}
            createArc={createArc}
            colors={colors}
            format={format}
          />
        ))}
      </g>
    </svg>
    <span className="label">Distrtibtion of Emplopyees based on gender</span>
    </div>

  );
};

export default Pie;