import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NavService} from './services/nav.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit, OnInit{
  @ViewChild('sidenav') sideNav: ElementRef;

  navItems = [
    {name: 'Lecture Videos', route: '/lecturevideos', icon: 'movie'},
    {name: 'Notes & PDF\'s & Ebooks', route: '#', icon: 'notes'},
    {name: 'Syllabus', route: '/syllabus', icon: 'book'},
    {name: 'Upcoming Examinations', route: '/studentlogin', icon: 'edit'},
    {name: 'Upcoming Activities', route: '#', icon: 'local_activity'},
  ];

  constructor(public navService: NavService) {}

  // tslint:disable-next-line:typedef
  ngAfterViewInit() {
    this.navService.appDrawer = this.sideNav;
  }

  ngOnInit() {
    
  }
}
