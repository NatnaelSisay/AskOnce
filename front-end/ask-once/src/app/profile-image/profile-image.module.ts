import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DisplayProfilePicComponent } from './display-profile-pic/display-profile-pic.component';

@NgModule({
  declarations: [DisplayProfilePicComponent],
  imports: [CommonModule],
  exports: [DisplayProfilePicComponent],
})
export class ProfileImageModule {}
