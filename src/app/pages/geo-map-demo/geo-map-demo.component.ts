import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GeoMapChart } from '../../../D3/charts/geo-map.d3';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { GeoMapConfig } from '../../../D3/models/geo-map.model';

export interface DataOption {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-geo-map-demo',
  templateUrl: './geo-map-demo.component.html',
  styleUrls: ['./geo-map-demo.component.scss']
})
export class GeoMapDemoComponent implements AfterViewInit {
  @ViewChild('map') public mapEl: ElementRef;
  chart = {};

  dataOptions: DataOption[] = [
    {value: 'statistic', viewValue: 'Statistic'},
    {value: 'population', viewValue: 'Population'},
    {value: 'election', viewValue: 'Election'}
  ];

  geoMapConfig: GeoMapConfig = {
    width: 900,
    height: 900
  };

  constructor(private httpService: HttpClient) { }

  ngAfterViewInit() {
    this.httpService.get('./assets/datasets/uk.topojson.json').subscribe(
      data => {
        this.chart = new GeoMapChart(this.mapEl, data, this.geoMapConfig);
      },
      (err: HttpErrorResponse) => {
        console.log (err.message);
      }
    );
  }

}
