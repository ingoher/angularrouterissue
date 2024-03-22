import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { MaterialModule } from '../../../material.module';
import { TextButtonComponent } from './text-button.component';

@NgModule({
  declarations: [TextButtonComponent],
  imports: [CommonModule, TranslateModule, MaterialModule],
  exports: [TextButtonComponent],
})
export class TextButtonModule {}
