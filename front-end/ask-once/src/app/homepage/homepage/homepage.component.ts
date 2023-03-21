import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import IUser from 'src/app/interface/IUser';
import IClassRoom from 'src/app/interface/IClassRoom.interface';

import { AuthService } from 'src/app/auth/auth.service';
import userFromToken from 'src/app/utils/decodeJwt';
import { SlicePipe } from '@angular/common';
import { DataService } from '../services/data.service';

import { CreatClassRoomComponent } from './createClassRoom/createClassRoom.component';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit {
  dataService = inject(DataService);
  router = inject(Router);

  user?: IUser;
  classRooms: IClassRoom[] = [];
  imageFileName?: string | null;
  tags!: string[];

  constructor(private dialog: MatDialog, private authService: AuthService) {}

  ngOnInit() {
    console.log(this.imageFileName);
    this.user = userFromToken();
    this.imageFileName = this.user?.profileImage;

    this.dataService.classRoomSubject.subscribe((res) => {
      this.classRooms = res;
    });

    this.dataService.getClassRooms();
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
