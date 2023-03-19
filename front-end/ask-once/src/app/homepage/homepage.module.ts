import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { HomepageMaterialModules } from './homepage-material.module';

@NgModule({
  declarations: [HomepageComponent],
  imports: [
    CommonModule,
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
