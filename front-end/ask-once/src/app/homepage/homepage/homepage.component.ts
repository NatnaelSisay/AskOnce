import { Component, inject, OnInit } from '@angular/core';

import IClassRoom from '../../interface/IClassRoom.interface';
import IUser from '../..//interface/IUser';

import { DataService } from '../services/data.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit {
  http = inject(DataService);
  classRooms: IClassRoom[] = [];

  ngOnInit() {
    this.http.getClassRooms().subscribe((res) => {
      this.classRooms = res;
    });

    this.http.getUser().subscribe((res) => {
      this.user = res;
    });
  }

  user?: IUser = {
    _id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'asdasdasd',
    role: 'student',
  };

  onAddButtonClick() {}
}
