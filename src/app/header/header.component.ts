import {Component, OnInit} from '@angular/core';
import {NavService} from '../services/nav.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {BreakpointObserver, Breakpoints, BreakpointState} from '@angular/cdk/layout';
import {AuthserviceService} from '../services/authservice.service'
import {Router} from "../../../node_modules/@angular/router"

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
  public logged:boolean=false;
  public username:string;
  public role:string;
  


  constructor(public navService: NavService, 
    private breakpointObserver: BreakpointObserver, 
    public auth:AuthserviceService,
    public router:Router) 
    { 
     this.auth.isloggedin.subscribe(res=>{
          this.logged=true;
          this.username=res.data.name;
          this.role= res.form.entity;
     })
  }

  ngOnInit(): void {
    /* this.breakpointObserver.observe(['(max-width: 598px)']).subscribe((state: BreakpointState) => {
      if (state.matches){
        this.title = 'BCREC-APC';
      }else {
        this.title = 'Dr. B.C. Roy Engineering College';
      }
    }); */
  }

  rotate() {
    this.state = (this.state === 'collapsed' ? 'expanded' : 'collapsed');
  }
  onLogout(){
     this.router.navigate(["/login" ])
     this.logged=false;
     console.log("logout works")
  }

}
