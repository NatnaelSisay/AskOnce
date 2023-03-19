import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, retry, throwError } from 'rxjs';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import ILoginResponse from './interface/ILoginResponse';

@Injectable({
  providedIn: 'any',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') public baseUrl: string
  ) {
    this.tokenSubject.next(localStorage.getItem('token'));
  }

  private tokenSubject = new BehaviorSubject<string | null>(null);
  public token$ = this.tokenSubject.asObservable();
  private showingLogin = new BehaviorSubject(true);
  showLogin$ = this.showingLogin.asObservable();
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
      return throwError(() => error.error.errors.map((e: any) => e.msg));
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
  }

  signup(
    fistName: string,
    lastName: string,
    email: string,
    password: string,
    passwordConfirmation: string,
    role: string
  ) {
    return this.http.post(`${this.baseUrl}/users/signup`, {
      fistName,
      lastName,
      email,
      password,
      passwordConfirmation,
      role,
    });
  }
}
