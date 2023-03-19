import { Component } from '@angular/core';
import IUser from 'src/app/interface/IUser';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent {
  classRooms = [
    {
      name: 'Modern web application development discussion room',
      professor: 'John Doe',
      students: 200,
    },
    {
      name: 'Modern web application development discussion room',
      professor: 'John Doe',
      students: 200,
    },
    {
      name: 'Modern web application development discussion room',
      professor: 'John Doe',
      students: 200,
    },
    {
      name: 'Modern web application development discussion room',
      professor: 'John Doe',
      students: 200,
    },
    {
      name: 'Modern web application development discussion room',
      professor: 'John Doe',
      students: 200,
    },
    {
      name: 'Modern web application development discussion room',
      professor: 'John Doe',
      students: 200,
    },
    {
      name: 'Modern web application development discussion room',
      professor: 'John Doe',
      students: 200,
    },
    {
      name: 'Modern web application development discussion room',
      professor: 'John Doe',
      students: 200,
    },
    {
      name: 'Modern web application development discussion room',
      professor: 'John Doe',
      students: 200,
    },
    {
      name: 'Modern web application development discussion room',
      professor: 'John Doe',
      students: 200,
    },
    {
      name: 'Modern web application development discussion room',
      professor: 'John Doe',
      students: 200,
    },
    {
      name: 'Modern web application development discussion room',
      professor: 'John Doe',
      students: 200,
    },
    {
      name: 'Modern web application development discussion room',
      professor: 'John Doe',
      students: 200,
    },
    {
      name: 'Modern web application development discussion room',
      professor: 'John Doe',
      students: 200,
    },
    {
      name: 'Modern web application development discussion room',
      professor: 'John Doe',
      students: 200,
    },
    {
      name: 'Modern web application development discussion room',
      professor: 'John Doe',
      students: 200,
    },
    {
      name: 'Modern web application development discussion room',
      professor: 'John Doe',
      students: 200,
    },
    {
      name: 'Modern web application development discussion room',
      professor: 'John Doe',
      students: 200,
    },
    {
      name: 'Modern web application development discussion room',
      professor: 'John Doe',
      students: 200,
    },
    {
      name: 'Moder web application development discussion room',
      professor: 'John Doe',
      students: 200,
    },
    {
      name: 'Moder web application development discussion room',
      professor: 'John Doe',
      students: 200,
    },
    {
      name: 'Moder web application development discussion room',
      professor: 'John Doe',
      students: 200,
    },
    {
      name: 'Modern web application development discussion room',
      professor: 'John Doe',
      students: 200,
    },
    {
      name: 'Modern web application development discussion room',
      professor: 'John Doe',
      students: 200,
    },
  ];

  user?: IUser = {
    _id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'asdasdasd',
    role: 'student',
  };

  onAddButtonClick() {}
}
