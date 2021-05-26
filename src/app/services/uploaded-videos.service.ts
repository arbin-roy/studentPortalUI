import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseurl } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadedVideosService {

  constructor(private http: HttpClient) { }

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
}
