import { Component, inject, OnInit } from '@angular/core';
import IUser from 'src/app/interface/IUser';
import { ClassRoom } from '../interfaces/classRoom.interface';
import { User } from '../interfaces/user.interface';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit {
  http = inject(DataService);
  classRooms: ClassRoom[] = [];

  ngOnInit() {
    this.http.getClassRooms().subscribe((res) => {
      this.classRooms = res;
    });

    this.http.getUser().subscribe((res) => {
      this.user = res;
    });
  }

  user?: User = {
    _id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'asdasdasd',
    role: 'student',
  };

  onAddButtonClick() {}
}
