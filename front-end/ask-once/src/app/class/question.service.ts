import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import IQuestion from '../interface/IQuestion';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  http = inject(HttpClient);
  constructor() {}

  loadQuestions() {
    return this.http.get('http://localhost:3000/questions');
  }
  searchQuestions(key :string){
    return this.http.get('http://localhost:3000/questions/search?title='+key)
  }
  loadAllTags(){
    return this.http.get('http://localhost:3000/questions/tags/list')
  }
  addNewQuestion(data :{title: string, descritption: string}){
    const reqFile={...data,
          tags:[],
          answers:[],
          askedBy:{
            _id:1,
            firstName:"john",
            lastName:"Doe",
            email:"johnDoe@email.com",
            role:"student"
        }
        }
    return this.http.post('http://localhost:3000/questions',reqFile);
  }
}



