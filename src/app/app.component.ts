import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NavService} from './services/nav.service';
import {Router} from '@angular/router';
import {LoginstudentComponent} from './loginstudent/loginstudent.component';
import {AuthserviceService} from './services/authservice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit, OnInit{
  @ViewChild('sidenav') sideNav: ElementRef;

  navItems = [];

  constructor(public navService: NavService,
              private router: Router,
              private auth: AuthserviceService){}

  // tslint:disable-next-line:typedef
  ngAfterViewInit() {
    this.navService.appDrawer = this.sideNav;
  }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.auth.isloggedin.subscribe(res => {
      switch (res.form.entity){
        case 'Student':
          this.navItems = [
            {name: 'Lecture Videos', route: '/lecturevideos', icon: 'movie'},
            {name: 'Notes & PDF\'s & Ebooks', route: '#', icon: 'notes'},
            {name: 'Syllabus', route: '/syllabus', icon: 'book'},
            {name: 'Upcoming Examinations', route: '/studentlogin', icon: 'edit'},
            {name: 'Upcoming Activities', route: '#', icon: 'local_activity'},
          ];
          break;
        case 'Teacher':
          this.navItems = [
            {name: 'Upload', route: '/upload', icon: 'upload'},
            {name: 'Uploaded Videos', route: '/uploadedvideos', icon: 'upload'},
            {name: 'Uploaded Notes', route: '/uploadednotes', icon: 'note'}
          ];
          break;
        case 'Admin':
          this.navItems = [
            {name: 'Lecture Videos', route: '/lecturevideos', icon: 'movie'},
          ];
          break;
        default:
          this.navItems = [];
      }
    });
    if ( sessionStorage.length ){
      const userName = sessionStorage.getItem('_role');
      switch (userName){
        case 'Student':
          this.navItems = [
            {name: 'Lecture Videos', route: '/lecturevideos', icon: 'movie'},
            {name: 'Notes & PDF\'s & Ebooks', route: '#', icon: 'notes'},
            {name: 'Syllabus', route: '/syllabus', icon: 'book'},
            {name: 'Upcoming Examinations', route: '/studentlogin', icon: 'edit'},
            {name: 'Upcoming Activities', route: '#', icon: 'local_activity'},
          ];
          break;
        case 'Teacher':
          this.navItems = [
            {name: 'Upload', route: '/upload', icon: 'upload'},
            {name: 'Uploaded Videos', route: '/uploadedvideos', icon: 'upload'},
            {name: 'Uploaded Notes', route: '/uploadednotes', icon: 'note'}
          ];
          break;
        case 'Admin':
          this.navItems = [
            {name: 'Lecture Videos', route: '/lecturevideos', icon: 'movie'},
          ];
          break;
        default:
          this.navItems = [];
    }
  }
}
}
