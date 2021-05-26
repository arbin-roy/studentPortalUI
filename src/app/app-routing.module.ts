import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LectureVideoComponent} from './lecture-video/lecture-video.component';
import { SyllabusComponent} from './student/syllabus/syllabus.component';
import { NoticesComponent} from './notices/notices.component';
import { LoginstudentComponent } from './loginstudent/loginstudent.component';
import { UploadComponent} from './teacher/upload/upload.component';
import { UploadedVideoComponent } from './teacher/uploaded-video/uploaded-video.component';
import { UploadedNoteComponent } from './teacher/uploaded-note/uploaded-note.component';
import { UploadGuardService } from './services/upload-guard.service';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'lecturevideos', component: LectureVideoComponent},
  {path: 'syllabus', component: SyllabusComponent},
  {path: 'notice', component: NoticesComponent},
  {path: 'login', component: LoginstudentComponent},
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
  UploadedVideoComponent
];
