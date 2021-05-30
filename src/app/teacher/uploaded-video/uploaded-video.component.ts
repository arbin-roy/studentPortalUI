import {Component, OnInit} from '@angular/core';
import {TeacherUploadService} from '../../services/teacher-upload.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {VideoComponent} from '../../video/video.component';
import {MatDialog} from '@angular/material/dialog';
import { DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-uploaded-video',
  templateUrl: './uploaded-video.component.html',
  styleUrls: ['./uploaded-video.component.scss']
})
export class UploadedVideoComponent implements OnInit {
  videos = [];

  constructor(private teacherUploadService: TeacherUploadService,
              private snackBar: MatSnackBar,
              private dialog: MatDialog,
              private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.teacherUploadService.getVideos().subscribe(res => {
      this.videos = res.data;
    }, error => {
      console.log(error);
      switch (error.status) {
        case 404:
          this.snackBar.open(error.error.message, 'Close'); break;
        case 401:
          this.snackBar.open(error.error, 'Close'); break;
        case 0: this.snackBar.open('Server connection establishment failed', 'Close'); break;
      }
    });
  }

  openDialog(video: any): void {
    this.teacherUploadService.downloadVideo(video.title).subscribe(res => {
      const streamLink = window.URL.createObjectURL(this.returnBlob(res));
      video.link = this.sanitizer.bypassSecurityTrustResourceUrl(streamLink);
      this.dialog.open(VideoComponent, { disableClose: true, data: video });
    }, error => {
      console.log(error);
    });
  }

  returnBlob(res): Blob {
    return new Blob([res], {type: res.type});
  }

}
