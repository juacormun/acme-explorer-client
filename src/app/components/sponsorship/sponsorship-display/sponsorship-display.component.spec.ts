import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SponsorshipDisplayComponent } from './sponsorship-display.component';

describe('SponsorshipDisplayComponent', () => {
  let component: SponsorshipDisplayComponent;
  let fixture: ComponentFixture<SponsorshipDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SponsorshipDisplayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SponsorshipDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
