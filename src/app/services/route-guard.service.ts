import { Injectable } from '@angular/core';
import {AuthService} from './auth.service';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService implements CanActivate{

  constructor(private auth: AuthService) { }
  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data.expectedRole;
    if (!this.auth.isAuthenticated() || expectedRole !== window.sessionStorage.getItem('_role')){
      this.auth.logout();
      return false;
    }
    return true;
  }
}
