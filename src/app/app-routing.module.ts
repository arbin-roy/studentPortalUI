import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LectureVideoComponent} from './lecture-video/lecture-video.component';
import { SyllabusComponent} from './student/syllabus/syllabus.component';
import { NoticesComponent} from './notices/notices.component';
import { LoginstudentComponent } from './loginstudent/loginstudent.component';
import { UploadComponent} from './teacher/upload/upload.component';
import { UploadedVideoComponent } from './teacher/uploaded-video/uploaded-video.component';
import { UploadedNoteComponent } from './teacher/uploaded-note/uploaded-note.component';
import { UploadedLinkComponent } from './teacher/uploaded-link/uploaded-link.component';
import { UploadGuardService } from './services/upload-guard.service';
import { NotesComponent } from './student/notes/notes.component';
import { GivePermissionComponent } from './admin/give-permission/give-permission.component';
import { UpdateTeacherComponent } from './admin/update-teacher/update-teacher.component';
import { UpdateStudentComponent } from './admin/update-student/update-student.component';
import { RecordKeepingComponent } from './teacher/record-keeping/record-keeping.component';
import { EventsComponent } from './student/events/events.component';
import { ExaminationsComponent } from './student/examinations/examinations.component';
import { LinksComponent } from './student/links/links.component';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'lecturevideos', component: LectureVideoComponent },
  {path: 'syllabus', component: SyllabusComponent},
  {path: 'notice', component: NoticesComponent},
  {path: 'login', component: LoginstudentComponent},
  {path:'lecturenotes', component: NotesComponent },
  {path:'givepermission', component: GivePermissionComponent },
  {path:'events', component:EventsComponent},
  {path: 'links', component:LinksComponent},
  {path:'examination', component: ExaminationsComponent },
  {path:'givepermission', component: GivePermissionComponent },
  {path:'updatestudent', component: UpdateStudentComponent },
  {path:'updateteacher', component: UpdateTeacherComponent },
  {path:'updaterecord', component: RecordKeepingComponent },
  {path: 'upload', component: UploadComponent, canActivate: [UploadGuardService], data: {
      expectedRole: 'Teacher'
    }
  },
  {path: 'uploadedvideos', component: UploadedVideoComponent, canActivate: [UploadGuardService], data: {
      expectedRole: 'Teacher'
    }
  },
  {path: 'uploadednotes', component: UploadedNoteComponent, canActivate: [UploadGuardService], data: {
      expectedRole: 'Teacher'
    }
  },
  {path: 'uploadedlinks', component: UploadedLinkComponent, canActivate: [UploadGuardService], data: {
      expectedRole: 'Teacher'
    }
  }
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
  LoginstudentComponent,
  UploadComponent,
  UploadedVideoComponent,
  UploadedNoteComponent,
  NotesComponent,
  GivePermissionComponent,
  UpdateStudentComponent,
  UpdateTeacherComponent,
  RecordKeepingComponent,
  EventsComponent,
  ExaminationsComponent
];
