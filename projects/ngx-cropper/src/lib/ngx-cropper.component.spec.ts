import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NgxCropperComponent} from './ngx-cropper.component';

describe('NgxCropperComponent', () => {
  let component: NgxCropperComponent;
  let fixture: ComponentFixture<NgxCropperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NgxCropperComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxCropperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
