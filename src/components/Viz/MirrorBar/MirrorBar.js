import React, { Component } from 'react';
import * as d3 from 'd3';
import {Legend} from  '../';

import './MirrorBar.css';

class MirrorBar extends Component {

  componentDidMount() {
    var svg = d3.select("#" + this.props.id),
        margin = {top: 20, right: 60, bottom: 60, left: 40},
        width = +svg.attr("width") - margin.left - margin.right,
        height = +svg.attr("height") - margin.top - margin.bottom,
        g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var socios = [
      {
        "name": "Tio Patinhas",
        "votante": 0.3,
        "capital": 0.4,
        "spc": 200
      },{
        "name": "Bruce Wayne",
        "votante": 0.4,
        "capital": 0.1,
        "spc": 0
      },{
        "name": "Tony Stark",
        "votante": 0.0,
        "capital": 0.1,
        "spc": 1200
      },{
        "name": "Capitão América",
        "votante": 0.3,
        "capital": 0.4,
        "spc": 0
      }
    ];

    var x = d3.scaleBand()
        .rangeRound([0, width])
        .padding(0.1)
        .align(0.1)
        .domain([0,1,2,3]);

    var yPos = d3.scaleLinear()
        .domain([0,d3.max(socios.map((s) => Math.max(s.votante,s.capital)))])
        .range([height/2,0]);

    var yNeg = d3.scaleLinear()
        .domain([0,d3.max(socios.map((s) => s.spc))])
        .range([0,height/2]);

    var series = g.selectAll(".serie")
        .data(socios.map((s,i) => {
          s.index = i;
          return s;
        }))
        .enter().append("g")
        .attr("class", "serie");

    series.append("rect")
        .attr("class","neg")
        .attr("x",(d,i) => x(d.index) + 20)
        .attr("y",d => height/2 + 1)
        .attr("width", x.bandwidth() - 45)
        .attr("height", d => yNeg(d.spc))
        .attr("fill","red");


    series.append("rect")
        .attr("class","vot")
        .attr("x",(d,i) => x(d.index) + 20)
        .attr("y",d => yPos(d.votante) -1)
        .attr("width", x.bandwidth()/2 - 30)
        .attr("height", d => height/2 - yPos(d.votante))
        .attr("fill","blue");

    series.append("rect")
        .attr("class","cap")
        .attr("x",(d,i) => x(d.index) + x.bandwidth()/2 + 5)
        .attr("y",d => yPos(d.capital) -1)
        .attr("width", x.bandwidth()/2 - 30)
        .attr("height", d => height/2 - yPos(d.capital))
        .attr("fill","green");


    g.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + (height) + ")")
        .call(d3.axisBottom(x).tickFormat(d => socios[d].name));

    g.append("g")
        .attr("class", "axis axis--y")
        .call(d3.axisLeft(yPos));

    g.append("g")
        .attr("class", "axis axis--y2")
        .attr("width",width)
        .attr("transform", "translate(" + width + "," + (height/2 ) + ")")
        .call(d3.axisRight(yNeg).tickFormat(d => "R$ " + d));

  }

  render() {
    const { id } = this.props;
    const classes = [
      {color: "blue", name: "Participação Votante"},
      {color: "green", name: "Participação Capital"},
      {color: "red", name: "SPC Pessoa Física"}
    ];

    return (
      <div className="animated fadeIn">
        <svg id={id} className="mirrorChart" width="660" height="600">
          <Legend classes={classes} x="0" y="580" gap="160" />
        </svg>
      </div>
    )
  }
}

export default MirrorBar;
