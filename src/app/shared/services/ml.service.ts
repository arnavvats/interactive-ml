import { Injectable } from '@angular/core';
import * as tf from '@tensorflow/tfjs';
import {from, Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MlService {
  algorithms = [{
    name: 'Linear Regression',
    page: 'linear-regression'
  }, {
    name: 'Logistic Regression',
    page: 'logistic-regression'
  }];
  constructor() { }

  // tslint:disable-next-line:variable-name
  linearRegression(x_, y_, lr, iter) {
      const x = tf.tensor(x_);
      const y = tf.tensor(y_);
      let w = tf.scalar(0.01 + Math.random() * 0.99);
      let b = tf.scalar(0.01 + Math.random() * 0.99);
      const n = x_.length;
      const predictions = [];
      for (let i = 0 ; i < iter ; i++) {
        const pred = tf.add(tf.mul(x, w), b);
        const err = tf.div(tf.sub(pred, y), n);
        predictions.push(pred.data());
        b =  tf.sub(b, tf.mul(tf.sum(err), lr));
        w = tf.sub(w, tf.mul(tf.sum(tf.mul(err, x)), lr));
      }
      return Promise.all(predictions);
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
