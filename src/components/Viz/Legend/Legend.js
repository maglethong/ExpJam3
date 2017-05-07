import React, { Component } from 'react';
import * as d3 from 'd3';

import './Legend.css';

class Legend extends Component {

    componentDidMount () {
        const svg = d3.select("#" + this.props.id);
        svg.selectAll("legend-serie")
            .data(this.props.classes)
            .enter()
            .append("g")
            .attr("class","legend-serie-item");

        svg.selectAll(".legend-serie-item")
            .append("circle")
            .attr("cx",(d,i) => (i * this.props.gap) + 20)
            .attr("cy",0)
            .attr("r",10)
            .attr("fill",d => d.color);

        svg.selectAll(".legend-serie-item")
            .append("text")
            .attr("x",(d,i) => (i * this.props.gap) + 20)
            .attr("y",0)
            .attr("dx",12)
            .attr("dy",5)
            .text(d => d.name);

    }

    render () {
        return (
            <g className='legend' id={this.props.id} transform={"translate(" + this.props.x + "," + this.props.y + ")"} >

            </g>
        );
    }
}

export default Legend;