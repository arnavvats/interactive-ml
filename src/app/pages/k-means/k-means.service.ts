import { Injectable } from '@angular/core';
import {MlService} from '../../shared/services/ml.service';
@Injectable({
  providedIn: 'root'
})
export class KMeansService {

  constructor(private mlService: MlService) { }
  kMeans(x, y, n_clusters) {
    return this.mlService.kMeans(x, y, n_clusters);
  }
}
