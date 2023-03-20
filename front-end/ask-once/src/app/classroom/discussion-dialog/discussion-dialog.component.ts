import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TINY_API_KEY } from '../../utils/config';
import IQuestion from 'src/app/interface/IQuestion';

@Component({
  selector: 'app-discussion-dialog',
  templateUrl: './discussion-dialog.component.html',
  styleUrls: ['./discussion-dialog.component.css'],
})
export class DiscussionDialogComponent {
  tinyApi = TINY_API_KEY;
  constructor(
    public dialogRef: MatDialogRef<DiscussionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public question: { question: IQuestion }
  ) {}


  
}
