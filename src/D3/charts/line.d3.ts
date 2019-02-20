import { LineChartConfig, LineChartData } from '../models/line.model';
import * as d3 from 'd3/index';
import { ElementRef } from '@angular/core';

export class LineChart {
  public chart: any = {};
  constructor(selector: ElementRef, data: ArrayLike<LineChartData>, config: LineChartConfig) {
    const scaleX = d3.scaleTime()
      .domain(d3.extent(data, (d) => new Date(d.date)))
      .range([config.margin.left, config.width - config.margin.right]);

    const scaleY = d3.scaleLinear()
      .domain([d3.min(data, d => d.value), d3.max(data, d => d.value)])
      .range([config.height - config.margin.bottom, config.margin.top]);

    this.chart = this.createSVG(selector, config);

    this.chart.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 1.5)
      .attr('stroke-linejoin', 'round')
      .attr('stroke-linecap', 'round')
      // @ts-ignore
      .attr('d', this.lineView(scaleX, scaleY));
  }

  private createSVG(selector, config: LineChartConfig) {
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
}
