import { HttpClient } from '@angular/common/http';
import { TranslateLoader } from '@ngx-translate/core';
import { map } from 'rxjs/operators';

export class PruningTranslationLoader implements TranslateLoader {
  constructor(private http: HttpClient, private prefix: string, private suffix: string) {}
  public getTranslation(lang: string): any {
    return this.http.get(`${this.prefix}${lang}${this.suffix}`).pipe(map(res => this.process(res)));
  }
  private process(object: any) {
    const newObject: any = {};
    for (const key in object) {
      if (object.hasOwnProperty(key)) {
        if (typeof object[key] === 'object') {
          newObject[key] = this.process(object[key]);
        } else if (typeof object[key] === 'string' && object[key] === '') {
          // do not copy empty strings
        } else {
          newObject[key] = object[key];
        }
      }
    }
    return newObject;
  }
}

export const pruningTranslateLoaderFactory = (http: HttpClient) =>
  new PruningTranslationLoader(http, '/assets/i18n/', '.json');
