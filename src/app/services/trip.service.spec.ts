import { TestBed } from '@angular/core/testing';

import { TripService } from './trip.service';
import { AngularFireModule } from '@angular/fire/compat';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from './auth.service';
import { Actor } from '../models/actor';
import { Trip } from '../models/trip';

describe('TripService', () => {
  let service: TripService;
  let authService: AuthService;
  let actor: Actor;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebaseConfig),
        HttpClientModule
      ],
      providers: [
        AuthService,
        AngularFireAuth
      ]
    });
    service = TestBed.inject(TripService);
    authService = TestBed.inject(AuthService);

    actor = await authService.login('keo2@email.com', 'pass1234');
  });

  afterEach(async () => {
    await authService.logout();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should not create the trip, dates are past', async () => {
    let trip = {
      title: 'Test trip',
      description: 'Jungle party',
      requirements: 'Test requirements',
      price: 1000,
      startDate: new Date('2023-07-01'),
      endDate: new Date('2023-02-06')
    } as Trip;
    await service.createTrip(trip)
    .catch((error: HttpErrorResponse) => {
      expect(error.status).toBe(422);
    });
  });

  it('should create the trip', async () => {
    let trip = {
      title: 'Test trip',
      description: 'Jungle party',
      requirements: 'Test requirements',
      price: 1000,
      startDate: new Date('2023-07-01'),
      endDate: new Date('2023-07-06')
    } as Trip;
    await service.createTrip(trip).then((trip: Trip) => {
      expect(trip.description).toBe('Jungle party');
    })
  });

});
