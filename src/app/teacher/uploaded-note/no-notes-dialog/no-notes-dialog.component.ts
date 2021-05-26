import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-no-notes-dialog',
  templateUrl: './no-notes-dialog.component.html',
  styleUrls: ['./no-notes-dialog.component.scss']
})
export class NoNotesDialogComponent implements OnInit {

  constructor(private router: Router,
              private dialogRef: MatDialogRef<NoNotesDialogComponent>) { }

  ngOnInit(): void {
  }

  uploadNote(): void {
    this.router.navigate(['upload']);
    this.dialogRef.close();
  }

}
