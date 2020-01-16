import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LinearRegressionComponent} from './pages/linear-regression/linear-regression.component';
import {HomeComponent} from './pages/home/home.component';
import {AboutComponent} from './pages/about/about.component';
import {LogisticRegressionComponent} from './pages/logistic-regression/logistic-regression.component';
import {KMeansComponent} from './pages/k-means/k-means.component';

const routes: Routes = [
  {
    path: 'linear-regression', component: LinearRegressionComponent
  },
  {
    path: 'logistic-regression', component: LogisticRegressionComponent
  },
  {
    path: 'k-means', component: KMeansComponent
  },
  {
  path: 'home', component: HomeComponent
  },
  {
    path: 'about', component: AboutComponent
  },
  {
    path: '**', redirectTo: 'linear-regression'
  }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
