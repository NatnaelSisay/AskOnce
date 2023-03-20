import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, Subject, of, BehaviorSubject } from 'rxjs';

//
import IClassRoom, {
  IClassRoomSuccessReponse,
} from '../..//interface/IClassRoom.interface';
import IUser from '../../interface/IUser';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  http = inject(HttpClient);
  classRooms: IClassRoom[] = [];
  user?: IUser;

  classRoomSubject = new BehaviorSubject<IClassRoom[]>([]);
  userSubject = new BehaviorSubject<IUser>({
    _id: '64152b652e66a08b1e5e03de',
    firstName: 'professor',
    lastName: 'professor',
    email: 'professor@gmail.com',
    role: 'PROFESSOR',
  });

  classRoom$ = this.classRoomSubject.asObservable();
  user$ = this.userSubject.asObservable();

  constructor() {}

  getClassRooms(): Observable<IClassRoom[]> {
    this.http
      .get<IClassRoomSuccessReponse>('http://localhost:3000/class-room')
      .subscribe((res) => {
        this.classRooms = res.data;
        this.classRoomSubject.next(this.classRooms);
      });

    return this.classRoomSubject.asObservable();
  }

  getUser(): Observable<IUser> {
    // this.http.get<IUser>('http://localhost:3000/user').subscribe((res) => {
    //   this.user = res;
    //   this.userSubject.next(this.user);
    // });
    this.user = {
      _id: '64152b652e66a08b1e5e03de',
      firstName: 'professor',
      lastName: 'professor',
      email: 'professor@gmail.com',
      role: 'PROFESSOR',
    };
    this.userSubject.next(this.user);
    return this.userSubject.asObservable();
  }
}
