import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { AuthserviceService } from '../services/authservice.service';
import {Router} from '@angular/router'

@Component({
  selector: 'app-loginstudent',
  templateUrl: './loginstudent.component.html',
  styleUrls: ['./loginstudent.component.scss']
})
export class LoginstudentComponent implements OnInit {

  hide: boolean = false;

  constructor(public fb: FormBuilder,
     private authService: AuthserviceService,
     public router:Router) {
  }

  ngOnInit() {
    this.loginForm;
  }

  loginForm: FormGroup = this.fb.group({
    entity:['',[Validators.required]],
    roll: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  })

 
  onLogin() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value)
      this.authService.login(this.loginForm.value.entity,this.loginForm.value).subscribe(result => {
        var data={
          form:this.loginForm.value,
          data:result.data
        }
        this.authService.savedata(data);
        this.router.navigate(["/lecturevideos"])
      },
        error => {
          alert("Give correct credentials")
        },
        () => {
          // No errors, route to new page
        })
    }
    else {
      console.log("error");
    }
  }

}