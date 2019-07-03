import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {NgxCropperComponent} from './ngx-cropper.component';
import {
  MatButtonModule,
  MatButtonToggleModule,
  MatDialogModule,
  MatIconModule,
  MatInputModule,
  MatSliderModule,
  MatTooltipModule
} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgxFileDropModule} from 'ngx-file-drop';

@NgModule({
  declarations: [NgxCropperComponent],
  imports: [
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    MatButtonToggleModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatTooltipModule,
    MatInputModule,
    CommonModule,
    FormsModule,
    MatSliderModule,
    NgxFileDropModule
  ],
  exports: [NgxCropperComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NgxCropperModule {}
