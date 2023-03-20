import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { BehaviorSubject, map, Observable } from 'rxjs';
import IUser from 'src/app/interface/IUser';
import { CreateClassRoomService } from './create-class-room.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-class-room',
  templateUrl: './createClassRoom.component.html',
  styleUrls: ['./createClassRoom.component.css'],
  providers: [CreateClassRoomService],
})
export class CreatClassRoomComponent {
  options: string[] = ['One', 'Two', 'Three'];
  selectedUsers?: BehaviorSubject<IUser[]> = new BehaviorSubject<IUser[]>([]);
  searchResult?: Observable<IUser[]>;
  searchDebounceTime = 200;
  searchDebounceTimeOut: any;
  searchFormControl = new FormControl<string>('');

  createClassForm = inject(FormBuilder).group({
    name: ['', [Validators.required]],
  });

  constructor(
    private createClassRoomService: CreateClassRoomService,
    public dialogRef: MatDialogRef<CreatClassRoomComponent>
  ) {
    this.searchFormControl.valueChanges.subscribe((value) => {
      if (value != null && value.length > 0) {
        this.search(value ?? '');
      } else {
        this.searchResult?.pipe(map((x) => []));
      }
    });
  }

  search(value: string) {
    if (this.searchDebounceTimeOut) {
      clearTimeout(this.searchDebounceTimeOut);
    }
    this.searchDebounceTimeOut = setTimeout(() => {
      this.searchResult = this.createClassRoomService.search(value);
    }, this.searchDebounceTime);
  }

  optionSelected(event: MatAutocompleteSelectedEvent) {
    this.selectedUsers?.next([
      ...this.selectedUsers?.value,
      event.option.value,
    ]);
  }

  removeUser(user: IUser) {
    this.selectedUsers?.next(
      this.selectedUsers?.value.filter((x) => x._id !== user._id)
    );
  }
  itemDisplayFn(user: IUser) {
    return '';
  }
  createClass() {
    console.log('------------------------------ one');
    console.log(
      '------------------------------ one',
      this.createClassForm.valid,
      this.createClassForm.controls.name.value
    );

    if (!this.createClassForm.valid) {
      return;
    }
    console.log('------------------------------ two');
    this.createClassRoomService
      .createClassRoom(
        this.createClassForm.controls.name.value!,
        this.selectedUsers?.value ?? []
      )
      .subscribe({
        next: (value) => {
          console.log('------------------------------ three');

          this.dialogRef.close();
          this.createClassForm.enable();
        },
        error: (err) => {
          this.createClassForm.enable();
        },
      });
  }
}
