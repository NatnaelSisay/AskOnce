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
  imageSrc?: string;
  formData: FormData = new FormData();
  imageFile: File | null = null;
  tokenSubscription?: Subscription | null = null;
  signupForm = inject(FormBuilder).group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    profileImage: [],
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
      this.formData.append(
        'firstName',
        this.signupForm.controls.firstName.value!
      );
      this.formData.append(
        'lastName',
        this.signupForm.controls.lastName.value!
      );
      this.formData.append('email', this.signupForm.controls.email.value!);
      this.formData.append(
        'password',
        this.signupForm.controls.password.value!
      );
      this.formData.append(
        'passwordConfirmation',
        this.signupForm.controls.passwordConfirmation.value!
      );
      this.formData.append('role', this.signupForm.controls.role.value!);
      if (this.imageFile) this.formData.append('profileImage', this.imageFile);

      this.authService.signup(this.formData).subscribe({
        next: (value) => {
          this.signupForm.enable();
          this.authService.setToken(value.token);
        },
        error: (err) => {
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

  onFileSelected(event: any) {
    this.imageFile = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imageSrc = e.target.result;
    };
    if (this.imageFile) reader.readAsDataURL(this.imageFile);
  }

  removeImage() {
    this.imageFile = null;
    this.imageSrc = '';
  }
}
