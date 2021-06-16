import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-loginstudent',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hide = false;
  selected = '';
  loginForm: FormGroup = this.fb.group({
    entity: ['', [Validators.required]],
    roll: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  });

  constructor(public fb: FormBuilder,
              private authService: AuthService,
              public router: Router) {}

  ngOnInit(): void {
    this.loginForm;
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value.entity.toLowerCase(), this.loginForm.value).subscribe(result => {
        const data = {
          form: this.loginForm.value,
          data: result.data,
          token: result.token
        };
        this.authService.savedata(data);
        switch (this.loginForm.value.entity) {
          case 'Teacher': this.router.navigate(['/upload']); break;
          case 'Student': this.router.navigate(['/lecturevideos']); break;
          case 'Admin': this.router.navigate(['/givepermission']); break;
        }
      },
        error => {
          console.log(error)
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
