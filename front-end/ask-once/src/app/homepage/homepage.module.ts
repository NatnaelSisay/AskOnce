import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { HomepageMaterialModules } from './homepage-material.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppGuardInterceptor } from '../app-guard.interceptor';
import { CreatClassRoomComponent } from './homepage/createClassRoom/createClassRoom.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfileImageModule } from '../profile-image/profile-image.module';
import { ComponentsModule } from '../components/components.module';
import {MatChipsModule} from '@angular/material/chips';
import { ClassroomCardComponenet } from './homepage/classroom-card.component';

@NgModule({
  declarations: [HomepageComponent, CreatClassRoomComponent, ClassroomCardComponenet],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HomepageMaterialModules,
    HttpClientModule,
    ProfileImageModule,
    ComponentsModule,
    MatChipsModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomepageComponent,
        pathMatch: 'full',
      },
      {
        path: 'classroom/:classroom_id',
        loadChildren: () =>
          import('../class/class.module').then((m) => m.ClassModule),
      },
      {
        path: '**',
        redirectTo: '',
      },
    ]),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppGuardInterceptor,
      multi: true,
    },
  ],
})
export class HomepageModule {}
