import { Component, OnInit } from '@angular/core';

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

  dataOptions: DataOption[] = [
    {value: 'statistic', viewValue: 'Statistic'},
    {value: 'population', viewValue: 'Population'},
    {value: 'election', viewValue: 'Election'}
  ];

  constructor() { }

  ngOnInit() {
  }

}
