import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GeoMapChart } from '../../../D3/charts/geo-map.d3';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { GeoMapConfig } from '../../../D3/models/geo-map.model';
import { forkJoin } from 'rxjs';

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

  constructor(private httpService: HttpClient) {}

  ngAfterViewInit() {
    forkJoin(
      this.httpService.get('https://s3-us-west-2.amazonaws.com/s.cdpn.io/535422/election-data.json'),
      this.httpService.get('./assets/datasets/uk.topojson.json')
    ).subscribe(
      ([electionData, mapData]) => {
        this.chart = new GeoMapChart(this.mapEl, mapData, this.geoMapConfig, electionData);
      },
      (err: HttpErrorResponse) => {
        console.log (err.message);
      }
    );
  }

}
