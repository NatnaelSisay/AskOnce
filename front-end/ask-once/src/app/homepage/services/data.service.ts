import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';

//
import IClassRoom from '../..//interface/IClassRoom.interface';
import IUser from '../../interface/IUser';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  http = inject(HttpClient);
  classRooms: IClassRoom[] = [];
  user: IUser = {
    _id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'asdasdasd',
    role: 'student',
  };

  classRoomSubject = new Subject<IClassRoom[]>();
  userSubject = new Subject<IUser>();

  constructor() {}

  getClassRooms(): Observable<IClassRoom[]> {
    this.http
      .get<IClassRoom[]>('http://localhost:3000/class-room')
      .subscribe((res) => {
        this.classRooms = res;
        this.classRoomSubject.next(this.classRooms);
      });

    return this.classRoomSubject.asObservable();
  }

  getUser(): Observable<IUser> {
    this.http.get<IUser>('http://localhost:3000/user').subscribe((res) => {
      this.user = res;
      this.userSubject.next(this.user);
    });

    return this.userSubject.asObservable();
  }
}
