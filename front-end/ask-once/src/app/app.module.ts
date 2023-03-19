import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { QeustionCardComponent } from './qeustion-card/qeustion-card.component';
import {MatCardModule} from '@angular/material/card';
import { TagsComponent } from './tags/tags.component';
import {MatChipsModule} from '@angular/material/chips';
import { MembersComponent } from './members/members.component';
import {MatListModule} from '@angular/material/list';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import{RouterModule} from '@angular/router';
import { DiscussionComponent } from './discussion/discussion.component';
import { ClassroomComponent } from './classroom/classroom.component';
import { AnwserComponent } from './anwser/anwser.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    QeustionCardComponent,
    TagsComponent,
    MembersComponent,
    DiscussionComponent,
    ClassroomComponent,
    AnwserComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCardModule,
    MatChipsModule,
    MatListModule,
    MatDividerModule,
    MatIconModule,
    RouterModule.forChild([
      {path: 'question', component:DiscussionComponent },
      {path: 'classroom', component:ClassroomComponent}
    ])

  ],
  providers: [],
  bootstrap: [AppComponent,DiscussionComponent]
})
export class AppModule { }
