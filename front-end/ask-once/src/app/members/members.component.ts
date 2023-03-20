import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable } from 'rxjs';
import { CreateClassRoomService } from '../homepage/homepage/createClassRoom/create-class-room.service';
import IUser from '../interface/IUser';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css'],
})
export class MembersComponent implements OnInit {
  @Input() classRoomId?: string;
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
    const member = option.option.value as IUser;
    this.searchService.addNewMember(member, this.classRoomId);
    console.log(option);
  }

  displayFunction(option: IUser) {
    return option.firstName;
  }
}
