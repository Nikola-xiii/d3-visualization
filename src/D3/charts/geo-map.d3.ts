import * as d3 from 'd3/index';
import * as topojson from 'topojson';
import { ElementRef } from '@angular/core';

export class GeoMapChart {
  constructor(selector: ElementRef) {
    console.log(selector);
    const path = d3.geoPath();
    const width = 500;
    const height = 500;

    const svg = d3.select(selector.nativeElement).append('svg')
      .attr('width', width)
      .attr('height', height);

    const g = svg.append('g')
      .call(
        d3.zoom()
          .scaleExtent([1, 10])
          .on('zoom', () => {
            g.attr('transform', 'translate('
              + d3.event.translate
              + ')scale(' + d3.event.scale + ')');
          })
      );

    d3.json('../../datasets/uk.topojson.json', (error, uk) => {
      if (error) { return console.error(error); }

      svg.append('path')
        .datum(topojson.feature(uk, uk.objects.subunits))
        .attr('d', d3.geoPath().projection(d3.geoMercator()));
    });
  }
}
