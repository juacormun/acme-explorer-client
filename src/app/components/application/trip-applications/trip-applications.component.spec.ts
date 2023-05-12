import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Trip } from 'src/app/models/trip';
import { ActivatedRouteStub } from '../../shared/activatedroute-stub';
import { of } from 'rxjs';
import { TripService } from 'src/app/services/trip.service';
import { AuthService } from 'src/app/services/auth.service';
import { Role } from 'src/app/enums/RoleEnum';
import { Actor } from 'src/app/models/actor';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { TripApplicationsComponent } from './trip-applications.component';
import { Application } from 'src/app/models/application';
import { Status } from 'src/app/enums/StatusEnum';

describe('TripApplicationsComponent', () => {
  let component: TripApplicationsComponent;
  let fixture: ComponentFixture<TripApplicationsComponent>;
  let mockactivatedRoute: ActivatedRouteStub;
  let testTrip: Trip;
  let testActor: Actor;
  let testApp1: Application;
  let testApp2: Application;
  let getTripSpy: any;
  let getActorSpy: any;
  let getTripApplicationsSpy: any;

  beforeEach(async () => {
    mockactivatedRoute = new ActivatedRouteStub();
    mockactivatedRoute.testParams = { id: "63e144632ba413df4fa0d9b2" };

    // Create mock Trip
    testTrip = new Trip();
    testTrip._id = "63e144632ba413df4fa0d9b2";
    testTrip.title = "Test Trip";
    testTrip.creator = "63fbaa3db0300ae7e5d9b3d8";
    testTrip.description = "Test Description";
    testTrip.requirements = "Test Requirements";
    testTrip.startDate = new Date();
    testTrip.endDate = new Date();
    testTrip.price = 100;
    testTrip.ticker = "TESTTICKER";

    // Create mock Actor
    testActor = new Actor();
    testActor.role = Role.MANAGER;
    testActor.id = "63fbaa3db0300ae7e5d9b3d8";

    // Create mock applications
    testApp1 = new Application();
    testApp1.trip = "63e144632ba413df4fa0d9b2";
    testApp1.explorer = "63e144632ba413df4fa0d9c3";
    testApp1.status = Status.ACCEPTED;
    testApp2 = new Application();
    testApp1.trip = "63e144632ba413df4fa0d9b2";
    testApp1.explorer = "63e144632ba413df4fa0d9c4";
    testApp1.status = Status.REJECTED;

    // Create spy for getTrip
    let tripSpy = jasmine.createSpyObj('TripService', ['getTrip', 'getTripApplications']);
    getTripSpy = tripSpy.getTrip.and.returnValue(of(testTrip));
    getTripApplicationsSpy = tripSpy.getTripApplications.and.returnValue(of([testApp1, testApp2]));

    // Create spy for getActor
    let actorSpy = jasmine.createSpyObj('AuthService', ['getCurrentActor']);
    getActorSpy = actorSpy.getCurrentActor.and.returnValue((testActor));

    await TestBed.configureTestingModule({
      declarations: [ TripApplicationsComponent ],
      imports: [
        AngularFireModule.initializeApp(environment.firebaseConfig),
        HttpClientModule
      ],
      providers: [
        { provide: ActivatedRoute, useValue: mockactivatedRoute },
        { provide: TripService, useValue: tripSpy },
        { provide: AuthService, useValue: actorSpy },
        AngularFireAuth,
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TripApplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have two applications', () => {
    expect(component.applications.length === 2).toBeTrue();
  });

  it('should be two applications in the table', () => {
    fixture.detectChanges();
    let appRows = fixture.nativeElement.querySelectorAll('.applicationTableRow');

    expect(appRows.length === 2).toBeTrue();
  });

  it('should show not found message if there\'s no application', () => {
    component.applications = [];
    fixture.detectChanges();
    let notFoundDiv = fixture.nativeElement.querySelector('#applicationsNotFound');
    expect(notFoundDiv).not.toBeNull();
  });

});
