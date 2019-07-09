import {Component, OnInit} from '@angular/core';
import {SidebarService} from './shared/services/sidebar.service';
declare var Plotly;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  title = 'interactive-ml';
  constructor(private sidebarService: SidebarService) {}
  ngOnInit(): void {

  }

}
