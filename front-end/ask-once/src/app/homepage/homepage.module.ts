import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { HomepageMaterialModules } from './homepage-material.module';
import { CreatClassRoomComponent } from './homepage/createClassRoom/createClassRoom.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [HomepageComponent, CreatClassRoomComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HomepageMaterialModules,
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
})
export class HomepageModule {}
