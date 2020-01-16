import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {PlotlyService} from '../../shared/services/plotly.service';
import {delay, flatMap, map, take} from 'rxjs/operators';
import {from, interval, Observable, of} from 'rxjs';
import {KMeansService} from './k-means.service';
declare var Plotly;

@Component({
  selector: 'app-k-means',
  templateUrl: './k-means.component.html',
  styleUrls: ['./k-means.component.scss']
})
export class KMeansComponent implements OnInit {
  @ViewChild('plotlyGraph', {static: true}) plotlyGraphRef: ElementRef;
  layout = {
    title: 'K-Means',
    font: {size: 18},
    xaxis: {range: [0, 100], },
    yaxis: {range: [0, 100], screenratio: 1},
    height: window.document.body.offsetHeight * 0.8
  };
  colors = ['#00000', '#aaaabb', '#ce819e',
    '#c65ee2', '#23fb98', '#efe2b8'];
  data;
  graphEl;
  x = [];
  y = [];
  n_clusters = 2;
  throttle_value = 100;
  progress = false;
  constructor(private plotlyService: PlotlyService, private kMeansService: KMeansService) {
  }

  ngOnInit() {
    this.graphEl = this.plotlyGraphRef.nativeElement;
    this.data = [{x: this.x, y: this.y, type: 'scatter',
      mode: 'markers', marker: {size: 16, color: ['#000000']}}];
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
  performKMeans() {
     const x = this.x;
     const y = this.y;
     this.kMeansService.
    kMeans(x, y, this.n_clusters)
      .then((res: any) => {
        debugger;
        interval(this.throttle_value).pipe(take(res.length))
          .subscribe(i => {
            const pred = res[i].assignments;
            // const xT = this.x;
            // const predT = pred;
            const colors = pred.map(el => this.colors[el]);
            this.data = [{x: this.x, y: this.y, type: 'scatter', mode: 'markers', marker: {size: 16, color: colors}},
              {x: res.centroidsX, y: res.centroidsY, type: 'scatter', mode: 'markers', marker: {size: 32, color: this.colors}}];
            Plotly.react(this.graphEl, this.data);
          });
      });
  }
  meanStdTransform(arr) {
    const mean = arr.reduce((a, b) =>  a + b, 0) / this.x.length;
    const stdSq = arr.map(el => Math.pow(el - mean, 2)).reduce((a, b) => a + b, 0) / arr.length;
    const std = Math.pow(stdSq, 0.5);
    return [arr.map(el => (el - mean) / std), mean, std];
  }
  meanStdDeTransform(arr, mean, std) {
    return arr.map(el => el * std + mean);
  }

}
