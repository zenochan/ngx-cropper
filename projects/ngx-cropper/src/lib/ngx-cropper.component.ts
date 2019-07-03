import {AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import Cropper from 'cropperjs';
import {FileSystemFileEntry, NgxFileDropEntry} from 'ngx-file-drop';


@Component({
  selector: 'zz-ngx-cropper',
  templateUrl: './ngx-cropper.component.html',
  styleUrls: ['./ngx-cropper.component.scss'],
})
export class NgxCropperComponent implements OnInit, OnDestroy, AfterViewInit
{
  private cropper: Cropper;
  public croppedImage: string;
  public blob: Blob;
  public previewImageURL: any;

  private fileName: string = '';
  private fileType: string = 'image/jpeg';

  @ViewChild('previewImg', {static: false})
  public previewImage: any;

  @Input()
  public aspectRatio: number = 1;

  public fileOrUrl: string | File;

  @Input()
  set file(file: string | File)
  {
    this.fileOrUrl = file;
    this.handleFile();
  }


  @Output()
  public cropped: EventEmitter<File> = new EventEmitter<File>();


  public ngOnInit()
  {
    this.handleFile();
  }

  public ngOnDestroy()
  {
    this.cropper.destroy();
  }

  public ngAfterViewInit(): void
  {
    if (typeof this.fileOrUrl == 'string') {
      this.initCropper();
    }
  }

  private handleFile()
  {
    if (!this.fileOrUrl || typeof this.fileOrUrl == 'string') {
      return;
    }

    this.fileName = this.fileOrUrl.name;
    if (typeof this.fileOrUrl == 'string') {
      this.previewImageURL = this.fileOrUrl;
    } else if (this.fileOrUrl) {
      this.fileType = this.fileOrUrl.type;
      this.convertFileToBase64(this.fileOrUrl);
    }
  }

  private convertFileToBase64(file: File)
  {
    const reader = new FileReader();
    reader.addEventListener('load', (e: any) => this.previewImageURL = e.target.result, false);
    reader.onloadend = () => this.initCropper();
    reader.readAsDataURL(file);
  }

  public saveImage()
  {
    this.cropped.emit(new File([this.blob], this.fileName, {type: this.fileType}));
  }

  private initCropper()
  {
    this.cropper && this.cropper.destroy();

    enum DragMode { Move = 'move'}

    this.cropper = new Cropper(this.previewImage.nativeElement, {
      aspectRatio: this.aspectRatio,
      dragMode: DragMode.Move,
      cropend: () => {
        this.croppedImage = this.cropper.getCroppedCanvas().toDataURL(this.fileType);
        this.cropper.getCroppedCanvas().toBlob(blob => this.blob = blob);
        this.saveImage();
      }
    });
  }

  dropFile($event: NgxFileDropEntry[])
  {
    $event.find(item => {
      if (!item.fileEntry.isFile) {
        return false;
      }

      let result = false;

      (item.fileEntry as FileSystemFileEntry).file(file => {
        if (file.type.indexOf('image/') != -1) {
          this.file = file;
          result = true;
        }
      });

      return true;
    });
  }

  onFileChange($event: Event)
  {
    this.file = ($event.target as HTMLInputElement).files[0];
  }

}


