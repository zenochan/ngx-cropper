import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent
{
  title = 'ngx-cropper-lib';
  fileOrUrl: File | string = '';


  cropped(file: File)
  {
    console.error('cropped', file);
  }

}
