import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LinearRegressionComponent } from './pages/linear-regression/linear-regression.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import {SidebarModule} from 'ng-sidebar';
import { LogisticRegressionComponent } from './pages/logistic-regression/logistic-regression.component';
import { AboutComponent } from './pages/about/about.component';
import { KMeansComponent } from './pages/k-means/k-means.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LinearRegressionComponent,
    SidebarComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    LogisticRegressionComponent,
    AboutComponent,
    KMeansComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SidebarModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
