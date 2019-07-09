import { Injectable } from '@angular/core';

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
}
