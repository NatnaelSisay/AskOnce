import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatOptionSelectionChange } from '@angular/material/core';
import { Observable, of } from 'rxjs';
import { CreateClassRoomService } from '../homepage/homepage/createClassRoom/create-class-room.service';
import IUser from '../interface/IUser';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css'],
})
export class MembersComponent implements OnInit {
  searchFormControl = new FormControl<string>('');
  searchService = inject(CreateClassRoomService);

  filterdOptions?: Observable<IUser[]>;

  ngOnInit() {
    this.searchFormControl.valueChanges.subscribe((value) => {
      if (value != null && value.length > 0) {
        this.filterdOptions = this.searchService.search(value);
      }
    });
  }

  optionSelected(option: MatAutocompleteSelectedEvent) {
    console.log(option);
  }

  displayFunction(option: IUser) {
    return option.firstName;
  }
}
