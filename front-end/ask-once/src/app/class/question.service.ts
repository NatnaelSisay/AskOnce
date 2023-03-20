import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import IQuestion from '../interface/IQuestion';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  http = inject(HttpClient);
  constructor() {}

  loadQuestions(clasroomId: string) {
    return this.http.get('http://localhost:3000/class-room/'+clasroomId+'/questions');
  }
  searchQuestions(key :string){
    return this.http.get('http://localhost:3000/questions/search?title='+key)
  }
  loadAllTags(){
    return this.http.get('http://localhost:3000/questions/tags/list')
  }
  addNewQuestion(title: string, description:string,tags :string[],clasroomId :string){
    const reqFile={

          question:title,
          description:description,
          tags:tags,
          answers:[],
          askedBy:{
            _id:"1",
            firstName:"john",
            lastName:"Doe",
            email:"johnDoe@email.com",
            role:"student"
        }
        }
    return this.http.post('http://localhost:3000/class-room/'+clasroomId+'/questions',reqFile);

  }
  tagFilteredQuestions(tags :string[]){
    return this.http.post('http://localhost:3000/questions/tagfiltred',{tags:tags})

  }
  deleteQuestion(id :string){
    return this.http.delete('http://localhost:3000/questions/'+id)
  }

}



