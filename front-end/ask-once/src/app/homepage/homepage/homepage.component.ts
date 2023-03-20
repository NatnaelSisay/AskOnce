import { Component, inject, OnDestroy, OnInit } from '@angular/core';

import IClassRoom from '../../interface/IClassRoom.interface';
import IUser from '../../interface/IUser';

import { DataService } from '../services/data.service';
import { Subscription } from 'rxjs';

import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { CreatClassRoomComponent } from './createClassRoom/createClassRoom.component';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit, OnDestroy {
  http = inject(DataService);

  user?: IUser;
  classRooms: IClassRoom[] = [];
  classRoomSubscriptioin?: Subscription;
  constructor(private dialog: MatDialog) {}

  ngOnInit() {
    this.classRoomSubscriptioin = this.http.getClassRooms().subscribe((res) => {
      this.classRooms = res;
    });

    this.http.getUser().subscribe((res) => {
      this.user = res;
    });
  }

  ngOnDestroy(): void {
    this.classRoomSubscriptioin?.unsubscribe();
  }

  onAddButtonClick() {
    const dialogRef = this.dialog.open(CreatClassRoomComponent, {});
    dialogRef.afterClosed().subscribe((result) => {
      this.classRooms = [result.data, ...this.classRooms];
    });
  }
}
