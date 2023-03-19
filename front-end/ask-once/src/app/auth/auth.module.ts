import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthMaterialUiModule } from './auth-material-ui.module';
import { LoginComponent } from './login/login.component';
import { AuthComponent } from './auth.component';
import { RouterModule } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { AuthService } from './auth.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
@NgModule({
  declarations: [LoginComponent, AuthComponent, SignupComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AuthMaterialUiModule,
    MatSnackBarModule,
    

    RouterModule.forChild([
      { path: '', component: AuthComponent },
      { path: '**', redirectTo: '' },
    ]),
  ],
  providers: [AuthService],
})
export class AuthModule {}
