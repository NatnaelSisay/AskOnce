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
  @Input() classRoomId: string = '';
  searchFormControl = new FormControl<string>('');
  searchService = inject(CreateClassRoomService);

  members?: IUser[];

  filterdOptions?: Observable<IUser[]>;
  classStudentsObservable?: Observable<IUser[]>;

  ngOnInit() {
    this.searchFormControl.valueChanges.subscribe((value) => {
      if (value != null && value.length > 0) {
        this.filterdOptions = this.searchService.search(value);
      }
    });

    this.searchService.getStudents(this.classRoomId).subscribe((res) => {
      this.members = res;
    });
  }

  optionSelected(option: MatAutocompleteSelectedEvent) {
    const member = option.option.value as IUser;
    this.searchService.addNewMember(member, this.classRoomId).subscribe(() => {
      this.members?.push(member);
    });
  }

  displayFunction(option: IUser) {
    return option.firstName;
  }

  deleteMember(member: IUser) {
    this.searchService.deleteMember(this.classRoomId, member).subscribe(() => {
      this.members = this.members?.filter((m) => m._id !== member._id);
    });
  }
}
