import { Component } from '@angular/core';
import {SidebarService} from './shared/services/sidebar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'interactive-ml';
  constructor(private sidebarService: SidebarService) {}


}
