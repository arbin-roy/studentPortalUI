import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, FormArray, FormControl } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-subject',
  templateUrl: './add-subject.component.html',
  styleUrls: ['./add-subject.component.scss']
})
export class AddSubjectComponent implements OnInit {

  subjects = [];
  semesters = [1, 2, 3, 4, 5, 6];

  addSubs: FormGroup;

  constructor(private adminService: AdminService,
              private snackBar: MatSnackBar,
              private fb: FormBuilder) {
                this.addSubs = this.fb.group({
                  dept: "",
                  sem: "",
                  subject: this.fb.array([]),
                })
  }


  subject(): FormArray {
    return this.addSubs.get("subject") as FormArray
  }

  newSubject(): FormGroup {
    return this.fb.group({
      subjectName: '',
      subjectCode: '',
    })
  }

  addSubject() {
    this.subject().push(this.newSubject());
  }

  removeSubject(subIndex:number) {
    this.subject().removeAt(subIndex);
  }

  ngOnInit(): void {
  }
  /* addSubs = new FormGroup({
    dept:new FormArray([]),
    subnum: new FormControl(''),
    subjectName: new FormArray([]),
    subjectCode: new FormArray([])
  });

  subjectName = this.addSubs.get('subjects') as FormArray;
  SubjectCode = this.addSubs.get("dept") as FormArray */
  addSub() {
    this.adminService.addSubject(this.addSubs.value).subscribe(res => {
      console.log(res);
      this.snackBar.open( 'Subjects added successfully to dept: '+this.addSubs.value.dept , 'Close');
    }, error => {
      console.log(error);
      switch (error.status) {
        case 409: this.snackBar.open(error.error.error, 'Close'); break;
      }
    });
    console.log(this.addSubs.value);
  }
}
