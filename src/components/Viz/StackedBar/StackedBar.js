import React, { Component } from 'react';
import moment from 'moment';
import * as d3 from 'd3';

import { Legend } from 'components/Viz';

import './StackedBar.css';

class StackedBar extends Component {
  static defaultProps = {
    ticks: 10,
    showLegend: false,
    brushRange: null
  }

  componentWillReceiveProps(nextProps) {
    const { id, range, brushRange } = nextProps;

    if (brushRange) {
      // console.log(brushRange);
      // this.g.select(".brush").call(this.brush, brushRange);
    }

    if (range) {
      this.renderChart(range);
    }
  }

  renderChart(range = null) {
    if (range == null) {
      range = [0,99999];
    }

    const { id, showLegend, ticks, brushRange } = this.props;

    const bottom = showLegend ? 60 : 20;

      d3.select("#" + id).select(".chart").remove();

    var svg = d3.select("#" + id),
        margin = {
          top: 20,
          right: 60,
          bottom,
          left: 40
        },
        width = +svg.attr("width") - margin.left - margin.right,
        height = +svg.attr("height") - margin.top - margin.bottom,
        g = svg
            .append("g")
            .attr("class","chart")
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

    var z = d3.scaleOrdinal().range(["#b4b719", "#f1c40f", "#f5930d", "#f8640a", "#fc3306"]);

    var stack = d3.stack()
        .offset(d3.stackOffsetExpand);

    var data = this.props.data.filter((d,i) => i >= range[0] && i <= range[1]).map((d,i) => {
        return {
            "index": i,
            "label": d.mes + "/" + d.ano,
            "pontual": d.pontual.normalizado,
            "8-15": d["8-15"].normalizado,
            "16-30": d["16-30"].normalizado,
            "31-60": d["31-60"].normalizado,
            "60+": d["60+"].normalizado
        }
    });
    //d3.csv("data.csv", type, function (error, data) {
    //  if (error) throw error;


      //data.sort(function (a, b) {
      //  return b[data.columns[1]] / b.total - a[data.columns[1]] / a.total;
      //});
      //var columnsAux = data.columns;
      //data.columns = columnsAux;

      x.domain(data.map((d,i) => d.label));
      z.domain(["pontual","8-15","16-30","31-60","60+"]);

      data.forEach(function (d) {
          var y0 = 0;
          d.atraso = z.domain().map((name) => { return { name: name, y0: y0, y1: y0 += +d[name] }; });
          //d.total = d.ages[d.ages.length - 1].y1;
      });

      //d3.keys(data[0]).filter(k => k != "index" && k != "label")
      var serie = g.selectAll(".serie")
          .data(data)
          .enter().append("g")
          .attr("class", "serie")
          .attr("transform",(d,i) => {
            return "translate(" + x(d.label) + ",0)";
          });

      serie.selectAll("rect")
          .data(d => d.atraso)
          .enter().append("rect")
          .attr("x", "0")
          .attr("y", function (d) {
            return y(d.y1/100);
          })
          .attr("height", function (d) {
            return y(d.y0/100) - y(d.y1/100);
          })
          .attr("width", x.bandwidth())
          .style("fill", function (d) { return z(d.name); });

      g.append("g")
          .attr("class", "axis axis--x")
          .attr("transform", "translate(0," + height + ")")
          .call(
              d3.axisBottom(x)
                  .tickValues(x.domain().filter(function(d, i) {
                    return (x.domain().length > 12) ? !(i % 3) : true;
                  }))
          );

      g.append("g")
          .attr("class", "axis axis--y")
          .call(d3.axisLeft(y).ticks(ticks, "%"));

      //var legend = serie.append("g")
      //    .attr("class", "legend")
      //    .attr("transform", function (d) {
      //      var d = d[d.length - 1];
      //      return "translate(" + (x(d.data.State) + x.bandwidth()) + "," + ((y(d[0]) + y(d[1])) / 2) + ")";
      //    });

      if (showLegend) {
        // legend.append("line")
        //   .attr("x1", -6)
        //   .attr("x2", 6)
        //   .attr("stroke", "#000");

        // legend.append("text")
        //   .attr("x", 9)
        //   .attr("dy", "0.35em")
        //   .attr("fill", "#000")
        //   .style("font", "10px sans-serif")
        //   .text(function (d) {
        //     return d.key;
        // });
      } else {
        const component = this;
        var brush = d3.brushX()
            .extent([[0, 0], [width, height]])
            .on("brush", function () {
              var selection = d3.event.selection;
              selection = selection.map(w => Math.floor(w/x.step()));
              //var selec = [];
              //selec[0] = x.domain()[selection[0]];
              //selec[1] = (selection[1] < x.domain().length) ? selection[1] : x.domain()[x.domain().length-1];

              component.props.onSelection(selection);
              // x.domain(selection.map(x.invert, x));
              // console.log(selection.map(x.invert, x));
              // g.selectAll(".series")
              //   .attr("x", function(d) { return x; })
              //   .attr("y", function(d) { return y; });
              // g.select(".axis--x").call(x);
            });

        this.brush = brush;

        svg.append("g")
            .attr("class", "brush")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
            .call(brush)
            .call(brush.move, brushRange);
      }
    //}.bind(this));

    function type(d, i, columns) {
      for (var j = 1, t = 0; j < columns.length; ++j) {
        t += d[columns[j]] = +d[columns[j]];
      }
      d.total = t;
      return d;
    }
  }

  componentDidMount() {
    this.renderChart();
  }

  render() {
    const { id, width, height, showLegend } = this.props;

    const classes = [
      {color: "#b4b71b", name: "Pontual"},
      {color: "#f1c411", name: "8 a 15"},
      {color: "#f5930d", name: "16 a 30"},
      {color: "#f8640a", name: "31 a 60"},
      {color: "#fc3306", name: "60+"}
    ];

    return (
      <div className="animated fadeIn">
        <svg id={id} width={width} height={height}>
          {showLegend && <Legend classes={classes} id={"legend-" + id} x="0" y={"" + height - 20} gap="100" />}
        </svg>
      </div>
    )
  }
}

export default StackedBar;