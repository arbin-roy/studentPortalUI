import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule, routingPaths } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule} from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HeaderComponent } from './header/header.component';
import { NavService} from './services/nav.service';
import { SyllabusComponent } from './student/syllabus/syllabus.component';
import { VideoComponent } from './video/video.component';
import { LoginstudentComponent } from './loginstudent/loginstudent.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthserviceService} from './services/authservice.service';
import { JwtHelperService, JWT_OPTIONS  } from '@auth0/angular-jwt';
import {UploadVideoComponent} from './teacher/upload/upload-video/upload-video.component';
import { UploadedNoteComponent } from './teacher/uploaded-note/uploaded-note.component';
import { NoNotesDialogComponent } from './teacher/uploaded-note/no-notes-dialog/no-notes-dialog.component';
import { UploadNoteComponent } from './teacher/upload/upload-note/upload-note.component';
import { PdfViewerModule} from 'ng2-pdf-viewer';
import { ViewPdfComponent } from './teacher/uploaded-note/view-pdf/view-pdf.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    routingPaths,
    SyllabusComponent,
    VideoComponent,
    LoginstudentComponent,
    UploadVideoComponent,
    UploadedNoteComponent,
    NoNotesDialogComponent,
    UploadNoteComponent,
    ViewPdfComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    HttpClientModule,
    PdfViewerModule
  ],
  providers: [NavService, AuthserviceService, { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService],
  bootstrap: [AppComponent]
})
export class AppModule { }
