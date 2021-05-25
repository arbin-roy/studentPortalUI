import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadvideoComponent } from './uploadvideo.component';

describe('UploadvideoComponent', () => {
  let component: UploadvideoComponent;
  let fixture: ComponentFixture<UploadvideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadvideoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadvideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
