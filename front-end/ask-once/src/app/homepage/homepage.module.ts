import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '/classroom/:classroom_id',
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
