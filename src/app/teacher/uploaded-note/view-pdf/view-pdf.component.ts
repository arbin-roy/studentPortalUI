import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { baseurl} from '../../../../environments/environment';
import {TeacherUploadService} from '../../../services/teacher-upload.service';

@Component({
  selector: 'app-view-pdf',
  templateUrl: './view-pdf.component.html',
  styleUrls: ['./view-pdf.component.scss']
})
export class ViewPdfComponent implements OnInit {
  baseURL = baseurl;
  noteLink;

  constructor(@Inject( MAT_DIALOG_DATA ) public note: any,
              public uploadedVideosService: TeacherUploadService) { }

  ngOnInit(): void {}

  view(note): void {
    this.uploadedVideosService.viewPDF(note).subscribe(res => {
      console.log(res);
    }, error => {
      console.log(error);
    });
  }

}
