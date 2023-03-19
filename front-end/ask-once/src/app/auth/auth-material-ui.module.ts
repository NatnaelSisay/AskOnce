import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
const modules = [
  MatCardModule,
  MatButtonModule,
  MatInputModule,
  MatFormFieldModule,
  MatIconModule,
];
@NgModule({
  imports: modules,
  exports: modules,
})
export class AuthMaterialUiModule {}
