import { Component, OnInit } from '@angular/core';
import {LectureVideosService } from '../../services/lecture-videos.service'
import { FormGroup, FormBuilder, Validators, FormsModule, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-update-teacher',
  templateUrl: './update-teacher.component.html',
  styleUrls: ['./update-teacher.component.scss']
})
export class UpdateTeacherComponent implements OnInit {

  constructor(public lecture:LectureVideosService, public fb: FormBuilder) { }
    
  selected='';
  selects=[];
  numbers=1;
  list=[];
  show=true;

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
    subjects:[[]]
  }); */

  addteachers = new FormGroup({
    name: new FormControl(''),
    teacherId: new FormControl(''),
    dept: new FormControl(''),
    password: new FormControl(''),
    subnum: new FormControl(''),
    subjects: new FormArray([])
  });

  subjects = this.addteachers.get("subjects") as FormArray;

  
  ngOnInit(): void {
    /* addteachers = new FormGroup({
      name: new FormControl(''),
      skills: new FormArray([])
    }); */
  }
  addteacher(){
    console.log(this.addteachers.value)
  }

  add(){
    var i;
    this.show=false
    for(i=1;i<=this.numbers;i++){
      var control = new FormControl('', Validators.required);
      this.subjects.push(control);
    }
  }
  clear(){
    this.subjects.clear()
    this.show=true
  }
}
