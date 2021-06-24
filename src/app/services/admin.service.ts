import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import { baseurl } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  addTeacher(data): Observable<object> {
    const headerConfig = new HttpHeaders()
      .set('Authorization', window.sessionStorage.getItem('_token'));
    return this.http.post(`${baseurl}admin/addTeacher`, data, {
      headers: headerConfig
    });
  }
  addSubject(data): Observable<object> {
    const headerConfig = new HttpHeaders()
      .set('Authorization', window.sessionStorage.getItem('_token'));
    return this.http.post(`${baseurl}admin/addsub`, data, {
      headers: headerConfig
    });
  }

  getSubject(): Observable<any> {
    const headerConfig = new HttpHeaders()
      .set('Authorization', window.sessionStorage.getItem('_token'));
    return this.http.get(`${baseurl}admin/getsub`, {
      headers: headerConfig
    });
  }
  
}
