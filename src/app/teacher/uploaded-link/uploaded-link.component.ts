import {Component, OnInit} from '@angular/core';
import {TeacherUploadService} from '../../services/teacher-upload.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';


@Component({
  selector: 'app-uploaded-link',
  templateUrl: './uploaded-link.component.html',
  styleUrls: ['./uploaded-link.component.scss']
})
export class UploadedLinkComponent implements OnInit {

  links=[]
  displayedColumns: string[] = ['Sr.No', 'link', 'desc'];

  constructor(private teacherUploadService: TeacherUploadService,
              private snackBar: MatSnackBar,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.teacherUploadService.getLinks().subscribe(result => {
      console.log(result)
      this.links = result.data;
      console.log(this.links)
    }, error => {
      switch (error.status) {
        case 0: this.snackBar.open('Server connection establishment failed', 'Close'); break;
      }
    });
  }

}
