import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { environment } from '../environments/environment';

@Component({
  selector: 'root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private translateService: TranslateService) {
    this.initializeLanguageService();
  }

  initializeLanguageService() {
    this.translateService.addLangs(['de', 'en']);
    const lang = this.translateService.getBrowserLang();
    if (lang != undefined) {
      if (lang !== 'en' && lang !== 'de') {
        this.configureDefaultLang(environment.language);
      } else {
        this.configureDefaultLang(lang);
      }
    } else {
      this.configureDefaultLang(environment.language);
    }
  }

  configureDefaultLang(lang: string) {
    this.translateService.setDefaultLang(lang);
    this.translateService.use(lang);
  }
}
