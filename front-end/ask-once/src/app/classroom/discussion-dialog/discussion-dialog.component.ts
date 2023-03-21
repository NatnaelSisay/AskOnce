import { Component, inject, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TINY_API_KEY } from '../../utils/config';
import IQuestion from 'src/app/interface/IQuestion';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { DiscussionService } from './discussion.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import amIProfessor from 'src/app/utils/amIProfessor';
import userFromToken from 'src/app/utils/decodeJwt';
import { ActivatedRoute } from '@angular/router';
import { IAnswerData } from 'src/app/interface/IAnswerData';

@Component({
  selector: 'app-discussion-dialog',
  templateUrl: './discussion-dialog.component.html',
  styleUrls: ['./discussion-dialog.component.css'],
})
export class DiscussionDialogComponent {
  formGroup = inject(FormBuilder).group({
    answer: ['', Validators.required],
  });
  tinyApi = TINY_API_KEY;
  answers: IAnswerData[] = [];

  constructor(
    private _snackBar: MatSnackBar,
    private discussionService: DiscussionService,
    public dialogRef: MatDialogRef<DiscussionDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { question: IQuestion; classId: string }
  ) {
    try {
      this.discussionService
        .getAnswers(this.data.question._id, this.data.classId)
        .subscribe({
          next: (value) => {
            if (value.data.length === 0) {
              return;
            }

            this.answers = value.data[0].answers;
          },
          error: (err) => {
            this.formGroup.enable();
            this._snackBar.open(err[0]);
          },
        });
    } catch (error) {
      this.formGroup.enable();
    }
  }

  submitAnswer() {
    if (this.formGroup.invalid) {
      return;
    }
    this.formGroup.disable();

    setTimeout(() => {
      try {
        this.discussionService
          .createAnswer(
            this.data.question._id,
            this.formGroup.controls.answer.value!,
            this.data.classId
          )
          .subscribe({
            next: (value) => {
              let i = this.answers.findIndex(
                (answer) => answer.user.role === 'STUDENT'
              );
              if (i !== -1) {
                this.answers.splice(i, 0, value.data.answer);
              } else {
                this.answers.push(value.data.answer);
              }

              this.formGroup.enable();
            },
            error: (err) => {
              this.formGroup.enable();
              this._snackBar.open(err[0]);
            },
          });
      } catch (error) {
        this.formGroup.enable();
      }
    }, 1000);
  }

  canDelete(answer: IAnswerData) {
    return amIProfessor() || userFromToken()._id === answer.user._id;
  }
  deleteAnswer(answer: IAnswerData) {
    if (this.canDelete(answer)) {
      this.discussionService
        .deleteAnswer(this.data.question._id, answer._id, this.data.classId)
        .subscribe({
          next: (value) => {
            this.answers = this.answers.filter((a) => answer._id !== a._id);
          },
          error: (err) => {
            this._snackBar.open(err[0]);
          },
        });
    }
  }
}
