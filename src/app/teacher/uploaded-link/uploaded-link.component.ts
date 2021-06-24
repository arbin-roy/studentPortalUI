import {Component, OnInit} from '@angular/core';
import {TeacherService} from '../../services/teacher.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-uploaded-link',
  templateUrl: './uploaded-link.component.html',
  styleUrls: ['./uploaded-link.component.scss']
})
export class UploadedLinkComponent implements OnInit {

  links = [];
  displayedColumns: string[];

  constructor(private teacherUploadService: TeacherService,
              private snackBar: MatSnackBar,
              private dialog: MatDialog) { 
              }

  ngOnInit(): void {
    this.teacherUploadService.getLinks().subscribe(result => {
      console.log(result.data)
      this.links = result.data;
      this.displayedColumns= ['SrNo', 'link', 'desc'];
    }, error => {
      switch (error.status) {
        case 0: this.snackBar.open('Server connection establishment failed', 'Close'); break;
      }
    });
  }
  

  openLink(url): void{
    window.open(url);
  }
}
