import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { catchError, retry, throwError } from 'rxjs';
import { IGetAnswers, IAnswerData } from 'src/app/interface/IAnswerData';

@Injectable({
  providedIn: 'root',
})
export class DiscussionService {
  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') public baseUrl: string
  ) {}

  createAnswer(questionId: string, answer: string, classId: string) {

    

    return this.http
      .post<{
        success: true;
        data: {
          _id: string;
          answer: IAnswerData;
        };
      }>(
        this.baseUrl + `/class-room/${classId}/questions/${questionId}/answers`,
        {
          answer,
        }
      )
      .pipe(retry(3), catchError(this.handleError));
  }

  getAnswers(questionId: string, classId: string) {
    return this.http
      .get<IGetAnswers>(
        this.baseUrl + `/class-room/${classId}/questions/${questionId}/answers`
      )
      .pipe(retry(3), catchError(this.handleError));
  }
  deleteAnswer(questionId: string, answerId: string, classId: string) {
    return this.http
      .delete<{
        success: true;
        data: { answers: IAnswerData[] };
      }>(
        this.baseUrl +
          `/class-room/${classId}/questions/${questionId}/answers/${answerId}`
      )
      .pipe(retry(3), catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    console.log(error);

    if (error.status === 0) {
      return throwError(() => ['network error']);
    }

    return throwError(() => [
      'Something bad happened; please try again later.',
    ]);
  }
}
