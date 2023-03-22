import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import IQuestion from '../interface/IQuestion';
import IUser from '../interface/IUser';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  http = inject(HttpClient);
  constructor() {}

  loadQuestions(clasroomId: string) {
    return this.http.get('http://localhost:3000/class-room/'+clasroomId+'/questions');
  }
  searchQuestions(key :string,clasroomId: string){
    return this.http.get('http://localhost:3000/class-room/'+clasroomId+'/questions/search?title='+key)
  }
  loadAllTags(clasroomId: string){
    return this.http.get('http://localhost:3000/class-room/'+clasroomId+'/questions/tags/list')
  }
  addNewQuestion(title: string, description:string,tags :string[],clasroomId :string,user :IUser){
    const reqFile={

          question:title,
          description:description,
          tags:tags,
          answers:[],
          askedBy:user,
        }
        console.log(reqFile);
    return this.http.post('http://localhost:3000/class-room/'+clasroomId+'/questions',reqFile);

  }
  tagFilteredQuestions(tags :string[],clasroomId: string){
    return this.http.post('http://localhost:3000/class-room/'+clasroomId+'/questions/tagfiltred',{tags:tags})

  }
  deleteQuestion(id :string,clasroomId: string){
    return this.http.delete('http://localhost:3000/class-room/'+clasroomId+'/questions/'+id)
  }
  likeAQuestion(id :string,clasroomId: string){
    return this.http.put('http://localhost:3000/class-room/'+clasroomId+'/questions/'+id+'/like',{});
  }
  removeAlike(id :string,clasroomId: string){
    return this.http.put('http://localhost:3000/class-room/'+clasroomId+'/questions/'+id+'/rm-like',{});
  }
  getClassRoomById(id :string){
    return this.http.get('http://localhost:3000/class-room/'+id)
  }

}



