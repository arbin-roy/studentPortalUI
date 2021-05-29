import { Component, OnInit } from '@angular/core';
import { MatDialog} from '@angular/material/dialog';
import { VideoComponent} from '../video/video.component';
import {LectureVideosService} from '../services/lecture-videos.service'

@Component({
  selector: 'app-lecture-video',
  templateUrl: './lecture-video.component.html',
  styleUrls: ['./lecture-video.component.scss']
})
export class LectureVideoComponent implements OnInit {
  video = [];

  constructor(private dialog: MatDialog,
              private lecturevideos: LectureVideosService) { }

  ngOnInit(): void {
    this.lecturevideos.getVideos().subscribe(res => {
      console.log(res);
      this.video = res.data;
    }, error => {
      console.log(error);
      /* switch (error.status) {
        case 404:
          this.snackBar.open(error.error.message, 'Close'); break;
        case 401:
          this.snackBar.open(error.error, 'Close'); break;
        case 0: this.snackBar.open('Server connection establishment failed', 'Close'); break;
      } */
    });
  }

  openDialog(video: any): void {
    this.dialog.open(VideoComponent, { disableClose: true, data: video });
  }

}
