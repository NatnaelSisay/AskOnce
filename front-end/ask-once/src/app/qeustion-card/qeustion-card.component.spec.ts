import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QeustionCardComponent } from './qeustion-card.component';

describe('QeustionCardComponent', () => {
  let component: QeustionCardComponent;
  let fixture: ComponentFixture<QeustionCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QeustionCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QeustionCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
