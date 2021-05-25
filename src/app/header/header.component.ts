import {Component, OnInit} from '@angular/core';
import {NavService} from '../services/nav.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {BreakpointObserver, Breakpoints, BreakpointState} from '@angular/cdk/layout';
import {AuthserviceService} from '../services/authservice.service';
import {Router} from '@angular/router';

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
              private breakpointObserver: BreakpointObserver,
              public auth: AuthserviceService,
              public router: Router)
    {
     this.auth.isloggedin.subscribe(res => {
          this.logged = true;
          this.username = res.data.name;
     });
  }

  ngOnInit(): void {
    if ( sessionStorage.length ){
      this.logged = true;
      this.username = sessionStorage.getItem('_userName');
    }
  }

  rotate() {
    this.state = (this.state === 'collapsed' ? 'expanded' : 'collapsed');
  }
  onLogout(){
     this.router.navigate(['/login' ]);
     this.logged = false;
     sessionStorage.clear();
  }

}
