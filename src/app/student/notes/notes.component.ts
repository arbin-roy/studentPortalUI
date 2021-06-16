import { Component, OnInit } from '@angular/core';
import { ViewPdfComponent } from '../../teacher/uploaded-note/view-pdf/view-pdf.component'
import { StudentService } from '../../services/student.service'
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import {DomSanitizer} from '@angular/platform-browser';
import * as fileSaver from 'file-saver';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {

  notes=[]
  constructor(private lectureNote: StudentService,
              private snackBar: MatSnackBar,
              private dialog: MatDialog,
              private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.lectureNote.getNotes().subscribe(res => {
      console.log(res);
      this.notes = res.data;
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

  view(note): void {
    this.lectureNote.downloadPDF(note.title).subscribe(res => {
      console.log(res)
      note.link = window.URL.createObjectURL(this.returnBlob(res));
      this.dialog.open(ViewPdfComponent, {data: note, disableClose: true});
    }, error => {
      switch (error.status) {
        case 401: this.snackBar.open('Session timed out. Please relogin again', 'Close');
      }
    });
  }

  returnBlob(res): Blob {
    console.log(res.type)
    return new Blob([res], {type: 'application/pdf'});
  }

  download(name): void {
    this.lectureNote.downloadPDF(name).subscribe(res => {
      if (res){
        fileSaver.saveAs(this.returnBlob(res), name);
      }
    });
  }

}
