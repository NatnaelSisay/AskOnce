import { Component, inject } from '@angular/core';
import IUser from 'src/app/interface/IUser';

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
export class HomepageComponent {
  dialog = inject(MatDialog);
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

  onAddButtonClick() {
    const dialogRef = this.dialog.open(CreatClassRoomComponent, {});
    console.log('asdsadasdasdasd');

    dialogRef.afterClosed().subscribe((result) => {});
  }
}
