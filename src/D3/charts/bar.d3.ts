import { ElementRef } from '@angular/core';
import { LineChartConfig, LineChartData } from '../models/line.model';
import * as d3 from 'd3';

export class BarChart {
  constructor(selector: ElementRef, data: ArrayLike<LineChartData>, config: LineChartConfig) {
    const svg = this.svg(selector, config);
    const x = d3.scaleBand()
      .range([0, config.width])
      .padding(0.1);
    const y = d3.scaleLinear()
      .range([config.height, 0]);

    x.domain(data.map(d => d.year));
    y.domain([0, d3.max(data, d => d.rate)]);
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
