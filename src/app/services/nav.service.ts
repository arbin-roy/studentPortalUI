import {Injectable, Output} from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class NavService {
  public appDrawer: any;
  constructor() {}

  public closeNav() {
    this.appDrawer.close();
  }

  public openNav() {
    this.appDrawer.open();
  }

  public touggleNav() {
    this.appDrawer.toggle();
  }
}
