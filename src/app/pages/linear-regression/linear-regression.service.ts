import { Injectable } from '@angular/core';
import {MlService} from '../../shared/services/ml.service';
@Injectable({
  providedIn: 'root'
})
export class LinearRegressionService {

  constructor(private mlService: MlService) { }
  linearRegression(x, y, lr, iter) {
    return this.mlService.linearRegression(x, y, lr, iter);
  }
}
