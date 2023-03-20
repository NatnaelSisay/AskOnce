import { Component, Inject, inject } from '@angular/core';
import { Router } from '@angular/router';
import IUser from '../interface/IUser';
import IQuestion from '../interface/IQuestion';
import { QuestionService } from '../class/question.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-qeustion-card',
  templateUrl: './qeustion-card.component.html',
  styleUrls: ['./qeustion-card.component.css'],
})
export class QeustionCardComponent {
  questionService = inject(QuestionService);
  router = inject(Router);
  user?: IUser = {
    _id: '1',
    email: 'JohnDoe@gmail.com ',
    firstName: 'John',
    lastName: 'Doe',
    role: 'Student',
  };
  questionslist= new BehaviorSubject<IQuestion[] | null>(null)
  questionlist$= this.questionslist.asObservable()
  questions?: IQuestion[];

  constructor() {}
  answer_router() {
    this.router.navigateByUrl('/question');
  }
  ngOnInit() {
    this.questionService.loadQuestions().subscribe((res: any) => {

      this.questions= res.data as IQuestion[]
      this.questionslist.next(this.questions)
      console.log(this.questions);
    });
  }
}
