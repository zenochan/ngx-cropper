# zz-ngx-cropper
> forked from [ngx-image-editor](https://github.com/hggeorgiev/ngx-image-editor)

### [Live Demo](https://zenochan.github.io/ngx-cropper/)

```bash
npm i -S @zenochan/ngx-cropper ngx-file-drop
```



```html
<zz-ngx-cropper
    [aspectRatio]="1"
    [file]="fileOrUrl"
    (cropped)="cropped($event)">

</zz-ngx-cropper>
```
