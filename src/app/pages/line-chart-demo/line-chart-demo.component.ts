import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-line-chart-demo',
  templateUrl: './line-chart-demo.component.html',
  styleUrls: ['./line-chart-demo.component.scss']
})
export class LineChartDemoComponent implements AfterViewInit {
  @ViewChild('lineChart') public chartEl: ElementRef;
  data = {
    {}
  }
  constructor() { }

  ngAfterViewInit() {

  }
}
