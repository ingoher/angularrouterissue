import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

import { BaseLayoutService } from '../../../base-layout/services/base-layout';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(private baseLayoutService: BaseLayoutService) {
    this.baseLayoutService.registerNewPageAndSetConfig('/home', {
      isSideNavActive: true,
      isCableBackgroundActive: false,
      isBreadcrumbActive: true,
    });
  }
}
