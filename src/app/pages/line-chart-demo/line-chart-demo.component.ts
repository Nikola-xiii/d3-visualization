import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { GeoMapChart } from '../../../D3/charts/geo-map.d3';
import { LineChart } from '../../../D3/charts/line.d3';
import { LineChartConfig, LineChartData } from '../../../D3/models/line.model';
import { BarChart } from '../../../D3/charts/bar.d3';
import { BarChartData } from '../../../D3/models/bar.model';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-line-chart-demo',
  templateUrl: './line-chart-demo.component.html',
  styleUrls: ['./line-chart-demo.component.scss']
})
export class LineChartDemoComponent implements AfterViewInit {
  @ViewChild('lineChart') public lineChartEl: ElementRef;
  @ViewChild('barChart') public barChartEl: ElementRef;
  constructor(private httpService: HttpClient) { }
  lineChartConfig: LineChartConfig = {
    width: 600,
    height: 400,
    margin: {
      top: 30,
      bottom: 30,
      left: 30,
      right: 30
    }
  };

  chart = {};

  barChartData: Array<BarChartData> = [
    {year: '2011', rate: 3.1},
    {year: '2012', rate: 3.1},
    {year: '2013', rate: 3.1},
    {year: '2014', rate: 3.1},
    {year: '2015', rate: 3.1},
    {year: '2016', rate: 3.1},
  ];

  ngAfterViewInit() {
    forkJoin(
      this.httpService.get('./assets/datasets/euro-british-pound.json'),
      this.httpService.get('./assets/datasets/unemployment-rate.json')
    ).subscribe(
      ([dataLine, dataBar]) => {
        this.chart = new LineChart(this.lineChartEl, dataLine, this.lineChartConfig);
        this.chart = new BarChart(this.barChartEl, dataBar, this.lineChartConfig);
      },
      (err: HttpErrorResponse) => {
        console.log (err);
      });
  }
}
