import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TeacherService} from '../../../services/teacher.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Subscription} from 'rxjs';
import {HttpEventType} from '@angular/common/http';
import {BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-upload-note',
  templateUrl: './upload-note.component.html',
  styleUrls: ['./upload-note.component.scss']
})
export class UploadNoteComponent implements OnInit {
  noteForm: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(4)]],
    note: ['', [Validators.required]],
    subject: ['', [Validators.required]],
    semester: ['', [Validators.required]],
    desc: ['', [Validators.maxLength(100)]]
  });
  subjects = [
    {code: 'BCAN-100', name: 'Cyber Security'},
    {code: 'BCAN-200', name: 'Digital Marketing'},
    {code: 'BCAN-300', name: 'Values & Ethic\'s'}
  ];
  semesters = [1, 2, 3, 4, 5, 6];
  fileToUpload: File = null;
  uploadProgress: number;
  selectedVideo: string;
  service: Subscription;

  subjectLabel = 'Select Subject';
  semLabel = 'Select Sem';

  constructor(@Inject( MAT_DIALOG_DATA ) public item: any,
              private formBuilder: FormBuilder,
              private uploadVideoService: TeacherService,
              private snackBar: MatSnackBar,
              private dialogRef: MatDialogRef<UploadNoteComponent>,
              private breakpointObserver: BreakpointObserver) { }

  handleFileInput(files): void {
    this.fileToUpload = files.target.files[0];
    this.selectedVideo = this.fileToUpload.name;
  }

  upload(): void{
    if (this.noteForm.valid){
      this.service = this.uploadVideoService.uploadNote(this.fileToUpload, this.noteForm.value).subscribe(event => {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            this.uploadProgress = Math.round( event.loaded / event.total * 100 );
            break;
          case HttpEventType.Response:
            console.log(event);
            switch (event.status) {
              case 200:
                this.dialogRef.close();
                this.snackBar.open('Note uploaded successfully', 'Close', {
                  duration: 3000
                });
                break;
            }
            break;
        }
      }, error => {
        switch (error.status) {
          case 401:
            this.snackBar.open('You are not authorized to upload', 'Close'); break;
        }
      });
    }else {
      console.log('Not valid');
    }
  }

  ngOnInit(): void {
    this.breakpointObserver.observe([Breakpoints.XSmall]).subscribe(state => {
      if (state.matches) {
        this.subjectLabel = 'Subject';
        this.semLabel = 'Sem';
      }
    });
  }

}
