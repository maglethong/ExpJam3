import React, {
  Component
} from 'react';
import * as d3 from 'd3';

import './StackedBar.css';

class StackedBar extends Component {
  static defaultProps = {
    ticks: 10,
    showLegend: false
  }

  componentDidMount() {
    const { showLegend, ticks } = this.props;

    var svg = d3.select(this.node),
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

    var x = d3.scaleBand()
      .rangeRound([0, width])
      .padding(0.1)
      .align(0.1);

    var y = d3.scaleLinear()
      .rangeRound([height, 0]);

    // var z = d3.scaleOrdinal()
      // .range(["#b4b719", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#d6164b"]);

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
      }
    });

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
        <svg ref={(node) => this.node = node } width={width} height={height}></svg>
      </div>
    )
  }
}

export default StackedBar;