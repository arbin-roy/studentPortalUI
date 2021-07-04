import {Component, Inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { TeacherService} from '../../../services/teacher.service';
import { HttpEventType} from '@angular/common/http';
import {Subscription} from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';
import {BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-upload-video',
  templateUrl: './upload-video.component.html',
  styleUrls: ['./upload-video.component.scss']
})
export class UploadVideoComponent implements OnInit, OnDestroy {

  videoForm: FormGroup = this.formBuilder.group({
    title: ['', [Validators.required, Validators.minLength(4)]],
    video: ['', [Validators.required]],
    dept: ['', [Validators.required]],
    subject: ['', [Validators.required]],
    semester: ['', [Validators.required]],
    desc: ['', [Validators.maxLength(100)]]
  });
  subjects = [];
  depts=[]
  semesters = [1, 2, 3, 4, 5, 6];
  fileToUpload: File = null;
  uploadProgress: number;
  selectedVideo: string;
  service: Subscription;
  serverResponse;

  subjectLabel = 'Select Subject';
  semLabel = 'Select Subject';

  constructor(@Inject( MAT_DIALOG_DATA ) public item: any,
              private formBuilder: FormBuilder,
              private uploadVideoService: TeacherService,
              private snackBar: MatSnackBar,
              private dialogRef: MatDialogRef<UploadVideoComponent>,
              private breakpointObserver: BreakpointObserver
  ) { }

  ngOnInit(): void {
    this.uploadVideoService.getdetails().subscribe(result=>{
      console.log(result.subjects)
      this.depts = result.depts,
      this.subjects = result.subjects
    })
    this.breakpointObserver.observe([Breakpoints.XSmall]).subscribe(state => {
      if (state.matches) {
        this.subjectLabel = 'Subject';
        this.semLabel = 'Sem';
      }
    });
  }

  handleFileInput(files): void {
    this.fileToUpload = files.target.files[0];
    this.selectedVideo = this.fileToUpload.name;
  }

  upload(): void{
    if (this.videoForm.valid){
      this.service = this.uploadVideoService.uploadVideo(this.fileToUpload, this.videoForm.value).subscribe(event => {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            this.uploadProgress = Math.round( event.loaded / event.total * 100 );
            break;
          case HttpEventType.Response:
            console.log(event);
            this.serverResponse = JSON.stringify(event.body);
            switch (event.status) {
              case 200:
                this.dialogRef.close();
                this.snackBar.open('Video uploaded successfully', 'Close', {
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

  ngOnDestroy(): void {
    if (!this.service === undefined) { this.service.unsubscribe(); }
  }

}
