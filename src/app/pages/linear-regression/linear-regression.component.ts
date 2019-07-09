import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {LinearRegressionService} from './linear-regression.service';
import {PlotlyService} from '../../shared/services/plotly.service';
import {delay, flatMap, map, take} from 'rxjs/operators';
import {from, interval, Observable, of} from 'rxjs';
declare var Plotly;
@Component({
  selector: 'app-linear-regression',
  templateUrl: './linear-regression.component.html',
  styleUrls: ['./linear-regression.component.scss']
})
export class LinearRegressionComponent implements OnInit {
  @ViewChild('plotlyGraph', {static: true}) plotlyGraphRef: ElementRef;
   layout = {
    title: 'Linear Regression',
    font: {size: 18},
     xaxis: {range: [0, 100], },
     yaxis: {range: [0, 100], screenratio: 1},
     height: window.document.body.offsetHeight * 0.8
  };
   colors = ['#00000', '#00000', '#00000',
    '#00000', '#00000', '#00000'];
   data;
  graphEl;
  x = [];
  y = [];
  constructor(private linearRegressionService: LinearRegressionService, private plotlyService: PlotlyService) { }

  ngOnInit() {
    this.graphEl = this.plotlyGraphRef.nativeElement;
    this.data = [{x: this.x, y: this.y, type: 'scatter',
      mode: 'markers', marker: {size: 16, color: this.colors}}];
    this.initializeGraph();
    this.selectPoints();
  }

  initializeGraph() {
    Plotly.newPlot(this.graphEl, this.data, this.layout, {responsive: true});
  }
  selectPoints() {
    this.graphEl.addEventListener('click', evt => {
      const {mx, cx, my, cy, xy1, xy2, yy1, yy2} = this.plotlyService.getOffsets(this.graphEl);
      const xInDataCoord = Math.round(mx * evt.x + cx);
      const yInDataCoord = Math.round(my * evt.y + cy);
      if (xInDataCoord >= xy1 && xInDataCoord <= xy2 && yInDataCoord >= yy1 && yInDataCoord <= yy2) {
      console.log(xInDataCoord, yInDataCoord);
      this.x.push(xInDataCoord);
      this.y.push(yInDataCoord);
      this.layout.xaxis.range = [xy1, xy2];
      this.layout.yaxis.range = [yy1, yy2];
      Plotly.redraw(this.graphEl);
      }
  });

  }

  linearRegressor() {
    // const [x, meanX, stdX] = this.meanStdTransform(this.x);
    // const [y, meanY, stdY] = this.meanStdTransform(this.y);
    const x = this.x;
    const y = this.y;
    this.linearRegressionService.
    linearRegression(x, y, 0.1, 500)
      .then((res: any) => {
        interval(100).pipe(take(res.length))
          .subscribe(i => {
            const pred = res[i];
            const xT = this.x;
            const predT = pred;
            // const xT = this.meanStdDeTransform(x, meanX, stdX);
            // const predT = this.meanStdDeTransform(pred, meanY, stdY);
            console.log(i);
            this.data = [{x: this.x, y: this.y, type: 'scatter',
              mode: 'markers', marker: {size: 16, color: this.colors}},
              {x: xT, y: predT, type: 'scatter', line: {shape: 'spline'}, mode: 'lines+markers'}];
            Plotly.react(this.graphEl, this.data);
          });
      });
  }
  meanStdTransform(arr) {
    const mean = arr.reduce((a, b) =>  a + b, 0) / this.x.length;
    const std = arr.map(el => Math.pow(el - mean, 2)).reduce((a, b) => a + b, 0);
    return [arr.map(el => (el - mean) / std), mean, std];
  }
  meanStdDeTransform(arr, mean, std) {
    return arr.map(el => el * std + mean);
  }
}
