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

  constructor(private adminService: AdminService,
              private snackBar: MatSnackBar) { }

  selected = '';
  selects = [];
  numbers = 1;
  list = [];
  show = true;

  Subjects = [
    {subjectCode: 'BCAN-100', name: 'Cyber Security'},
    {subjectCode: 'BCAN-200', name: 'Digital Marketing'},
    {subjectCode: 'BCAN-300', name: 'Values & Ethic\'s'},
    {subjectCode: 'BCAN-400', name: 'Digital Electronics'},
    {subjectCode: 'BCAN-500', name: 'Data Structure'},
    {subjectCode: 'BCAN-600', name: 'Python'}
  ];

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
    dept: new FormControl(''),
    password: new FormControl(''),
    subnum: new FormControl(''),
    subjects: new FormArray([])
  });

  subjects = this.addTeachers.get('subjects') as FormArray;

  ngOnInit(): void {
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

  add(): void{
    let i;
    this.show = false;
    for (i = 1; i <= this.numbers ; i++){
      const control = new FormControl('', Validators.required);
      this.subjects.push(control);
    }
  }

  clear(): void{
    this.subjects.clear();
    this.show = true;
  }
}
