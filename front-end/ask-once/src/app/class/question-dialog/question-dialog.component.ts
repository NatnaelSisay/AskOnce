import { Component,Inject, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { DialogData } from 'src/app/interface/IDialogData';
import { QuestionService } from '../question.service';

@Component({

  selector: 'app-question-dialog',
  templateUrl: './question-dialog.component.html',
  styleUrls: ['./question-dialog.component.css']
})
export class QuestionDialogComponent {
  questoinService= inject(QuestionService)
  QuestionForm = inject(FormBuilder).group({
    title: ['', [Validators.required,]],
    description: [''],
  });

  constructor(
    public dialogRef: MatDialogRef<QuestionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  submit(){
    this.questoinService
    console.log(this.QuestionForm.value);

  }


}
