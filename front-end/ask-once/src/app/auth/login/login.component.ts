import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm = inject(FormBuilder).group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });
  hidePassword = true;

  tokenSubscription: Subscription | null = null;
  constructor(
    public authService: AuthService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.tokenSubscription = this.authService.token$.subscribe(
      (token: String | null) => {
        if (token !== null) {
          this.router.navigateByUrl('/');
        }
      }
    );
  }
  async login() {
    this.loginForm.disable();
    try {
      this.authService
        .login(
          this.loginForm.controls.email.value!,
          this.loginForm.controls.password.value!
        )
        .subscribe({
          next: (value) => {
            this.loginForm.enable();
            this.authService.setToken(value.token);
          },
          error: (err) => {
            console.log(err);
            
            this.loginForm.enable();
            this.openSnackBar(err[0]);
          },
        });
    } catch (error) {
      this.loginForm.enable();
    }
  }

  openSnackBar(msg: string = 'Invalid email or password') {
    this._snackBar.open(msg, 'close', {
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  ngOnDestroy() {
    this.tokenSubscription?.unsubscribe();
  }
}
