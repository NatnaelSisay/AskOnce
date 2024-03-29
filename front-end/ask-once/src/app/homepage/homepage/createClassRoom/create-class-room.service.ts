import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import {
  catchError,
  Observable,
  retry,
  throwError,
  of,
  BehaviorSubject,
} from 'rxjs';
import IClassRoom from 'src/app/interface/IClassRoom.interface';
import IStudentResponse from 'src/app/interface/IStudentReponse';
import IUser from 'src/app/interface/IUser';

@Injectable({
  providedIn: 'any',
})
export class CreateClassRoomService {
  membersSubject = new BehaviorSubject<IUser[]>([]);
  members?: IUser[];

  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') public baseUrl: string
  ) {}
  search(value: string) {
    return this.http
      .get<IUser[]>(`${this.baseUrl}/users?search=${value}`)
      .pipe(retry(3), catchError(this.handleError));
  }

  createClassRoom(name: string, description: string, users: IUser[]) {
    return this.http
      .post<{ success: boolean; data: IClassRoom }>(
        `${this.baseUrl}/class-room/`,
        {
          name,
          description,
          students: users ?? [],
        }
      )
      .pipe(retry(3), catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    console.log(error);

    return throwError(() => [
      'Something bad happened; please try again later.',
    ]);
  }

  addNewMember(member: IUser, classRoomId?: string): Observable<any> {
    const url = `${this.baseUrl}/class-room/${classRoomId}/students`;
    return this.http.post<IUser>(url, member);
  }

  getStudents(classRoomId?: string): Observable<IUser[]> {
    const url = `${this.baseUrl}/class-room/${classRoomId}/students?limit=10&page=1`;

    this.http.get<IStudentResponse>(url).subscribe((res) => {
      this.members = res.students;
      this.membersSubject.next(this.members);
    });

    return this.membersSubject.asObservable();
  }

  deleteMember(classRoomId: string, member: IUser): Observable<any> {
    let url: string = `${this.baseUrl}/class-room`;

    if (member.role.toLocaleLowerCase() === 'student') {
      url = `${url}/${classRoomId}/students/${member._id}`;
    }

    return this.http.delete<any>(url);
  }
}
