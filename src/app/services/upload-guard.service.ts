import { Injectable } from '@angular/core';
import {AuthserviceService} from './authservice.service';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UploadGuardService implements CanActivate{

  constructor(private auth: AuthserviceService, private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data.expectedRole;
    if (!this.auth.isAuthenticated() || expectedRole !== 'Teacher'){
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
