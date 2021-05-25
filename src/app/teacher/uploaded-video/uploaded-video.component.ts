import { Component, OnInit } from '@angular/core';
import {UploadedVideosService} from '../../services/uploaded-videos.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {VideoComponent} from '../../video/video.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-uploaded-video',
  templateUrl: './uploaded-video.component.html',
  styleUrls: ['./uploaded-video.component.scss']
})
export class UploadedVideoComponent implements OnInit {
  videos = [];

  constructor(private uploadedVideosService: UploadedVideosService,
              private snackBar: MatSnackBar,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.uploadedVideosService.getVideos().subscribe(res => {
      console.log(res);
      this.videos = res.data;
    }, error => {
      console.log(error);
      switch (error.status) {
        case 404:
          this.snackBar.open(error.error.message, 'Close'); break;
        case 401:
          this.snackBar.open(error.error, 'Close'); break;
      }
    });
  }

  openDialog(video: any): void {
    this.dialog.open(VideoComponent, { disableClose: true, data: video });
  }

}
