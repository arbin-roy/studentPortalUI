import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders} from '@angular/common/http';
import { baseurl } from '../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeacherUploadService {

  constructor(private http: HttpClient) { }

  uploadVideo(file, values): Observable<HttpEvent<object>> {
    const body = new FormData();
    body.append('video', file);
    body.append('title', values.title);
    body.append('subjectCode', values.subject);
    body.append('sem', values.semester);
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
    body.append('note', file);
    body.append('title', values.name);
    body.append('subjectCode', values.subject);
    body.append('sem', values.semester);
    if (values.desc.length !== 0) { body.append('desc', values.desc); }
    const headerConfig = new HttpHeaders()
      .set('Authorization', sessionStorage.getItem('_token'));
    return this.http.post(`${baseurl}teacher/uploadNote`, body, {
      reportProgress: true,
      observe: 'events',
      headers: headerConfig
    });
  }

  viewPDF(pdfLink) {
    const headerConfig = new HttpHeaders()
      .set('Access-Control-Allow-Origin', '*');
    return this.http.get(`${baseurl}${pdfLink}`, {
      headers: headerConfig
    });
  }
}
