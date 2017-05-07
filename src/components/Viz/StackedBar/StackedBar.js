import React, { Component } from 'react';
import * as d3 from 'd3';

import './StackedBar.css';

class StackedBar extends Component {
  static defaultProps = {
    ticks: 10,
    showLegend: false
  }

  componentWillReceiveProps(nextProps) {
    const { range } = nextProps;

    if (range) {
      // this.x.domain(range.selection.map(range.x.invert, range.x));
      // this.g.selectAll(".series")
      //   .attr("x", function(d) { return this.x(d.data.State); })
      //   .attr("y", function(d) { return this.y(d[1]); });
      // this.g.select(".axis--x").call(this.x);
    }
  }

  componentDidMount() {
    const { id, showLegend, ticks } = this.props;

    var svg = d3.select("#" + id),
      margin = {
        top: 20,
        right: 60,
        bottom: 30,
        left: 40
      },
      width = +svg.attr("width") - margin.left - margin.right,
      height = +svg.attr("height") - margin.top - margin.bottom,
      g = svg
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    this.g = g;

    var x = d3.scaleBand()
      .rangeRound([0, width])
      .padding(0.1)
      .align(0.1);

    this.x = x;

    var y = d3.scaleLinear()
      .rangeRound([height, 0]);

    this.y = y;

    var z = d3.scaleLinear().range(["#b4b719", "#f1c40f", "red"]);

    var stack = d3.stack()
      .offset(d3.stackOffsetExpand);

    d3.csv("data.csv", type, function (error, data) {
      if (error) throw error;

      data.sort(function (a, b) {
        return b[data.columns[1]] / b.total - a[data.columns[1]] / a.total;
      });

      x.domain(data.map(function (d) {
        return d.State;
      }));
      z.domain([0, 1, data.columns.length - 1]);

      var serie = g.selectAll(".serie")
        .data(stack.keys(data.columns.slice(1))(data))
        .enter().append("g")
        .attr("class", "serie")
        .attr("fill", function (d, i) {
          return z(i);
        });

      serie.selectAll("rect")
        .data(function (d) {
          return d;
        })
        .enter().append("rect")
        .attr("x", function (d) {
          return x(d.data.State);
        })
        .attr("y", function (d) {
          return y(d[1]);
        })
        .attr("height", function (d) {
          return y(d[0]) - y(d[1]);
        })
        .attr("width", x.bandwidth());

      g.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + height + ")")
        .call(
          d3.axisBottom(x)
          .tickValues(x.domain().filter(function(d, i) { 
            return !showLegend ? !(i % 3) : true;
          }))
        );

      g.append("g")
        .attr("class", "axis axis--y")
        .call(d3.axisLeft(y).ticks(ticks, "%"));

      var legend = serie.append("g")
        .attr("class", "legend")
        .attr("transform", function (d) {
          var d = d[d.length - 1];
          return "translate(" + (x(d.data.State) + x.bandwidth()) + "," + ((y(d[0]) + y(d[1])) / 2) + ")";
        });

      if (showLegend) {
        legend.append("line")
          .attr("x1", -6)
          .attr("x2", 6)
          .attr("stroke", "#000");

        legend.append("text")
          .attr("x", 9)
          .attr("dy", "0.35em")
          .attr("fill", "#000")
          .style("font", "10px sans-serif")
          .text(function (d) {
            return d.key;
        });
      } else {
        const component = this;
        var brush = d3.brushX()
        .extent([[0, 0], [width, height]])
        .on("brush", function () {
          var selection = d3.event.selection;
          component.props.onSelection({ selection, x, invert: x.invert });
          // x.domain(selection.map(x.invert, x));
          // console.log(selection.map(x.invert, x));
          // g.selectAll(".series")
          //   .attr("x", function(d) { return x; })
          //   .attr("y", function(d) { return y; });
          // g.select(".axis--x").call(x);
        });

        svg.append("g")
        .attr("class", "brush")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .call(brush)
        .call(brush.move, x.range());
      }
    }.bind(this));

    function type(d, i, columns) {
      for (var j = 1, t = 0; j < columns.length; ++j) {
        t += d[columns[j]] = +d[columns[j]];
      }
      d.total = t;
      return d;
    }
  }

  render() {
    const { id, width, height } = this.props;
    return (
      <div className="animated fadeIn">
        <svg id={id} width={width} height={height}></svg>
      </div>
    )
  }
}

export default StackedBar;