import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  tokenSubscription?: Subscription | null = null;
  signupForm = inject(FormBuilder).group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    passwordConfirmation: [
      '',
      [
        Validators.required,
        // (control: AbstractControl) => {
        //   if (control?.value !== this.signupForm.controls.password.value) {
        //     return { passwordsDontMatch: "passwords don't match" };
        //   }
        //   return null;
        // },
      ],
    ],
    role: ['', Validators.required],
  });
  hidePassword = true;

  constructor(
    public authService: AuthService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {
    this.tokenSubscription = this.authService.token$.subscribe(
      (token: String | null) => {
        if (token !== null) {
          this.router.navigateByUrl('/');
        }
      }
    );
  }

  async signup() {
    if (!this.signupForm.valid) return;
    this.signupForm.disable();
    try {
      this.authService
        .signup(
          this.signupForm.controls.firstName.value!,
          this.signupForm.controls.lastName.value!,
          this.signupForm.controls.email.value!,
          this.signupForm.controls.password.value!,
          this.signupForm.controls.passwordConfirmation.value!,
          this.signupForm.controls.role.value!
        )
        .subscribe({
          next: (value) => {
            this.signupForm.enable();
            this.authService.setToken(value.token);
          },
          error: (err) => {
            console.log(err);

            this.signupForm.enable();
            this.openSnackBar(err[0]);
          },
        });
    } catch (error) {
      this.signupForm.enable();
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
