import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ClassroomComponent } from '../classroom/classroom.component';
import { DiscussionComponent } from '../discussion/discussion.component';
import { HttpClientModule } from '@angular/common/http';
import { QuestionDialogComponent } from './question-dialog/question-dialog.component';

import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [
    QuestionDialogComponent,

  ],
  imports: [
    HttpClientModule,
    MatFormFieldModule,
    CommonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,

    RouterModule.forChild([
      { path: '', component: ClassroomComponent },
      { path: 'question', component: DiscussionComponent },
    ]),
  ],
})
export class ClassModule {}
