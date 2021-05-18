import { Injectable } from '@angular/core';
import {HttpClient}  from '@angular/common/http'
import { Observable } from 'rxjs';
import {baseurl} from '../../environments/environment'
import {EventEmitter} from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {
  
   public user:string;
   public role:string;
   isloggedin = new EventEmitter<any>();

  constructor(private http:HttpClient) { }

  savedata(data:any){
    if(data){
      this.isloggedin.emit(data)
      }
  }

  login(path,data):Observable<any>{
    console.log("response coming from server")
    return this.http.post(`${baseurl}${path}/login`,data)
  }
}
