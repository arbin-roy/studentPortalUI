import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders, HttpParams} from '@angular/common/http';
import { baseurl } from '../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  constructor(private http: HttpClient) { }

  uploadVideo(file, values): Observable<HttpEvent<object>> {
    const body = new FormData();
    body.append('video', file, values.title + '.mp4');
    body.append('title', values.title);
    body.append('subjectCode', values.subject);
    body.append('sem', values.semester);
    body.append("dept",values.dept);
    if (values.desc.length !== 0) { body.append('desc', values.desc); }
    const headerConfig = new HttpHeaders()
      .set('Authorization', sessionStorage.getItem('_token'));
    return this.http.post(`${baseurl}teacher/uploadVideo`, body, {
      reportProgress: true,
      observe: 'events',
      headers: headerConfig
    });
  }

  uploadNote(file, values): Observable<HttpEvent<object>> {
    const body = new FormData();
    body.append('note', file, values.name + '.pdf');
    body.append('title', values.name);
    body.append('subjectCode', values.subject);
    body.append('sem', values.semester);
    body.append("dept",values.dept);
    if (values.desc.length !== 0) { body.append('desc', values.desc); }
    const headerConfig = new HttpHeaders()
      .set('Authorization', sessionStorage.getItem('_token'));
    return this.http.post(`${baseurl}teacher/uploadNote`, body, {
      reportProgress: true,
      observe: 'events',
      headers: headerConfig
    });
  }

  uploadLink(values): Observable<any> {
    const headerConfig = new HttpHeaders()
      .set('Authorization', sessionStorage.getItem('_token'));
    return this.http.post(`${baseurl}teacher/uploadLink`, values, {
      headers: headerConfig
    });
  }

  getVideos(): Observable<any> {
    const headerConfig = new HttpHeaders()
      .set('Authorization', sessionStorage.getItem('_token'));
    return this.http.get(`${baseurl}teacher/uploadedVideos`, {
      headers: headerConfig
    });
  }

  getNotes(): Observable<any> {
    const headerConfig = new HttpHeaders()
      .set('Authorization', sessionStorage.getItem('_token'));
    return this.http.get(`${baseurl}teacher/uploadedNotes`, {
      headers: headerConfig
    });
  }

  getLinks(): Observable<any> {
    const headerConfig = new HttpHeaders()
      .set('Authorization', sessionStorage.getItem('_token'));
    return this.http.get(`${baseurl}teacher/uploadedlinks`, {
      headers: headerConfig
    });
  }

  getdetails(): Observable<any> {
    const headerConfig = new HttpHeaders()
      .set('Authorization', sessionStorage.getItem('_token'));
    return this.http.get(`${baseurl}teacher/getdetails`, {
      headers: headerConfig
    });
  }

  downloadVideo(title: string): Observable<Blob> {
    const headerConfig = new HttpHeaders()
      .set('Authorization', sessionStorage.getItem('_token'));
    const param = new HttpParams().set('title', title + '.mp4');
    const options = {
      params: param,
      headers: headerConfig
    };
    return this.http.get(`${baseurl}teacher/downloadVideo`, {...options, responseType: 'blob'});
  }

  downloadPDF(name: string): Observable<Blob> {
    const headerConfig = new HttpHeaders()
      .set('Authorization', sessionStorage.getItem('_token'));
    const param = new HttpParams().set('name', name + '.pdf');
    const options = {
      params: param,
      headers: headerConfig
    };
    return this.http.get(`${baseurl}teacher/downloadNote`, {...options, responseType: 'blob'});
  }

  recordKeeping(values): Observable<any> {
    const headerConfig = new HttpHeaders()
      .set('Authorization', window.sessionStorage.getItem('_token'));
    return this.http.post(`${baseurl}teacher/recordKeeping`, values, {
      headers: headerConfig
    });
  }
}
