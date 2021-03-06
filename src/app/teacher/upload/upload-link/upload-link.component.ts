import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { TeacherService} from '../../../services/teacher.service';
import {BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import {Subscription} from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-upload-link',
  templateUrl: './upload-link.component.html',
  styleUrls: ['./upload-link.component.scss']
})
export class UploadLinkComponent implements OnInit {

    linkForm: FormGroup = this.formBuilder.group({
    link: ['', [Validators.required, Validators.minLength(4)]],
    dept:['', [Validators.required]],
    subject: ['', [Validators.required]],
    semester: ['', [Validators.required]],
    desc: ['', [Validators.required, Validators.maxLength(100)]]
  });

  subjects = [ ];
  depts=[];

  semesters = [1, 2, 3, 4, 5, 6];
  service: Subscription;
  deptlabel =" Select Department "
  subjectLabel = 'Select Subject';
  semLabel = 'Select Semester';


  constructor(@Inject( MAT_DIALOG_DATA ) public item: any,
              private formBuilder: FormBuilder,
              private uploadLinkService: TeacherService,
              private snackBar: MatSnackBar,
              private dialogRef: MatDialogRef<UploadLinkComponent>,
              private breakpointObserver: BreakpointObserver
  ) { }

  ngOnInit(): void {
    this.uploadLinkService.getdetails().subscribe(result=>{
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

  upload(): void{
    if (this.linkForm.valid){
      console.log(this.linkForm.value);
      this.service = this.uploadLinkService.uploadLink(this.linkForm.value).subscribe(result => {
        console.log(result);
        if (result.success === true){
          this.dialogRef.close();
          this.snackBar.open('link uploaded successfully', 'Close', {
            duration: 3000
          });
        }
        else{
          this.snackBar.open('Error in uploading link', 'Close', {
            duration: 3000
          });
        }
      }, error => {
        switch (error.status) {
          case 401:
            this.snackBar.open('You are not authorized to upload', 'Close', {
              duration: 3000
            }); break;
        }
      });
    }else {
      console.log('Not valid');
    }
  }

}
