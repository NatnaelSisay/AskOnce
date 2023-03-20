import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { catchError, retry, throwError } from 'rxjs';
import IUser from 'src/app/interface/IUser';

@Injectable({
  providedIn: 'any',
})
export class CreateClassRoomService {
  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') public baseUrl: string
  ) {}
  search(value: string) {
    return this.http
      .get<IUser[]>(`${this.baseUrl}/users?search=${value}`)
      .pipe(retry(3), catchError(this.handleError));
  }

  createClassRoom(name: string, users: IUser[]) {
    return this.http
      .post<IUser[]>(`${this.baseUrl}/class-room/`, {
        name,
        students: users ?? [],
      })
      .pipe(retry(3), catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    console.log(error);

    return throwError(() => [
      'Something bad happened; please try again later.',
    ]);
  }

  addNewMember(member: IUser) {
    const url = `${this.baseUrl}/class-room/classroom-id/students`;
    this.http
      .post<IUser>(url, member)
      .pipe(retry(3), catchError(this.handleError));
  }
}
