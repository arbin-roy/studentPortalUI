import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
}
