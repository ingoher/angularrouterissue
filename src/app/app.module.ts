import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule, HammerModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { LottieModule } from 'ngx-lottie';

import { AppComponent } from './app.component';
import { BaseLayoutModule } from './modules/base-layout/base-layout.module';
import { pruningTranslateLoaderFactory } from './pruning-translation-loader';

export function playerFactory() {
  return import('lottie-web');
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: pruningTranslateLoaderFactory,
        deps: [HttpClient],
      },
    }),
    BrowserAnimationsModule,
    LottieModule.forRoot({ player: playerFactory }),
    BaseLayoutModule,

    HammerModule,
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
