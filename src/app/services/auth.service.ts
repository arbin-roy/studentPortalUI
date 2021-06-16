import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { baseurl } from '../../environments/environment';
import { EventEmitter } from '@angular/core';
import { JwtHelperService} from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {

   public user: string;
   public role: string;
   isloggedin = new EventEmitter<any>();
   receivedToken: string;

  constructor(private http: HttpClient,
              public jwtHelperService: JwtHelperService,
              private router: Router) { }

  savedata(data: any): void {
    if (data){
      this.isloggedin.emit(data);
      this.receivedToken = data.token;
      window.sessionStorage.setItem('_token', data.token);
      window.sessionStorage.setItem('_role', data.form.entity);
      window.sessionStorage.setItem('_userName', data.data.name.split(' ')[0]);
    }
  }

  login(path, data): Observable<any>{
    return this.http.post(`${baseurl}${path}/login`, data);
  }

  logout(): void{
    window.sessionStorage.clear();
    this.router.navigate(['/login']);
  }

  public isAuthenticated(): boolean {
    const token = sessionStorage.getItem('_token');
    return !this.jwtHelperService.isTokenExpired(token);
  }
}
