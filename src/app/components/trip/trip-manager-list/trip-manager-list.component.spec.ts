import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripManagerListComponent } from './trip-manager-list.component';

describe('TripManagerListComponent', () => {
  let component: TripManagerListComponent;
  let fixture: ComponentFixture<TripManagerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TripManagerListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TripManagerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
