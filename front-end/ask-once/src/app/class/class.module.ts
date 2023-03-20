import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ClassroomComponent } from '../classroom/classroom.component';
import { DiscussionComponent } from '../discussion/discussion.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [
    HttpClientModule,
    CommonModule,
    RouterModule.forChild([
      { path: '', component: ClassroomComponent },
      { path: 'question', component: DiscussionComponent },
    ]),
  ],
})
export class ClassModule {}
