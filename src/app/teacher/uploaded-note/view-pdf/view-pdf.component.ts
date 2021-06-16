import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { baseurl} from '../../../../environments/environment';
import {TeacherService} from '../../../services/teacher.service';

@Component({
  selector: 'app-view-pdf',
  templateUrl: './view-pdf.component.html',
  styleUrls: ['./view-pdf.component.scss']
})
export class ViewPdfComponent implements OnInit {
  baseURL = baseurl;
  noteLink;

  constructor(@Inject( MAT_DIALOG_DATA ) public note: any,
              public uploadedVideosService: TeacherService) { }

  ngOnInit(): void {}

}
