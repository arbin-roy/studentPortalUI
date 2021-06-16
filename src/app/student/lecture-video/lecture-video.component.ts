import { Component, OnInit } from '@angular/core';
import { MatDialog} from '@angular/material/dialog';
import { VideoComponent} from '../video/video.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {LectureVideosService} from '../services/lecture-videos.service'
import { DomSanitizer} from '@angular/platform-browser';
import * as fileSaver from 'file-saver';
import {AuthserviceService} from '../services/authservice.service';

@Component({
  selector: 'app-lecture-video',
  templateUrl: './lecture-video.component.html',
  styleUrls: ['./lecture-video.component.scss']
})
export class LectureVideoComponent implements OnInit {
  video = [];

  constructor(private dialog: MatDialog,
              private lecturevideos: LectureVideosService,
              private snackBar: MatSnackBar,
              private sanitizer: DomSanitizer,
              private authService: AuthserviceService) { }

  ngOnInit(): void {
    this.lecturevideos.getVideos().subscribe(res => {
      console.log(res);
      this.video = res.data;
    }, error => {
      console.log(error);
      switch (error.status) {
        case 404:
          this.snackBar.open(error.error.message, 'Close'); break;
        case 401:
          this.snackBar.open(error.error, 'Close');
          this.authService.logout();
          break;
        case 0: this.snackBar.open('Server connection establishment failed', 'Close'); break;
      }
    });
  }

  openDialog(video: any): void {
    // this.lecturevideos.downloadVideo(video.title).subscribe(res => {
    //   console.log(res);
    //   const streamLink = window.URL.createObjectURL(this.returnBlob(res));
    //   video.link = this.sanitizer.bypassSecurityTrustResourceUrl(streamLink);
    //   this.dialog.open(VideoComponent, { disableClose: true, data: video });
    // }, error => {
    //   console.log(error);
    // });
    video.link = `http://localhost:5678/student/stream/${video.title}`;
    this.dialog.open(VideoComponent, { disableClose: true, data: video });
  }

  returnBlob(res): Blob {
    return new Blob([res], {type: res.type});
  }

  download(name): void {
    this.lecturevideos.downloadVideo(name).subscribe(res => {
      if (res){
        fileSaver.saveAs(this.returnBlob(res), name);
      }
    });
  }
}
