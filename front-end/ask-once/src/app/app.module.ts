import { APP_INITIALIZER, inject, Inject, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import readTokenFromStorage from './utils/readTokenFromStorage';
import { Router } from '@angular/router';
const getBaseUrl = () => 'http://localhost:3000';

@NgModule({
  declarations: [AppComponent],

  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
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
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
