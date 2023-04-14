import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripDisplayComponent } from './trip-display.component';
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
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

describe('TripDisplayComponent', () => {
  let component: TripDisplayComponent;
  let fixture: ComponentFixture<TripDisplayComponent>;
  let mockactivatedRoute: ActivatedRouteStub;
  let testTrip: Trip;
  let testActor: Actor;
  let getTripSpy: any;
  let getActorSpy: any;

  beforeEach(async () => {
    mockactivatedRoute = new ActivatedRouteStub();
    mockactivatedRoute.testParams = { id: "63e144632ba413df4fa0d9b2" };

    // Create mock Trip
    testTrip = new Trip();
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

    // Create spy for getTrip
    let tripSpy = jasmine.createSpyObj('TripService', ['getTrip']);
    getTripSpy = tripSpy.getTrip.and.returnValue(of(testTrip));

    // Create spy for getActor
    let actorSpy = jasmine.createSpyObj('AuthService', ['getCurrentActor']);
    getActorSpy = actorSpy.getCurrentActor.and.returnValue((testActor));

    await TestBed.configureTestingModule({
      declarations: [ TripDisplayComponent ],
      imports: [AngularFireModule.initializeApp(environment.firebaseConfig), HttpClientModule],
      providers: [
        { provide: ActivatedRoute, useValue: mockactivatedRoute },
        { provide: TripService, useValue: tripSpy },
        { provide: AuthService, useValue: actorSpy },
        AngularFireAuth,
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TripDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct id', () => {
    expect(component.id).toBe("63e144632ba413df4fa0d9b2");
  });

  it('should load trip correctly', () => {
    expect(component.trip).not.toBeUndefined();
  });

  it('should have correct trip title', () => {
    fixture.detectChanges();
    expect(component.trip.title).toBe("Test Trip");
  });

  it('should not show stages section', () => {
    let stagesSection = fixture.nativeElement.querySelector('#stagesAccordion');
    fixture.detectChanges();
    expect(stagesSection).toBeNull();
  });

  it('should display trip actions', () => {
    let actions = fixture.nativeElement.querySelector('#tripActions');
    fixture.detectChanges();
    expect(actions).not.toBeNull();
  });

  it('should return true', () => {
    fixture.detectChanges();
    expect(component.canDisplayActions()).toBeTrue();
  });


});
