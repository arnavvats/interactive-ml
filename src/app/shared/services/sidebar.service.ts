import { Injectable } from '@angular/core';
import {GuardsCheckEnd, Navigation, NavigationStart, Router, RoutesRecognized} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  opened = false;

  constructor(private router: Router) {
    router.events.subscribe((event) => {

      if (event instanceof RoutesRecognized) {
        this.opened = false;
      }

    });
  }
}
