import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripManagerListComponent } from './trip-manager-list.component';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { TripService } from 'src/app/services/trip.service';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

describe('TripManagerListComponent', () => {
  let component: TripManagerListComponent;
  let fixture: ComponentFixture<TripManagerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TripManagerListComponent ],
      imports: [AngularFireModule.initializeApp(environment.firebaseConfig), HttpClientModule],
      providers: []
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
