import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { UploadVideoComponent} from './upload-video/upload-video.component';
import { UploadNoteComponent} from './upload-note/upload-note.component';
import { UploadLinkComponent } from './upload-link/upload-link.component'
@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  uploadItems = [
    {
      title: 'PDF or Notes',
      image: 'https://i2.wp.com/www.thenfapost.com/wp-content/uploads/2020/08/unnamed-2.png?fit=512%2C512&ssl=1',
      desc: 'Click here to upload PDF\'s or notes'
    },
    {
      title: 'Video',
      image: 'https://www.pngkit.com/png/full/267-2678423_bacteria-video-thumbnail-default.png',
      desc: 'Click here to upload video'
    },
    {
      title: 'Important Link\'s',
      image: 'https://upload.wikimedia.org/wikipedia/commons/e/ee/Chain_link_icon.png',
      desc: 'Click here to upload a link'
    }
  ];

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  openDialog(item: string) {
    switch (item) {
      case 'Video': this.dialog.open(UploadVideoComponent, {disableClose: true, data: item}); break;
      case 'PDF or Notes': this.dialog.open(UploadNoteComponent, {disableClose: true, data: item}); break;
      case 'Important Link\'s': this.dialog.open(UploadLinkComponent, {disableClose: true, data: item}); break; 
    }
  }

}
