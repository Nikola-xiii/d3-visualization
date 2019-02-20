import { LineChartConfig, LineChartData } from '../models/line.model';
import * as d3 from 'd3/index';
import { ElementRef } from '@angular/core';

export class LineChart {
  constructor(selector: ElementRef, data: ArrayLike<LineChartData>, config: LineChartConfig) {
    const scaleX = d3.scaleTime()
      .domain(d3.extent(data, (d) => new Date(d.date)))
      .range([config.margin.left, config.width - config.margin.right]);

    const scaleY = d3.scaleLinear()
      .domain([d3.min(data, d => d.value), d3.max(data, d => d.value)])
      .range([config.height - config.margin.bottom, config.margin.top]);

    const svg = this.svg(selector, config);

    svg.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 1.5)
      .attr('stroke-linejoin', 'round')
      .attr('stroke-linecap', 'round')
      // @ts-ignore
      .attr('d', this.lineView(scaleX, scaleY));

    svg.append('g')
      .call(this.xAxisView(config, scaleX));

    svg.append('g')
      .call(this.yAxisView(config, scaleY));

  }

  private svg(selector, config: LineChartConfig) {
    const width = config.width + config.margin.left + config.margin.right;
    const height = config.height + config.margin.top + config.margin.left;
    const translate = 'translate(' + config.margin.left + ',' + config.margin.top + ')';

    return d3.select(selector.nativeElement)
      .append('svg').attr('width', width).attr('height', height)
      .append('g').attr('transform', translate);
  }

  private lineView(scaleX, scaleY) {
    const xScale = (d) => scaleX(new Date(d.date));
    const yScale = (d) => scaleY(d.value);
    const definedCheck = (d) => !isNaN(d.value);

    // @ts-ignore
    return d3.line().defined(definedCheck)
      .x(xScale)
      .y(yScale);
  }

  private xAxisView(config, scaleX) {
    return g => g
      .attr('transform', `translate(0,${config.height - config.margin.bottom})`)
      .call(d3.axisBottom(scaleX).ticks(config.width / 80).tickSizeOuter(0));
  }

  private yAxisView(config, scaleY) {
    return g => g
      .attr('transform', `translate(${config.margin.left},0)`)
      .call(d3.axisLeft(scaleY))
      .call(g => g.select('.domain').remove())
      .call(g => g.select('.tick:last-of-type text').clone()
        .attr('x', 3)
        .attr('text-anchor', 'start')
        .attr('font-weight', 'bold'));
  }
}
