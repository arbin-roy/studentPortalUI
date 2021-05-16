import { Injectable } from '@angular/core';
import {HttpClient,  HttpHeaders}  from '@angular/common/http'
import { Observable } from 'rxjs';
import {baseurl} from '../../environments/environment'


@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {

  constructor(private http:HttpClient) { }
  login(data):Observable<any>{
    console.log("response coming from server")
    return this.http.post(`${baseurl}login`,data)
  }
}
