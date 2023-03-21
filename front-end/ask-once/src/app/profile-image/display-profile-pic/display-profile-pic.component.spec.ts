import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayProfilePicComponent } from './display-profile-pic.component';

describe('DisplayProfilePicComponent', () => {
  let component: DisplayProfilePicComponent;
  let fixture: ComponentFixture<DisplayProfilePicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayProfilePicComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayProfilePicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
