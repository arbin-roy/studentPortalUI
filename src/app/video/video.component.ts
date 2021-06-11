import {Component, OnInit, Inject, OnDestroy, ViewChild, ElementRef} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit, OnDestroy {
  @ViewChild('videoRef') private videoRef: ElementRef<HTMLVideoElement>;

  constructor(@Inject( MAT_DIALOG_DATA ) public video: any) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.videoRef.nativeElement.src = '';
    this.videoRef.nativeElement.load();
  }
}
