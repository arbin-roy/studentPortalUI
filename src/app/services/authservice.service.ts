import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { baseurl } from '../../environments/environment';
import { EventEmitter } from '@angular/core';
import { JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {

   public user: string;
   public role: string;
   isloggedin = new EventEmitter<any>();
   receivedToken: string;

  constructor(private http: HttpClient, public jwtHelperService: JwtHelperService) { }

  // tslint:disable-next-line:typedef
  savedata(data: any){
    if (data){
      this.isloggedin.emit(data);
      this.receivedToken = data.token;
      sessionStorage.setItem('_token', data.token);
      sessionStorage.setItem('_role', data.form.entity);
      sessionStorage.setItem('_userName', data.data.name);
    }
  }

  login(path, data): Observable<any>{
    console.log('response coming from server');
    return this.http.post(`${baseurl}${path}/login`, data);
  }

  // tslint:disable-next-line:typedef
  public isAuthenticated() {
    const token = sessionStorage.getItem('_token');
    return !this.jwtHelperService.isTokenExpired(token);
    // return !(!this.jwtHelperService.isTokenExpired(token) && token !== this.receivedToken);
  }
}
