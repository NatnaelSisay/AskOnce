import { APP_INITIALIZER, inject, Inject, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';

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

const getBaseUrl = () => 'http://localhost:3000';

@NgModule({
  declarations: [AppComponent, MembersComponent, ClassroomComponent],

  imports: [
    MatButtonModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCardModule,
    MatChipsModule,
    MatListModule,
    MatDividerModule,
    MatIconModule,
    HttpClientModule,
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
