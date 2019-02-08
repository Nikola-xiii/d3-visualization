import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GeoMapChart } from '../../../D3/charts/geo-map.d3';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

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

  constructor(private httpService: HttpClient) { }

  ngAfterViewInit() {
    this.httpService.get('./assets/datasets/uk.topojson.json').subscribe(
      data => {
        this.chart = new GeoMapChart(this.mapEl, data);
      },
      (err: HttpErrorResponse) => {
        console.log (err.message);
      }
    );
  }

}
