import {Component, OnInit} from '@angular/core';
import {TeacherUploadService} from '../../services/teacher-upload.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import {NoNotesDialogComponent} from './no-notes-dialog/no-notes-dialog.component';
import {DomSanitizer} from '@angular/platform-browser';
import {ViewPdfComponent} from './view-pdf/view-pdf.component';
import * as fileSaver from 'file-saver';

@Component({
  selector: 'app-uploaded-note',
  templateUrl: './uploaded-note.component.html',
  styleUrls: ['./uploaded-note.component.scss']
})
export class UploadedNoteComponent implements OnInit {
  notes = [];
  dialogClosed: string;

  constructor(private teacherUploadService: TeacherUploadService,
              private snackBar: MatSnackBar,
              private dialog: MatDialog,
              private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.teacherUploadService.getNotes().subscribe(result => {
      this.notes = result.data;
      if (result.data.length === 0){
        this.dialog.open(NoNotesDialogComponent, {
          disableClose: true
        }).afterClosed().subscribe(res => {
          this.dialogClosed = 'No Notes available to show';
        });
      }
    }, error => {
      switch (error.status) {
        case 0: this.snackBar.open('Server connection establishment failed', 'Close'); break;
      }
    });
  }

  view(note): void {
    this.teacherUploadService.downloadPDF(note.title).subscribe(res => {
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
    return new Blob([res], {type: res.type});
  }

  download(name): void {
    this.teacherUploadService.downloadPDF(name).subscribe(res => {
      if (res){
        fileSaver.saveAs(this.returnBlob(res), name);
      }
    });
  }

}
