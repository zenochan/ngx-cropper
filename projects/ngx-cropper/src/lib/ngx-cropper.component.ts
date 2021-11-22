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
  public previewImageURL: any;

  private fileName: string = 'photo.jpg';
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
    if (file && typeof file != 'string') {
      this.fileName = file.name;
    }
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
    this.cropper && this.cropper.destroy();
    this.cropper = null;
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
      console.warn('invalidate input file');
    } else if (typeof this.fileOrUrl == 'string') {
      this.previewImageURL = this.fileOrUrl;
    } else {
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

  private initCropper()
  {
    this.cropper && this.cropper.destroy();

    enum DragMode { Move = 'move'}

    this.cropper = new Cropper(this.previewImage.nativeElement, {
      aspectRatio: this.aspectRatio,
      dragMode: DragMode.Move,
      cropend: () => {
        this.croppedImage = this.cropper.getCroppedCanvas().toDataURL(this.fileType);
        this.cropper.getCroppedCanvas().toBlob(blob => {
          this.cropped.emit(new File([blob], this.fileName, {type: this.fileType}));
        });
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


