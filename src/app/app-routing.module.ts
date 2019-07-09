import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LinearRegressionComponent} from './pages/linear-regression/linear-regression.component';
import {HomeComponent} from './pages/home/home.component';
import {AboutComponent} from './pages/about/about.component';
import {LogisticRegressionComponent} from './pages/logistic-regression/logistic-regression.component';

const routes: Routes = [
  {
    path: 'linear-regression', component: LinearRegressionComponent
  },
  {
    path: 'logistic-regression', component: LogisticRegressionComponent
  },
  {
  path: 'home', component: HomeComponent
  },
  {
    path: 'about', component: AboutComponent
  },
  {
    path: '**', redirectTo: 'home'
  }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
