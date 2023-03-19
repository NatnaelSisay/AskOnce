import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthModule } from './auth.module';

@Injectable({
  providedIn: 'any',
})
export class AuthService {
  private showingLogin = new BehaviorSubject(false);
  showLogin$ = this.showingLogin.asObservable();
  showSignup() {
    this.showingLogin.next(false);
  }
  showLogin() {
    this.showingLogin.next(true);
  }
  constructor() {}
}
