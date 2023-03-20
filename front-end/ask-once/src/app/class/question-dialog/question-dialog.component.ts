import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { DialogData } from 'src/app/interface/IDialogData';
import { QuestionService } from '../question.service';
import IQuestion from 'src/app/interface/IQuestion';

@Component({
  selector: 'app-question-dialog',
  templateUrl: './question-dialog.component.html',
  styleUrls: ['./question-dialog.component.css'],
})
export class QuestionDialogComponent {
  questoinService = inject(QuestionService);
  QuestionForm = inject(FormBuilder).group({
    title: ['', [Validators.required]],
    description: [''],
  });

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA];
  tags: string[] = ['Node', 'Angular', 'Mongodb'];

  constructor(
    public dialogRef: MatDialogRef<QuestionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.tags.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(tag: string): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  edit(tag: string, event: MatChipEditedEvent) {
    const value = event.value.trim();

    // Remove fruit if it no longer has a name
    if (!value) {
      this.remove(tag);
      return;
    }

    // Edit existing fruit
    const index = this.tags.indexOf(tag);
    if (index >= 0) {
      this.tags[index] = value;
    }
  }
  submit() {
    this.questoinService
      .addNewQuestion(
        this.QuestionForm.get('title')?.value ?? '',
        this.QuestionForm.get('description')?.value ?? '',
        this.tags,
        this.data.classroom_id
      )
      .subscribe({
        next: (data: any) => {

          this.dialogRef.close({
            _id: data.data._id,
            question: this.QuestionForm.get('title')?.value ?? '',
            description: this.QuestionForm.get('description')?.value ?? '',
            tags: this.tags,
            answers: [],
            askedBy: {
              _id: '1',
              firstName: 'john',
              lastName: 'Doe',
              email: 'johnDoe@email.com',
              role: 'student',
            },
            showAnswers: false,
          } as IQuestion);
        },
        error: (error) => {
          console.error('There was an error!', error);
        },
      });
  }
}

type Tag = string[];
