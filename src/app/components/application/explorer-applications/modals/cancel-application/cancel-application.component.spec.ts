import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelApplicationComponent } from './cancel-application.component';

describe('CancelApplicationComponent', () => {
  let component: CancelApplicationComponent;
  let fixture: ComponentFixture<CancelApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CancelApplicationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CancelApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
