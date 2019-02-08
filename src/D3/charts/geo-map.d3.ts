import * as d3 from 'd3/index';
import * as topojson from 'topojson';
import { ElementRef } from '@angular/core';

export class GeoMapChart {
  constructor(selector: ElementRef, data) {
    console.log(selector);

    const width = 900;
    const height = 900;
    // set up map projection, and position it.
    const projection = d3.geoAlbers()
      .center([1.5, 55.2])
      .rotate([4.4, 0])
      .parallels([80, 80])
      .scale(3300)
      .translate([width / 2, height / 2]);
    const path = d3.geoPath().projection(projection);

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

    g.selectAll('path')
      .data(topojson.feature(data, data.objects.subunits).features)
      .enter().append('path').attr('fill', 'grey')
      .attr('d', path);
  }
}
