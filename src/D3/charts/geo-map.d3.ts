import * as d3 from 'd3/index';
import * as topojson from 'topojson';
import { ElementRef } from '@angular/core';
import { GeoPath, Path } from 'd3/index';
import { GeoMapConfig } from '../models/geo-map.model';



export class GeoMapChart {
  constructor(selector: ElementRef, data, config: GeoMapConfig) {

    const path = this.chart(config.width, config.height);
    console.log(selector);



    const svg = d3.select(selector.nativeElement).append('svg')
      .attr('width', config.width)
      .attr('height', config.height);

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

    console.log(data);

    g.selectAll('path')
      .data(topojson.feature(data, data.objects.subunits).features)
      .enter().append('path').attr('fill', 'grey')
      .attr('d', path);
  }

  // set up map projection, and position, size
  private chart(width: number, height: number): GeoPath {
    const projection = d3.geoAlbers()
      .center([1.5, 55.2])
      .rotate([4.4, 0])
      .parallels([50, 50])
      .scale(4500)
      .translate([width / 2, height / 2]);

    return d3.geoPath().projection(projection);
  }
}
