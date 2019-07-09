import { TestBed } from '@angular/core/testing';

import { LinearRegressionService } from './linear-regression.service';

describe('LinearRegressionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LinearRegressionService = TestBed.get(LinearRegressionService);
    expect(service).toBeTruthy();
  });
});
