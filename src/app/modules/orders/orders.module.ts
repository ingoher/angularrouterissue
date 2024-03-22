import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatNativeDateModule } from '@angular/material/core';
import { NguCarousel } from '@ngu/carousel';
import { TranslateModule } from '@ngx-translate/core';
import { FileUploadModule } from 'ng2-file-upload';
import { CarouselModule } from 'ngx-owl-carousel-o';

import { MaterialModule } from '../../material.module';
import {
  OrderAddressComponent,
  OrderTypeComponent,
  OrderWizardComponent,
} from './components';
import { OrdersRoutingModule } from './orders-routing.module';
import { TextButtonModule } from 'src/app/building-blocks/buttons/text-button/text-button.module';
import { StepperModule } from 'src/app/building-blocks/stepper/stepper.module';

@NgModule({
  declarations: [
    OrderWizardComponent,
    OrderTypeComponent,
    OrderAddressComponent,
  ],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    TranslateModule,
    MaterialModule,
    StepperModule,
    TextButtonModule,
    CarouselModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    FormsModule,
    MatNativeDateModule,
    FileUploadModule,
    NguCarousel,
  ],
  providers: [DatePipe],
})
export class OrdersModule {}
