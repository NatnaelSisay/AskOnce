import { Component, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { QuestionService } from '../class/question.service';
import { ActivatedRoute, Router } from '@angular/router';
import IUser from '../interface/IUser';
import IQuestion from '../interface/IQuestion';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { QuestionDialogComponent } from '../class/question-dialog/question-dialog.component';
import { FormBuilder, Validators } from '@angular/forms';
import { DiscussionDialogComponent } from './discussion-dialog/discussion-dialog.component';
import readTokenFromStorage from '../utils/readTokenFromStorage';
import userFromToken from '../utils/decodeJwt';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-classroom',
  templateUrl: './classroom.component.html',
  styleUrls: ['./classroom.component.css'],
})
export class ClassroomComponent {
  classRoomName: string = 'Sample class';
  classRoomId!: string;
  activatedRouter = inject(ActivatedRoute);
  user: IUser = userFromToken();
  tagFilters: string[] = [];
  showAnswers = false;
  searchKey!: string;
  questionService = inject(QuestionService);
  router = inject(Router);
  questions?: IQuestion[];
  searchResults?: IQuestion[] | null;
  tags!: string[];
  debounceTime = 500;
  debounceKey: any;

  constructor(public dialog: MatDialog, private authService: AuthService) {
    this.activatedRouter.params.subscribe((params: any) => {
      this.classRoomId = params.classroom_id;
    });

  }
  openDialog(): void {
    const dialogRef = this.dialog.open(QuestionDialogComponent, {
      width: '500px',
      height: 'px',
      data: { classroom_id: this.classRoomId },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result != null || result != undefined)
        this.questions?.unshift(result);
    });
  }
  tagger(tag: string) {}

  onKey(event: any) {
    if (this.debounceKey) clearTimeout(this.debounceKey);
    this.searchKey = event.target.value;
    if (this.searchKey.length <= 0) {
      this.searchResults = null;
    } else {
      this.debounceKey = setTimeout(
        () => this.search(event.target.value as string),
        this.debounceTime
      );
    }
  }
  answer_router() {
    this.router.navigateByUrl('question');
  }
  search(searchKey: string) {
    console.log(searchKey);

    this.questionService
      .searchQuestions(searchKey, this.classRoomId)
      .subscribe((res: any) => {
        console.log(res);

        this.searchResults = res.data as IQuestion[];
      });
  }

  ngOnInit() {
    this.questionService
      .loadQuestions(this.classRoomId)
      .subscribe((res: any) => {
        this.questions = res.data as IQuestion[];

        this.questionService
          .loadAllTags(this.classRoomId)
          .subscribe((res: any) => {
            this.tags = res.data.length > 0 && res.data[0].tags;
          });
      });
      this.questionService.getClassRoomById(this.classRoomId).subscribe((res: any) => {
        this.classRoomName=res.data.name;
      });
  }
  showAns(ques: IQuestion) {
    this.dialog.open(DiscussionDialogComponent, {
      panelClass: 'dialog-responsive',
      width: '75%',
      height: '100%',
      data: { question: ques, classId: this.classRoomId },
    });
  }
  addTagFilter(tag: string) {
    if (!this.tagFilters.includes(tag)) {
      this.tagFilters.push(tag);
    } else {
      this.tagFilters = this.tagFilters.filter((t) => t !== tag);
    }
    if (this.tagFilters.length !== 0) {
      this.questionService
        .tagFilteredQuestions(this.tagFilters, this.classRoomId)
        .subscribe((res: any) => {
          this.questions = res.data as IQuestion[];
        });
    } else {
      this.questionService
        .loadQuestions(this.classRoomId)
        .subscribe((res: any) => {
          this.questions = res.data as IQuestion[];
        });
    }
  }
  deleteQuestion(id: string) {
    this.questionService
      .deleteQuestion(id, this.classRoomId)
      .subscribe((res: any) => {});
    this.questionService
      .loadQuestions(this.classRoomId)
      .subscribe((res: any) => {
        this.questions = res.data as IQuestion[];
      });
    this.questionService.loadAllTags(this.classRoomId).subscribe((res: any) => {
      this.tags = res.data[0].tags as string[];
    });
  }

  addLikes(ques: IQuestion) {
    const isliked = ques.likes.includes(this.user._id);
    const token = readTokenFromStorage();
    console.log(this.user);

    if (!isliked) {
      this.questionService
        .likeAQuestion(ques._id, this.classRoomId)
        .subscribe((res: any) => {
          ques.likes.push(this.user._id);
        });
    } else {
      this.questionService
        .removeAlike(ques._id, this.classRoomId)
        .subscribe((res: any) => {
          ques.likes = ques.likes.filter((like) => like !== this.user._id);
        });
    }
  }

  logOut() {
    this.authService.logout();
    this.router.navigate(['', 'auth']);
  }
}
