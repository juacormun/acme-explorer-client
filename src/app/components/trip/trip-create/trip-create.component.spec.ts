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
import { formatDate } from '@angular/common';

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
    testTrip._id = "63fbaa3db0300ae7e5d9b3d9";
    testTrip.title = "Test1";
    testTrip.creator = "63fbaa3db0300ae7e5d9b3d8";
    testTrip.description = "Jungle party";
    testTrip.requirements = "Test Requirements";
    testTrip.startDate = new Date("2023-07-01");
    testTrip.endDate = new Date("2023-07-06");
    testTrip.ticker = "TESTTICKER";
    testActor = new Actor();
    testActor._id = "63fbaa3db0300ae7e5d9b3d8";
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

  it('should create new trip, the form button is not disabled', () => {
    const locale = localStorage.getItem('locale') ?? 'en';
    component.creationForm.controls['title'].setValue("Test1");
    component.creationForm.controls['description'].setValue("Jungle party");
    component.creationForm.controls['requirements'].setValue("Requirements1");
    component.creationForm.controls['startDate'].setValue(formatDate(new Date("2023-07-01"), 'yyyy-MM-dd', locale));
    component.creationForm.controls['endDate'].setValue(formatDate(new Date("2023-07-06"), 'yyyy-MM-dd', locale));
    fixture.detectChanges();
    let button = fixture.nativeElement.querySelector('#submitButton');
    expect(button.disabled).toBeFalsy();
  });

  it('should not create new trip, the form button is disabled', () => {
    const locale = localStorage.getItem('locale') ?? 'en';
    component.creationForm.controls['title'].setValue("Test1");
    component.creationForm.controls['description'].setValue("Jungle party");
    component.creationForm.controls['requirements'].setValue("Requirements1");
    component.creationForm.controls['startDate'].setValue(formatDate(new Date("2021-07-01"), 'yyyy-MM-dd', locale));
    component.creationForm.controls['endDate'].setValue(formatDate(new Date("2021-07-06"), 'yyyy-MM-dd', locale));
    fixture.detectChanges();
    let button = fixture.nativeElement.querySelector('#submitButton');
    expect(button.disabled).toBeTrue();
  });


});
