import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NavService} from './services/nav.service';
import {Router} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {AuthService} from './services/auth.service';

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
              private auth: AuthService){}

  // tslint:disable-next-line:typedef
  ngAfterViewInit() {
    this.navService.appDrawer = this.sideNav;
  }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.auth.isLoggedIn.subscribe(res => {
      switch (res.form.entity){
        case 'Student':
          this.navItems = [
            {name: 'Lecture Videos', route: '/lecturevideos', icon: 'movie'},
            {name: 'Notes & PDF\'s & Ebooks', route: '/lecturenotes', icon: 'notes'},
            {name: ' Important Links', route: '/links', icon: 'launch'},
            {name: 'Syllabus', route: '/syllabus', icon: 'book'},
            {name: 'Upcoming Examinations', route: 'examination', icon: 'edit'},
            {name: 'Upcoming Activities', route: 'events', icon: 'event'},
          ];
          break;
        case 'Teacher':
          this.navItems = [
            {name: 'Upload', route: '/upload', icon: 'upload'},
            {name: 'Uploaded Videos', route: '/uploadedvideos', icon: 'video_library'},
            {name: 'Uploaded Notes', route: '/uploadednotes', icon: 'note'},
            {name: 'Record Keeping', route: '/updaterecord', icon: 'book'},
            {name: 'Uploaded Links', route: '/uploadedlinks', icon: 'link'}
          ];
          break;
        case 'Admin':
          this.navItems = [
            {name: 'Update Teacher', route: '/updateteacher', icon: 'movie'},
            {name: 'Update Student', route: '/updatestudent', icon: 'movie'},
            {name: 'Give Permission', route: '/givepermission', icon: 'movie'},
            {name: 'Add Depts&Subs', route: '/addsub', icon: 'movie'}
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
            {name: 'Notes & PDF\'s & Ebooks', route: '/lecturenotes', icon: 'notes'},
            {name: ' Important Links', route: '/links', icon: 'launch'},
            {name: 'Syllabus', route: '/syllabus', icon: 'book'},
            {name: 'Upcoming Examinations', route: 'examination', icon: 'edit'},
            {name: 'Upcoming Activities', route: 'events', icon: 'event'},
          ];
          break;
        case 'Teacher':
          this.navItems = [
            {name: 'Upload', route: '/upload', icon: 'upload'},
            {name: 'Uploaded Videos', route: '/uploadedvideos', icon: 'video_library'},
            {name: 'Uploaded Notes', route: '/uploadednotes', icon: 'note'},
            {name: 'Record Keeping', route: '/updaterecord', icon: 'book'},
            {name: 'Uploaded Links', route: '/uploadedlinks', icon: 'link'}
          ];
          break;
        case 'Admin':
          this.navItems = [
            {name: 'Update Teacher', route: '/updateteacher', icon: 'edit'},
            {name: 'Update Student', route: '/updatestudent', icon: 'edit'},
            {name: 'Give Permission', route: '/givepermission', icon: 'movie'},
            {name: 'Add Depts&Subs', route: '/addsub', icon: 'movie'}
          ];
          break;
        default:
          this.navItems = [];
    }
  }
}
}
