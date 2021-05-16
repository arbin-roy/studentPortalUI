import {Component, OnInit} from '@angular/core';
import {NavService} from '../services/nav.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {BreakpointObserver, Breakpoints, BreakpointState} from '@angular/cdk/layout';

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
  title = 'Dr. B.C. Roy Engineering College';
  expanded: boolean;
  state = 'collapsed';

  constructor(public navService: NavService, private breakpointObserver: BreakpointObserver) { }

  ngOnInit(): void {
    this.breakpointObserver.observe(['(max-width: 598px)']).subscribe((state: BreakpointState) => {
      if (state.matches){
        this.title = 'BCREC-APC';
      }else {
        this.title = 'Dr. B.C. Roy Engineering College';
      }
    });
  }

  rotate() {
    this.state = (this.state === 'collapsed' ? 'expanded' : 'collapsed');
  }

}
