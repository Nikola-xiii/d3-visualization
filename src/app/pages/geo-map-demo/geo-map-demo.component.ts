import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GeoMapChart } from '../../../D3/charts/geo-map.d3';

export interface DataOption {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-geo-map-demo',
  templateUrl: './geo-map-demo.component.html',
  styleUrls: ['./geo-map-demo.component.scss']
})
export class GeoMapDemoComponent implements OnInit {
  @ViewChild('map') public mapEl: ElementRef;
  chart = {};

  dataOptions: DataOption[] = [
    {value: 'statistic', viewValue: 'Statistic'},
    {value: 'population', viewValue: 'Population'},
    {value: 'election', viewValue: 'Election'}
  ];

  constructor() { }

  ngOnInit() {
    this.chart = new GeoMapChart(this.mapEl);
  }

}
