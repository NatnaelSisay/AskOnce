import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  http = inject(HttpClient);
  constructor() {}

  loadQuestions() {
    return this.http.get('http://localhost:3000/questions');
  }
}
