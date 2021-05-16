import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { AuthserviceService } from '../services/authservice.service';
@Component({
  selector: 'app-loginstudent',
  templateUrl: './loginstudent.component.html',
  styleUrls: ['./loginstudent.component.scss']
})
export class LoginstudentComponent implements OnInit {

  hide: boolean = false;

  constructor(public fb: FormBuilder, private authService:AuthserviceService) {
  }

  ngOnInit() {
    this.loginForm;
  }

  loginForm: FormGroup = this.fb.group({
    roll: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  })


  onLogin() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(result=>{
        if(result.success){
          console.log(result.data);
          alert(result.data);
        }
        else{
          alert("give correct credentials.")
        }
      });
    }
    console.log("error");
  }

}