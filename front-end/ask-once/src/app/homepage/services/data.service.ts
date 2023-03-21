import { HttpClient } from '@angular/common/http';
import { Inject, inject, Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import IClassRoom, {
  IClassRoomSuccessReponse,
} from 'src/app/interface/IClassRoom.interface';
import IUser from 'src/app/interface/IUser';
import userFromToken from 'src/app/utils/decodeJwt';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  http = inject(HttpClient);

  classRoomSubject = new BehaviorSubject<IClassRoom[]>([]);
  userSubject = new BehaviorSubject<IUser | null>(null);

  classRoom$ = this.classRoomSubject.asObservable();
  user$ = this.userSubject.asObservable();

  constructor(@Inject('BASE_URL') public baseUrl: string) {
    this.userSubject.next(userFromToken());
  }

  getClassRooms() {
    this.http
      .get<IClassRoomSuccessReponse>(`${this.baseUrl}/class-room`)
      .subscribe((res) => {
        this.classRoomSubject.next(res.data);
      });
  }

  addTags(classRoomId: string){
    return this.http.get(`${this.baseUrl}/class-room/${classRoomId}/questions/limitedTags`);

  }
}
