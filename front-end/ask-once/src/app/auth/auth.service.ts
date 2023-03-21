import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, retry, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import ILoginResponse from '../interface/ILoginResponse';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenSubject = new BehaviorSubject<string | null>(null);
  private showingLogin = new BehaviorSubject(true);

  token$ = this.tokenSubject.asObservable();
  showLogin$ = this.showingLogin.asObservable();

  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') public baseUrl: string
  ) {
    this.tokenSubject.next(localStorage.getItem('token'));
  }

  showSignup() {
    this.showingLogin.next(false);
  }
  showLogin() {
    this.showingLogin.next(true);
  }

  login(email: string, password: string) {
    return this.http
      .post<ILoginResponse>(`${this.baseUrl}/users/login`, {
        email,
        password,
      })
      .pipe(retry(3), catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      return throwError(() => ['network error']);
    }
    if (error.status === 400) {
      console.log(error.error);

      return throwError(() =>
        error.error.errors.map((e: any) => e.param + ' : ' + e.msg)
      );
    }
    return throwError(() => [
      'Something bad happened; please try again later.',
    ]);
  }

  setToken(token: string | null) {
    if (!token) localStorage.removeItem('token');
    else localStorage.setItem('token', token!);
    this.tokenSubject.next(localStorage.getItem('token'));
  }
  logout() {
    this.setToken(null);
    this.tokenSubject.next(localStorage.getItem('token'));
  }

  signup(
    // firstName: string,
    // lastName: string,
    // email: string,
    // password: string,
    // passwordConfirmation: string,
    // role: string
    formData: FormData
  ) {
    return this.http
      .post<ILoginResponse>(
        `${this.baseUrl}/users/signup`,
        formData

        // {

        //   firstName,
        //   lastName,
        //   email,
        //   password,
        //   passwordConfirmation,
        //   role,
        // }
      )
      .pipe(retry(3), catchError(this.handleError));
  }
}
