import { Component, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { QuestionService } from '../class/question.service';
import { Router } from '@angular/router';
import IUser from '../interface/IUser';
import IQuestion from '../interface/IQuestion';
import { MatDialog } from '@angular/material/dialog';
import { QuestionDialogComponent } from '../class/question-dialog/question-dialog.component';
import { DiscussionDialogComponent } from './discussion-dialog/discussion-dialog.component';

@Component({
  selector: 'app-classroom',
  templateUrl: './classroom.component.html',
  styleUrls: ['./classroom.component.css'],
})
export class ClassroomComponent {
  animal: string = 'animal';
  name: string = 'name';

  showAnswers = false;
  searchKey!: string;
  questionService = inject(QuestionService);
  router = inject(Router);
  user?: IUser = {
    _id: '1',
    email: 'JohnDoe@gmail.com ',
    firstName: 'John',
    lastName: 'Doe',
    role: 'Student',
  };

  questions?: IQuestion[];
  tags!: string[];

  constructor(public dialog: MatDialog) {}
  openDialog(): void {
    const dialogRef = this.dialog.open(QuestionDialogComponent, {
      data: { name: this.name, animal: this.animal },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }
  tagger(tag: string) {}

  onKey(event: any) {
    this.searchKey = event.target.value as string;
    console.log(this.searchKey);
  }
  answer_router() {
    this.router.navigateByUrl('question');
  }
  search() {
    this.questionService
      .searchQuestions(this.searchKey)
      .subscribe((res: any) => {
        this.questions = res.data as IQuestion[];
        console.log(this.questions);
      });
  }
  ngOnInit() {
    this.questionService.loadQuestions().subscribe((res: any) => {
      this.questions = res.data as IQuestion[];
      console.log(res);
      this.questionService.loadAllTags().subscribe((res: any) => {
        this.tags = res.data[0].tags as string[];
      });
    });
  }
  showAns(ques: IQuestion) {
    this.dialog.open(DiscussionDialogComponent, {
      data: { question: ques },
    });
  }
}
