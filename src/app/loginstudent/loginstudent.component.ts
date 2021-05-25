import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthserviceService } from '../services/authservice.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-loginstudent',
  templateUrl: './loginstudent.component.html',
  styleUrls: ['./loginstudent.component.scss']
})
export class LoginstudentComponent implements OnInit {

  hide = false;
  selected = '';
  loginForm: FormGroup = this.fb.group({
    entity: ['', [Validators.required]],
    roll: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  });

  constructor(public fb: FormBuilder,
              private authService: AuthserviceService,
              public router: Router) {}

  ngOnInit() {
    this.loginForm;
  }

  onLogin() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      this.authService.login(this.loginForm.value.entity, this.loginForm.value).subscribe(result => {
        console.log(result);
        const data = {
          form: this.loginForm.value,
          data: result.data,
          token: result.token
        };
        this.authService.savedata(data);
        switch (this.loginForm.value.entity) {
          case 'Teacher': this.router.navigate(['/upload']); break;
          case 'Student': this.router.navigate(['/lecturevideos']); break;
        }
      },
        error => {
          alert('Give correct credentials');
        },
        () => {}
        );
    }
    else {
      console.log('error');
    }
  }
}
