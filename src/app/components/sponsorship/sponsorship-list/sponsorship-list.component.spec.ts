import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SponsorshipListComponent } from './sponsorship-list.component';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { HttpClientModule } from '@angular/common/http';

describe('SponsorshipListComponent', () => {
  let component: SponsorshipListComponent;
  let fixture: ComponentFixture<SponsorshipListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SponsorshipListComponent ],
      imports: [AngularFireModule.initializeApp(environment.firebaseConfig), HttpClientModule],
      providers: []

    })
    .compileComponents();

    fixture = TestBed.createComponent(SponsorshipListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
