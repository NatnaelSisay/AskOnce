import { Component, inject, OnDestroy, OnInit } from '@angular/core';

import IClassRoom from '../../interface/IClassRoom.interface';
import IUser from '../..//interface/IUser';

import { DataService } from '../services/data.service';
import { Subscription } from 'rxjs';

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

  ngOnInit() {
    this.classRoomSubscriptioin = this.http.getClassRooms().subscribe((res) => {
      this.classRooms = res;
    });

    this.http.getUser().subscribe((res) => {
      this.user = res;
    });
  }

  onAddButtonClick() {
    this.classRooms.pop();
    this.http.classRoomSubject.next(this.classRooms);
  }

  ngOnDestroy(): void {
    this.classRoomSubscriptioin?.unsubscribe();
  }
}
