import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {NgxCropperComponent} from './ngx-cropper.component';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NgxFileDropModule} from 'ngx-file-drop';

@NgModule({
  declarations: [NgxCropperComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgxFileDropModule
  ],
  exports: [NgxCropperComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NgxCropperModule {}
