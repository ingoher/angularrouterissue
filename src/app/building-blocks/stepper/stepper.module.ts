import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MaterialModule } from '../../material.module';
import { StepperComponent } from './components/stepper/stepper.component';

@NgModule({
  declarations: [StepperComponent],
  imports: [CommonModule,  MaterialModule],
  exports: [StepperComponent],
})
export class StepperModule {}
