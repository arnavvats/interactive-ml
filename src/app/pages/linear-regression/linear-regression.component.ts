import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {LinearRegressionService} from './linear-regression.service';
declare var Plotly;
@Component({
  selector: 'app-linear-regression',
  templateUrl: './linear-regression.component.html',
  styleUrls: ['./linear-regression.component.scss']
})
export class LinearRegressionComponent implements OnInit {
  @ViewChild('plotlyGraph', {static: true}) plotlyGraphRef: ElementRef;
  constructor(private linearRegressionService: LinearRegressionService) { }

  ngOnInit() {
  this.initializeGraph();
  }

  initializeGraph() {
    const graphEl = this.plotlyGraphRef.nativeElement;
    const trace1 = {
      x: [1, 2, 3, 4],
      y: [10, 15, 13, 17],
      type: 'scatter'
    };

    const trace2 = {
      x: [1, 2, 3, 4],
      y: [16, 5, 11, 9],
      type: 'scatter'
    };

    const data = [trace1, trace2];
    Plotly.newPlot(graphEl, data);
  }

}
