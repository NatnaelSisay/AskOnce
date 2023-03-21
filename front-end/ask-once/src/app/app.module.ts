import { APP_INITIALIZER, inject, Inject, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';

import { MatCard, MatCardModule } from '@angular/material/card';

import { MatChipsModule } from '@angular/material/chips';
import { MembersComponent } from './members/members.component';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

import { ClassroomComponent } from './classroom/classroom.component';
import readTokenFromStorage from './utils/readTokenFromStorage';
import { Router } from '@angular/router';
import { AppGuardInterceptor } from './app-guard.interceptor';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { HttpRequestInterceptor } from 'src/httpInterceptors/httpRequestInterceptor';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { DiscussionDialogComponent } from './classroom/discussion-dialog/discussion-dialog.component';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FooterComponent } from './footer/footer.component';
import { ProfileImageModule } from './profile-image/profile-image.module';
import { ComponentsModule } from './components/components.module';

const getBaseUrl = () => 'http://localhost:3000';

@NgModule({
  declarations: [
    AppComponent,

    MembersComponent,
    ClassroomComponent,

    DiscussionDialogComponent,
  ],

  imports: [
    MatButtonModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatCardModule,
    MatInputModule,
    MatChipsModule,
    MatListModule,
    MatDividerModule,
    MatIconModule,
    MatCardModule,
    HttpClientModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    ProfileImageModule,
    FormsModule,
    MatProgressBarModule,
    MatSnackBarModule,
    ComponentsModule
  ],
  providers: [
    { provide: 'BASE_URL', useFactory: getBaseUrl },
    {
      provide: APP_INITIALIZER,
      useFactory: (router = inject(Router)) => {
        const token = readTokenFromStorage();
        if (token === null) {
          router.navigateByUrl('/auth');
        }
      },
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppGuardInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],

})
export class AppModule {}
