import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LectureVideoComponent} from './student/lecture-video/lecture-video.component';
import { SyllabusComponent} from './student/syllabus/syllabus.component';
import { NoticesComponent} from './notices/notices.component';
import { LoginComponent } from './login/login.component';
import { UploadComponent} from './teacher/upload/upload.component';
import { UploadedVideoComponent } from './teacher/uploaded-video/uploaded-video.component';
import { UploadedNoteComponent } from './teacher/uploaded-note/uploaded-note.component';
import { UploadedLinkComponent } from './teacher/uploaded-link/uploaded-link.component';
import { RouteGuardService } from './services/route-guard.service';
import { NotesComponent } from './student/notes/notes.component';
import { GivePermissionComponent } from './admin/give-permission/give-permission.component';
import { UpdateTeacherComponent } from './admin/update-teacher/update-teacher.component';
import { UpdateStudentComponent } from './admin/update-student/update-student.component';
import { RecordKeepingComponent } from './teacher/record-keeping/record-keeping.component';
import { EventsComponent } from './student/events/events.component';
import { ExaminationsComponent } from './student/examinations/examinations.component';
import { LinksComponent } from './student/links/links.component';
import { AddSubjectComponent } from './admin/add-subject/add-subject.component';
import { NotFoundComponentComponent} from './not-found-component/not-found-component.component';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'}, // Default Route
  {path: 'login', component: LoginComponent},
  {path: 'notice', component: NoticesComponent},
  {path: 'lecturevideos', component: LectureVideoComponent, canActivate: [RouteGuardService], data: {
      expectedRole: 'Student'
    }
  },
  {path: 'syllabus', component: SyllabusComponent, canActivate: [RouteGuardService], data: {
      expectedRole: 'Student'
    }
  },
  {path: 'lecturenotes', component: NotesComponent, canActivate: [RouteGuardService], data: {
      expectedRole: 'Student'
    }
  },
  {path: 'events', component: EventsComponent, canActivate: [RouteGuardService], data: {
      expectedRole: 'Student'
    }
  },
  {path: 'links', component: LinksComponent, canActivate: [RouteGuardService], data: {
      expectedRole: 'Student'
    }
  },
  {path: 'examination', component: ExaminationsComponent, canActivate: [RouteGuardService], data: {
      expectedRole: 'Student'
    }
  },

  // Admin routes starts from here

  {path: 'givepermission', component: GivePermissionComponent, canActivate: [RouteGuardService], data: {
      expectedRole: 'Admin'
    }
  },
  {path: 'givepermission', component: GivePermissionComponent, canActivate: [RouteGuardService], data: {
      expectedRole: 'Admin'
    }
  },
  {path: 'updatestudent', component: UpdateStudentComponent, canActivate: [RouteGuardService], data: {
      expectedRole: 'Admin'
    }
  },
  {path: 'updateteacher', component: UpdateTeacherComponent, canActivate: [RouteGuardService], data: {
      expectedRole: 'Admin'
    }
  },
  {path: 'addsub', component: AddSubjectComponent, canActivate: [RouteGuardService], data: {
    expectedRole: 'Admin'
  }
},

  // Teacher routes starts from here

  {path: 'updaterecord', component: RecordKeepingComponent, canActivate: [RouteGuardService], data: {
      expectedRole: 'Teacher'
    }
  },
  {path: 'upload', component: UploadComponent, canActivate: [RouteGuardService], data: {
      expectedRole: 'Teacher'
    }
  },
  {path: 'uploadedvideos', component: UploadedVideoComponent, canActivate: [RouteGuardService], data: {
      expectedRole: 'Teacher'
    }
  },
  {path: 'uploadednotes', component: UploadedNoteComponent, canActivate: [RouteGuardService], data: {
      expectedRole: 'Teacher'
    }
  },
  {path: 'uploadedlinks', component: UploadedLinkComponent, canActivate: [RouteGuardService], data: {
      expectedRole: 'Teacher'
    }
  },
  {path: '**', component: NotFoundComponentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingPaths = [
  LectureVideoComponent,
  SyllabusComponent,
  NoticesComponent,
  LoginComponent,
  UploadComponent,
  UploadedVideoComponent,
  UploadedNoteComponent,
  NotesComponent,
  GivePermissionComponent,
  UpdateStudentComponent,
  UpdateTeacherComponent,
  RecordKeepingComponent,
  EventsComponent,
  ExaminationsComponent,
  NotFoundComponentComponent
];
