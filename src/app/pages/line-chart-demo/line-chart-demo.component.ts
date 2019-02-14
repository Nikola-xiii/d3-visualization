import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { GeoMapChart } from '../../../D3/charts/geo-map.d3';
import { LineChart } from '../../../D3/charts/line.d3';
import { LineChartConfig, LineChartData } from '../../../D3/models/line.model';

@Component({
  selector: 'app-line-chart-demo',
  templateUrl: './line-chart-demo.component.html',
  styleUrls: ['./line-chart-demo.component.scss']
})
export class LineChartDemoComponent implements AfterViewInit {
  @ViewChild('lineChart') public chartEl: ElementRef;
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

  ngAfterViewInit() {
    this.httpService.get('./assets/datasets/euro-british-pound.json').subscribe(
      (data: LineChartData[]) => {
        this.chart = new LineChart(this.chartEl, data, this.lineChartConfig);
      },
      (err: HttpErrorResponse) => {
        console.log (err);
      });
  }
}
