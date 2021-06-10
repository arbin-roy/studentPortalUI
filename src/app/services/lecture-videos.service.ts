import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders, HttpParams } from '@angular/common/http';
import { baseurl } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LectureVideosService {

  constructor(private http: HttpClient) {}

  getVideos(): Observable<any> {
    const headerConfig = new HttpHeaders()
      .set('Authorization', sessionStorage.getItem('_token'));
    return this.http.get(`${baseurl}student/videos`, {
      headers: headerConfig
    });
  }

  getNotes(): Observable<any> {
    const headerConfig = new HttpHeaders()
      .set('Authorization', sessionStorage.getItem('_token'));
    return this.http.get(`${baseurl}student/notes`, {
      headers: headerConfig
    });
  }

  getLinks(): Observable<any> {
    const headerConfig = new HttpHeaders()
      .set('Authorization', sessionStorage.getItem('_token'));
    return this.http.get(`${baseurl}student/links`, {
      headers: headerConfig
    });
  }

  addteacher():Observable<any>{
    const data = {
      name:"xyz abc",
      dept:"BCA",
      subjects:[{name:'Cybersecurity', code:'BCAN-100'}]
    }
    const headerConfig=new HttpHeaders()
      .set('Authorization', sessionStorage.getItem('_token'));
    return this.http.post(`${baseurl}admin/addteacher`, data, {headers:headerConfig});
  }

  downloadVideo(title: string): Observable<Blob> {
    const headerConfig = new HttpHeaders()
      .set('Authorization', sessionStorage.getItem('_token'));
    const param = new HttpParams().set('title', title + '.mp4');
    const options = {
      params: param,
      headers: headerConfig
    };
    return this.http.get(`${baseurl}student/downloadVideo`, {...options, responseType: 'blob'});
  }

  downloadPDF(name: string): Observable<Blob> {
    const headerConfig = new HttpHeaders()
      .set('Authorization', sessionStorage.getItem('_token'));
    const param = new HttpParams().set('name', name + '.pdf');
    const options = {
      params: param,
      headers: headerConfig
    };
    return this.http.get(`${baseurl}student/downloadNote`, {...options, responseType: 'blob'});
  }
}
