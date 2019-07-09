import { Component, OnInit } from '@angular/core';
import {SidebarService} from '../../services/sidebar.service';
import {MlService} from '../../services/ml.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  mlAlgorithms = [];
  constructor(private sidebarService: SidebarService, private mlService: MlService) {
    this.mlAlgorithms = this.mlService.algorithms;
  }

  ngOnInit() {
  }

  close() {
    this.sidebarService.opened = false;
  }
}
