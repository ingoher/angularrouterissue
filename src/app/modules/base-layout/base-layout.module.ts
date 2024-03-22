import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';
import { CarouselModule } from 'ngx-owl-carousel-o';

import { AppRoutingModule } from '../../app-routing.module';
import { MaterialModule } from '../../material.module';
import { BaseLayoutComponent } from './components';
import { TextButtonModule } from 'src/app/building-blocks/buttons/text-button/text-button.module';

@NgModule({
  declarations: [BaseLayoutComponent],
  imports: [
    CommonModule,
    TranslateModule,
    TextButtonModule,
    MaterialModule,
    AppRoutingModule,
    CarouselModule,
    BrowserAnimationsModule,
  ],
  exports: [BaseLayoutComponent],
})
export class BaseLayoutModule {}
