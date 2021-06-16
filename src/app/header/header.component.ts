import {Component, OnInit} from '@angular/core';
import {NavService} from '../services/nav.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('indicatorRotate', [
      state('collapsed', style({transform: 'rotate(0)'})),
      state('expanded', style({transform: 'rotate(180deg)'})),
      transition('collapsed => expanded', animate('200ms ease-out')),
      transition('expanded => collapsed', animate('200ms ease-in'))
    ])
  ]
})
export class HeaderComponent implements OnInit {
  title = 'BCREC-APC';
  expanded: boolean;
  state = 'collapsed';
  public logged = false;
  public username: string;

  constructor(public navService: NavService,
              public auth: AuthService)
    {
     this.auth.isLoggedIn.subscribe(res => {
          this.logged = true;
          this.username = res.data.name.split(' ')[0];
     });
  }

  ngOnInit(): void {
    if ( sessionStorage.length ){
      this.logged = true;
      this.username = sessionStorage.getItem('_userName');
    }
    this.auth.isLoggedOut.subscribe(() => {
      this.logged = false;
    });
  }

  rotate(): void {
    this.state = (this.state === 'collapsed' ? 'expanded' : 'collapsed');
  }

  onLogout(): void{
     this.logged = false;
     this.auth.logout();
     this.navService.closeNav();
  }

}
