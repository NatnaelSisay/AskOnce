import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ClassroomComponent } from '../classroom/classroom.component';
import { HttpClientModule } from '@angular/common/http';
import { QuestionDialogComponent } from './question-dialog/question-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [QuestionDialogComponent, FooterComponent],
  imports: [
    MatIconModule,
    HttpClientModule,
    MatFormFieldModule,
    CommonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatChipsModule,

    RouterModule.forChild([{ path: '', component: ClassroomComponent }]),
  ],
})
export class ClassModule {}
