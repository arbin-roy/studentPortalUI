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
      image: '../../../assets/pdf.svg',
      desc: 'Click here to upload PDF\'s or notes'
    },
    {
      title: 'Video',
      image: '../../../assets/multimedia.svg',
      desc: 'Click here to upload video'
    },
    {
      title: 'Important Link\'s',
      image: '../../../assets/link.svg',
      desc: 'Click here to upload a link'
    }
  ];

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialog(item: string): void {
    switch (item) {
      case 'Video': this.dialog.open(UploadVideoComponent, {disableClose: true, data: item}); break;
      case 'PDF or Notes': this.dialog.open(UploadNoteComponent, {disableClose: true, data: item}); break;
      case 'Important Link\'s': this.dialog.open(UploadLinkComponent, {disableClose: true, data: item}); break;
    }
  }

}
