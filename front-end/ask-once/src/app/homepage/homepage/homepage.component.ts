import { Component, inject, OnDestroy, OnInit } from '@angular/core';

import IClassRoom from '../../interface/IClassRoom.interface';
import IUser from '../../interface/IUser';

import { DataService } from '../services/data.service';
import { Subscription } from 'rxjs';

import { MatDialog } from '@angular/material/dialog';
import { CreatClassRoomComponent } from './createClassRoom/createClassRoom.component';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import userFromToken from 'src/app/utils/decodeJwt';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit, OnDestroy {
  dataService = inject(DataService);
  router = inject(Router);
  user?: IUser;
  userSubsctiption?: Subscription;
  classRooms: IClassRoom[] = [];
  classRoomSubscriptioin?: Subscription;
  imageFileName: string | null = null;
  constructor(private dialog: MatDialog, private authService: AuthService) {
    this.imageFileName = userFromToken().profileImage;
    this.userSubsctiption = this.dataService.user$.subscribe((data) => {
      if (data) {
        this.user = data;
      }
    });
  }

  ngOnInit() {
    this.classRoomSubscriptioin = this.dataService
      .getClassRooms()
      .subscribe((res) => {
        this.classRooms = res;
      });
  }

  ngOnDestroy(): void {
    this.classRoomSubscriptioin?.unsubscribe();
  }

  onAddButtonClick() {
    const dialogRef = this.dialog.open(CreatClassRoomComponent, {});
    dialogRef.afterClosed().subscribe((result) => {
      if (result?.data) {
        this.classRooms = [result.data, ...this.classRooms];
      }
    });
  }

  logOut() {
    this.authService.logout();
    this.router.navigate(['', 'auth']);
  }
}
