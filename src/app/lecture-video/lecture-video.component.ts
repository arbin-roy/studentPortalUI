import { Component, OnInit } from '@angular/core';
import { MatDialog} from '@angular/material/dialog';
import { VideoComponent} from '../video/video.component';

@Component({
  selector: 'app-lecture-video',
  templateUrl: './lecture-video.component.html',
  styleUrls: ['./lecture-video.component.scss']
})
export class LectureVideoComponent implements OnInit {
  video = [
    {subject: 'Cyber Security', videos: [{title: 'Test Video', link: '/gnjgnengerg'}]},
    {subject: 'Digital Marketing', videos: [{title: 'Test Video', link: '/gnjgnengerg', desc: 'Just for testing purpose'}, {title: 'Test Video 1', link: '/gnjgnengerg', desc: 'Just for testing purpose 1'}, {title: 'Test Video 2', link: '/gnjgnengerg', desc: 'Just for testing purpose 2'}, {title: 'Test Video 3', link: '/gnjgnengerg', desc: 'Just for testing purpose 3'}, {title: 'Test Video 4', link: '/gnjgnengerg', desc: 'Just for testing purpose 4'}, {title: 'Test Video 5', link: '/gnjgnengerg', desc: 'Just for testing purpose 5'}]},
    {subject: 'Values and Ethics', videos: []}
  ];

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialog(video: any) {
    this.dialog.open(VideoComponent, { disableClose: true, data: video });
  }

}
