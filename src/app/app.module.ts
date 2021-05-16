import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule, routingPaths } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule} from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HeaderComponent } from './header/header.component';
import { NavService} from './services/nav.service';
import { SyllabusComponent } from './syllabus/syllabus.component';
import { VideoComponent } from './video/video.component';
import {LoginstudentComponent} from './loginstudent/loginstudent.component'
import {ReactiveFormsModule} from '@angular/forms'
import {HttpClientModule} from '@angular/common/http'
import { AuthserviceService} from './services/authservice.service'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    routingPaths,
    SyllabusComponent,
    VideoComponent,
    LoginstudentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    HttpClientModule,
    
  ],
  providers: [NavService,AuthserviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
