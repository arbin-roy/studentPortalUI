import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../services/student.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.scss']
})
export class LinksComponent implements OnInit {

  link = [];
  displayedColumns: string[] = ['SrNo', 'link', 'desc'];

  constructor(private lectureLinks: StudentService,
              private snackBar: MatSnackBar,
              private dialog: MatDialog) { 
                this.lectureLinks.getLinks().subscribe(res => {
                  console.log(res);
                  this.link = res.data;
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

  ngOnInit(): void {
    
  }

  openLink(url): void{
    window.open(url);
  }
}
