import { ElementRef } from '@angular/core';
import { LineChartConfig, LineChartData } from '../models/line.model';
import * as d3 from 'd3';
import { BarChartData } from '../models/bar.model';

export class BarChart {
  constructor(selector: ElementRef, data: ArrayLike<BarChartData>, config: LineChartConfig) {
    const svg = this.svg(selector, config);
    const scaleX = d3.scaleBand()
      .range([0, config.width])
      .padding(0.1);
    const scaleY = d3.scaleLinear()
      .range([config.height, 0]);

    // @ts-ignore
    scaleX.domain(data.map(d => d.year));
    scaleY.domain([0, d3.max(data, d => d.rate)]);

    svg.append('g')
      .call(this.xAxisView(config, scaleX));

    svg.append('g')
      .call(this.yAxisView(config, scaleY));

    svg.selectAll('.bar')
    // @ts-ignore
      .data(data)
      .enter().append('rect')
      .attr('fill', 'grey')
      .attr('x', (d) => scaleX(d.year))
      .attr('width', scaleX.bandwidth())
      .attr('y', d => scaleY(d.rate))
      .attr('height', d => config.height - scaleY(d.rate));

  }

  private xAxisView(config, scaleX) {
    return g => g
      .attr('transform', 'translate(0,' + config.height + ')')
      .call(d3.axisBottom(scaleX).ticks(config.width / 80).tickSizeOuter(0));
  }

  private yAxisView(config, scaleY) {
    return g => g
      .call(d3.axisLeft(scaleY))
      .call(g => g.select('.domain').remove())
      .call(g => g.select('.tick:last-of-type text').clone()
        .attr('x', 3)
        .attr('text-anchor', 'start')
        .attr('font-weight', 'bold'));
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
