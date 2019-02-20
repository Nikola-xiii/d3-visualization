import * as d3 from 'd3/index';
import * as topojson from 'topojson';
import { ElementRef } from '@angular/core';
import { GeoPath, Path } from 'd3/index';
import { GeoMapConfig } from '../models/geo-map.model';

export class GeoMapChart {
  constructor(selector: ElementRef, data, config: GeoMapConfig, electionData) {

    const svg = this.chart(selector, config.width, config.height);
    const path = this.setGeoPath(config.width, config.height);
    console.log(selector);

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
    this.render(electionData, data, g, path);
  }

  // set up map projection, and position, size
  private chart(selector, width: number, height: number) {
    return d3.select(selector.nativeElement)
      .append('svg')
      .attr('width', width)
      .attr('height', height);
  }

  private setGeoPath(width: number, height: number): GeoPath {
    const projection = d3.geoAlbers()
      .center([1.5, 55.2])
      .rotate([4.4, 0])
      .parallels([50, 50])
      .scale(4000)
      .translate([width / 2, height / 2]);

    return d3.geoPath().projection(projection);
  }

  private getElectonWinnerById(electionData, id): string {
    return electionData.data.find(subunit => subunit.id === id).winner;
  }

  private render(electionData, data, g, path: GeoPath) {
    const color = d3.scaleOrdinal().range(['#0382AB', '#DA1502', '#722889', '#FDB218', '#7AB630', '#3C862D', '#F0DE4C', '#FF9900', 'gray']);
    color.domain([
      'Conservatives', 'Labour', 'UKIP', 'Liberal Democrats', 'Green Party',
      'Plaid Cymru', 'Scottish National Party', 'Democratic Unionist Party', 'Other']);
    g.selectAll('path')
      .data(topojson.feature(data, data.objects.subunits).features)
      .enter().append('path')
      .attr('d', path)
      .style('fill', (d) => {
        return color(this.getElectonWinnerById(electionData, d.properties.id));
      });
  }
}
