import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Trip } from 'src/app/models/trip';
import { of } from 'rxjs';
import { TripService } from 'src/app/services/trip.service';
import { AuthService } from 'src/app/services/auth.service';
import { Role } from 'src/app/enums/RoleEnum';
import { Actor } from 'src/app/models/actor';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { TripListComponent } from './trip-list.component';
import { FormsModule } from '@angular/forms';

describe('TripListComponent', () => {
  let component: TripListComponent;
  let fixture: ComponentFixture<TripListComponent>;
  let testTrip: Trip;
  let testTrip2: Trip;
  let testActor: Actor;
  let searchTripsSpy: any;
  let getCachedTripsSpy: any;
  let getActorSpy: any;

  beforeEach(async () => {
    // Create mock Trips
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
    testTrip2 = new Trip();
    testTrip2.title = "Test2";
    testTrip2.creator = "63fbaa3db0300ae7e5d9b3d9";
    testTrip2.description = "Jungle party";
    testTrip2.requirements = "Test Requirements";
    testTrip2.startDate = new Date("2021-07-01");
    testTrip2.endDate = new Date("2021-02-06");
    testTrip2.price = 1000;
    testTrip2.ticker = "TEST2TICKER";
    testTrip2.publicationDate = new Date("2021-06-23");

    // Create mock Actor
    testActor = new Actor();
    testActor.role = Role.MANAGER;
    testActor.id = "63fbaa3db0300ae7e5d9b3d8";

    // Create spy for searchTrips
    let tripSpy = jasmine.createSpyObj('TripService', ['searchTrips', 'getCachedTrips']);
    searchTripsSpy = tripSpy.searchTrips.and.returnValue(of([testTrip, testTrip2]));
    getCachedTripsSpy = tripSpy.getCachedTrips.and.returnValue(null);

    // Create spy for getActor
    let actorSpy = jasmine.createSpyObj('AuthService', ['getCurrentActor']);
    getActorSpy = actorSpy.getCurrentActor.and.returnValue((testActor));

    await TestBed.configureTestingModule({
      declarations: [ TripListComponent ],
      imports: [
        AngularFireModule.initializeApp(environment.firebaseConfig),
        HttpClientModule,
        FormsModule
      ],
      providers: [
        { provide: TripService, useValue: tripSpy },
        { provide: AuthService, useValue: actorSpy },
        AngularFireAuth,
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TripListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have two trips', () => {
    console.log(component.trips);

    expect(component.trips.length === 2).toBeTrue();
  });

  it('should show two trips', () => {
    let tripCards = fixture.nativeElement.querySelectorAll('.clickable-card');
    expect(tripCards.length === 2).toBeTrue();
  });

  it('should show not found message if there\'s no trip', () => {
    component.trips = [];
    fixture.detectChanges();
    let notFoundDiv = fixture.nativeElement.querySelector('#tripsNotFound');
    expect(notFoundDiv).not.toBeNull();
  });

});
