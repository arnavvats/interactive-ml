import { Injectable } from '@angular/core';
import * as tf from '@tensorflow/tfjs';
import {from, Observable} from 'rxjs';
import {debug} from 'util';
import {min} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
// tslint:disable-next-line:variable-name
export class MlService {
  algorithms = [{
    name: 'Linear Regression',
    page: 'linear-regression'
  }, {
    name: 'Logistic Regression',
    page: 'logistic-regression'
  }, {
    name: 'K-Means',
    page: 'k-means'
  }];
  constructor() { }

  linearRegression(x_, y_, lr, iter) {
      const x = tf.tensor(x_);
      const y = tf.tensor(y_);
      let w = tf.scalar(0.05);
      let b = tf.scalar(0.05);
      const n = x_.length;
      const predictions = [];
      for (let i = 0 ; i < iter ; i++) {
        const pred = tf.add(tf.mul(x, w), b);
        const err = tf.div(tf.sub(pred, y), n);
        predictions.push(pred.data());
        // Promise.all([pred.data(), err.data(), w.data(), b.data()]).then(res => {
        //   console.log({
        //     iter: i,
        //     pred: res[0],
        //     err: res[1],
        //     w: res[2],
        //     b: res[3]
        //   });
        // });
        b =  tf.sub(b, tf.mul(tf.sum(err), lr));
        w = tf.sub(w, tf.mul(tf.sum(tf.mul(err, x)), lr));
      }
      return Promise.all(predictions);
  }
  // tslint:disable-next-line:variable-name
  kMeans(x_, y_ , n_clusters) {
    const n = x_.length;
    let centroidsX = [];
    let centroidsY = [];
    for (let i = 0; i < n_clusters; i++) {
      centroidsX.push(x_[i]);
      centroidsY.push(y_[i]);
    }
    const predictions = [];
    let shouldBreak;
    while (true) {
      shouldBreak = true;
      const nextCentroidX = [];
      const nextCentroidY = [];
      const totalPoints = [];
      const nextAssignments = [];
      for (let i = 0; i < n_clusters; i++) {
        nextCentroidX.push(0);
        nextCentroidY.push(0);
        totalPoints.push(0);
      }
      for (let i = 0; i < n; i++) {
        let assigned = -1;
        let minDist = 10000;
        let currentDist;
        for (let j = 0; j < n_clusters; j++) {
          currentDist = this.calculateDistance(x_[i], y_[i], centroidsX[j], centroidsY[j]);
          if (currentDist < minDist) {
            minDist = currentDist;
            assigned = j;
          }
        }
        nextAssignments.push(assigned);
        nextCentroidX[assigned] += x_[i];
        nextCentroidY[assigned] += y_[i];
        totalPoints[assigned]++;
      }
      for (let i = 0; i < n_clusters; i++) {
        if (totalPoints[i] > 0) {
          nextCentroidX[i] /= totalPoints[i];
          nextCentroidY[i] /= totalPoints[i];
        }
        if (nextCentroidX[i] !== centroidsX[i] || nextCentroidY[i] !== centroidsY[i]) {
          shouldBreak = false;
        }
      }
      if (shouldBreak) { break; }
      predictions.push({assignments: nextAssignments, centroidsX: nextCentroidX, centroidsY: nextCentroidY});
      centroidsX = nextCentroidX;
      centroidsY = nextCentroidY;
    }
    return Promise.all(predictions);
  }
  calculateDistance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
  }
  gpuToCpu(arr) {
    return arr.map(t => t.get());
  }
  randomArray(len) {
    const arr  = [];
    for (let i = 0 ; i < len; i++) {
      arr.push(Math.random());
    }
    return arr;
  }
}
