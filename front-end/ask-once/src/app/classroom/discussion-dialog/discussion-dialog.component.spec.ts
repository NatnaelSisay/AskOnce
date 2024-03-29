import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscussionDialogComponent } from './discussion-dialog.component';

describe('DiscussionDialogComponent', () => {
  let component: DiscussionDialogComponent;
  let fixture: ComponentFixture<DiscussionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiscussionDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiscussionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
