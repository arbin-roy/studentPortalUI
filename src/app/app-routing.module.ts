import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LectureVideoComponent} from './lecture-video/lecture-video.component';
import { SyllabusComponent} from './syllabus/syllabus.component';
import { NoticesComponent} from './notices/notices.component';
import { LoginstudentComponent } from './loginstudent/loginstudent.component';
import { AppComponent } from './app.component';


const routes: Routes = [
  {path: 'lecturevideos', component: LectureVideoComponent},
  {path: 'syllabus', component: SyllabusComponent},
  {path: 'notice', component: NoticesComponent},
  {path:'studentlogin', component:LoginstudentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingPaths = [LectureVideoComponent, SyllabusComponent, NoticesComponent,LoginstudentComponent];
