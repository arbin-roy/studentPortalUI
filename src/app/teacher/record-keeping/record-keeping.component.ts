import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, FormArray, FormControl } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { TeacherService } from 'src/app/services/teacher.service';

@Component({
  selector: 'app-record-keeping',
  templateUrl: './record-keeping.component.html',
  styleUrls: ['./record-keeping.component.scss']
})
export class RecordKeepingComponent implements OnInit {

  Departments=[];
  Subjects = [];

  constructor(private teacherService: TeacherService,
    private snackBar: MatSnackBar,
    private fb:FormBuilder) { }

  ngOnInit(): void {
    this.teacherService.getdetails().subscribe(result=>{
      console.log(result);
      this.Departments = result.depts;
      this.Subjects = result.subjects;
    });
  }

  addRecord = new FormGroup({
    sem: new FormControl(''),
    course: new FormControl(''),
    subject: new FormControl({}),
    topic_covered:new FormControl(''),
    platform_used: new FormControl(''),
    whether_recorded: new FormControl(''),
    start: new FormControl(),
    end: new FormControl(),
    date_time: new FormControl(''),
    duration: new FormControl(),
    students_attended: new FormControl(''),
    total_students: new FormControl(''),
    notes: new FormControl(''),
    assignment_given: new FormControl(''),
    assignment_submitted: new FormControl(''),
    test_conducted: new FormControl(''),
    remarks: new FormControl(''),
  });
  semesters=[1,2,3,4,5,6];

  Decisions=["Yes","No"];

  addRecords(){
    console.log(this.addRecord.value);
  }

  onSubmit(): void {
    this.teacherService.recordKeeping(this.addRecord.value).subscribe(result => {
      if (result.success){
        this.snackBar.open(result.message, 'Close');
      }
    }, error => {
      console.log(error);
    });
  }
}
