import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ClassroomComponent } from '../classroom/classroom.component';
import { HttpClientModule } from '@angular/common/http';
import { QuestionDialogComponent } from './question-dialog/question-dialog.component';

import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [QuestionDialogComponent],
  imports: [
    HttpClientModule,
    MatFormFieldModule,
    CommonModule,
    MatDialogModule,
    RouterModule.forChild([{ path: '', component: ClassroomComponent }]),
  ],
})
export class ClassModule {}
