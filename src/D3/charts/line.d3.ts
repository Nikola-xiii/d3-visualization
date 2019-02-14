import { LineChartConfig, LineChartData } from '../models/line.model';
import * as d3 from 'd3/index';
import { ElementRef } from '@angular/core';
import { Line } from 'd3/index';

export class LineChart {
  constructor(selector: ElementRef, data: ArrayLike<LineChartData>, config: LineChartConfig) {
    const format = d3.timeFormat('%Y-%m-%d');
    const x = d3.scaleTime()
      .domain(d3.extent(data, (d) => new Date(d.date)))
      .range([config.margin.left, config.width - config.margin.right]);
    console.log(d3.extent(data, (d) => new Date(d.date)));

    const xAxis = g => g
      .attr('transform', `translate(0,${config.height - config.margin.bottom})`)
      .call(d3.axisBottom(x).ticks(config.width / 80).tickSizeOuter(0));

    const y = d3.scaleLinear()
      .domain([d3.min(data, d => d.value), d3.max(data, d => d.value)])
      .range([config.height - config.margin.bottom, config.margin.top]);
    console.log([0, d3.max(data, d => d.value)]);

    const yAxis = g => g
      .attr('transform', `translate(${config.margin.left},0)`)
      .call(d3.axisLeft(y))
      .call(g => g.select('.domain').remove())
      .call(g => g.select('.tick:last-of-type text').clone()
        .attr('x', 3)
        .attr('text-anchor', 'start')
        .attr('font-weight', 'bold'));

    const xScale = (d) => x(new Date(d.date));
    const yScale = (d) => y(d.value);
    const definedCheck = (d) => !isNaN(d.value);

    // @ts-ignore
    const line: Line<LineChartData> = d3.line().defined(definedCheck)
      .x(xScale)
      .y(yScale);
    const svg = this.svg(selector, config);

    // svg.append('g')
    //   .call(xAxis);
    //
    // svg.append('g')
    //   .call(yAxis);

    svg.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 1.5)
      .attr('stroke-linejoin', 'round')
      .attr('stroke-linecap', 'round')
      .attr('d', line);

  }

  private svg(selector, config: LineChartConfig) {
    const width = config.width + config.margin.left + config.margin.right;
    const height = config.height + config.margin.top + config.margin.left;
    const translate = 'translate(' + config.margin.left + ',' + config.margin.top + ')';

    return d3.select(selector.nativeElement)
      .append('svg').attr('width', width).attr('height', height)
      .append('g').attr('transform', translate);
  }
}
