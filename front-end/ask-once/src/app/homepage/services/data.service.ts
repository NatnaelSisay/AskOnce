import { HttpClient } from '@angular/common/http';
import { Inject, inject, Injectable } from '@angular/core';
import { Observable, Subject, of, BehaviorSubject } from 'rxjs';
import userFromToken from 'src/app/utils/decodeJwt';

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
  classRoomSubject = new BehaviorSubject<IClassRoom[]>([]);
  userSubject = new BehaviorSubject<IUser | null>(null);

  classRoom$ = this.classRoomSubject.asObservable();
  user$ = this.userSubject.asObservable();

  constructor(@Inject('BASE_URL') public baseUrl: string) {
    this.userSubject.next(userFromToken());
  }

  getClassRooms(): Observable<IClassRoom[]> {
    this.http
      .get<IClassRoomSuccessReponse>(`${this.baseUrl}/class-room`)
      .subscribe((res) => {
        this.classRooms = res.data;
        this.classRoomSubject.next(this.classRooms);
      });

    return this.classRoomSubject.asObservable();
  }
}
