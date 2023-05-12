import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripCreateComponent } from './trip-create.component';
import { Trip } from 'src/app/models/trip';
import { Actor } from 'src/app/models/actor';
import { of } from 'rxjs';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { TripService } from 'src/app/services/trip.service';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('TripCreateComponent', () => {
  let component: TripCreateComponent;
  let fixture: ComponentFixture<TripCreateComponent>;
  let testTrip: Trip;
  let testActor: Actor;
  let createTripSpy: any;
  let getActorSpy: any;

  beforeEach(async () => {
    // Create mocks
    testTrip = new Trip();
    testTrip.title = "Test1";
    testTrip.creator = "63fbaa3db0300ae7e5d9b3d8";
    testTrip.description = "Jungle party";
    testTrip.requirements = "Test Requirements";
    testTrip.startDate = new Date("2021-07-01");
    testTrip.endDate = new Date("2021-07-06");
    testTrip.price = 1000;
    testTrip.ticker = "TESTTICKER";
    testTrip.publicationDate = new Date("2021-06-23");
    // Create spy for searchTrips
    let tripSpy = jasmine.createSpyObj('TripService', ['createTrip']);
    createTripSpy = tripSpy.createTrip.and.returnValue(of(testTrip));

    // Create spy for getActor
    let actorSpy = jasmine.createSpyObj('AuthService', ['getCurrentActor']);
    getActorSpy = actorSpy.getCurrentActor.and.returnValue((testActor));

    await TestBed.configureTestingModule({
      declarations: [ TripCreateComponent ],
      imports: [
        AngularFireModule.initializeApp(environment.firebaseConfig),
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule
      ],
      providers: [
        { provide: TripService, useValue: tripSpy },
        { provide: AuthService, useValue: actorSpy },
        AngularFireAuth,
        FormBuilder
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TripCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
