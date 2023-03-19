import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import { ClassRoom } from '../interfaces/classRoom.interface';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  http = inject(HttpClient);
  classRooms: ClassRoom[] = [];
  user: User = {
    _id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'asdasdasd',
    role: 'student',
  };

  classRoomSubject: Subject<ClassRoom[]> = new Subject<ClassRoom[]>();

  constructor() {}

  getClassRooms(): Observable<ClassRoom[]> {
    this.http
      .get<ClassRoom[]>('http://localhost:3000/class-room')
      .subscribe((res) => {
        this.classRooms = res;
        this.classRoomSubject.next(this.classRooms);
      });

    return this.classRoomSubject.asObservable();
  }

  getUser(): Observable<User> {
    this.http.get<User>('http://localhost:3000/user').subscribe((res) => {
      this.user = res;
      this.classRoomSubject.next(this.classRooms);
    });

    return of(this.user);
  }
}
