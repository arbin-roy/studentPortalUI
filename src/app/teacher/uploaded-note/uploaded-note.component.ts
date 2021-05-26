import { Component, OnInit } from '@angular/core';
import {UploadedVideosService} from '../../services/uploaded-videos.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import { NoNotesDialogComponent} from './no-notes-dialog/no-notes-dialog.component';
import { ViewPdfComponent} from './view-pdf/view-pdf.component';

@Component({
  selector: 'app-uploaded-note',
  templateUrl: './uploaded-note.component.html',
  styleUrls: ['./uploaded-note.component.scss']
})
export class UploadedNoteComponent implements OnInit {
  notes = [];
  dialogClosed: string;

  constructor(private uploadedVideosService: UploadedVideosService,
              private snackBar: MatSnackBar,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.uploadedVideosService.getNotes().subscribe(result => {
      console.log(result);
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
    this.dialog.open(ViewPdfComponent, {data: note});
  }

}
