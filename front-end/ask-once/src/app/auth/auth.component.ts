import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  showLogin = true;
  private subscription?: Subscription;
  constructor(public authService: AuthService) {
    this.subscription = authService.showLogin$.subscribe((showLogin) => {
      this.showLogin = showLogin;
    });
    console.log(this.showLogin);
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
