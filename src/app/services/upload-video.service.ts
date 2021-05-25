import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseurl } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadVideoService {

  constructor(private http: HttpClient) { }

  // tslint:disable-next-line:typedef
  uploadVideo(file, values) {
    const body = new FormData();
    body.append('video', file, values.title);
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
}
