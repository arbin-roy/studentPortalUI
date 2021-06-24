import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, FormArray, FormControl } from '@angular/forms';
import {AdminService} from '../../services/admin.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-teacher',
  templateUrl: './update-teacher.component.html',
  styleUrls: ['./update-teacher.component.scss']
})
export class UpdateTeacherComponent implements OnInit {

  show = true;
  display=true;
  nodata=false;

  Subjects = [];
  Departments=[];

  constructor(private adminService: AdminService,
              private snackBar: MatSnackBar,
              private fb:FormBuilder) {
                
              }
                
  

  /* addteachers: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    dept: ['', [Validators.required]],
    teacherId: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    subnum: ['', [Validators.required]],
    subjects:([])
  }); */

  addTeachers = new FormGroup({
    name: new FormControl(''),
    teacherId: new FormControl(''),
    password: new FormControl(''),
    deptnum:new FormControl(''),
    dept:new FormArray([]),
    subnum: new FormControl(''),
    subjects: new FormArray([])
  });

  subjects = this.addTeachers.get('subjects') as FormArray;
  dept = this.addTeachers.get("dept") as FormArray

  addDept(): void{
    let i;
    this.display = false;
    for (i = 1; i <= this.addTeachers.value.deptnum ; i++){
      const control = new FormControl(" ",Validators.required);
      this.dept.push(control);
    }
  }
  clearDept(): void{
    this.dept.clear();
    this.display = true;
  } 

  addSub(): void{
    let i;
    this.show = false;
    for (i = 1; i <= this.addTeachers.value.subnum ; i++){
      const control = new FormControl(" ",Validators.required);
      this.subjects.push(control);
    }
  }

  clearSub(): void{
    this.subjects.clear();
    this.show = true;
  } 

  ngOnInit(): void {
    this.adminService.getSubject().subscribe(result=>{
      console.log(result.success)
      if(result.success==true){
        this.Subjects=result.data[0].subjects;
        this.Departments=result.data[0].dept;
      }
      else{
        this.Subjects=[{subjectName:"No subjects"}];
        this.Departments=["No Dept"];
        this.nodata=true;
      }
      console.log(this.Subjects,this.Departments)
    })
  }

  addTeacher(): void{
    this.adminService.addTeacher(this.addTeachers.value).subscribe(res => {
      console.log(res);
      this.snackBar.open(this.addTeachers.value.name + ' added successfully', 'Close');
    }, error => {
      console.log(error);
      switch (error.status) {
        case 409: this.snackBar.open(error.error.error, 'Close'); break;
      }
    });
    console.log(this.addTeachers.value);
  }

  

 
}
