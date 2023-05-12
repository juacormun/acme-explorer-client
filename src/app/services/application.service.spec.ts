import { TestBed } from '@angular/core/testing';

import { ApplicationService } from './application.service';
import { AngularFireModule } from '@angular/fire/compat';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from './auth.service';
import { Actor } from '../models/actor';
import { Application } from '../models/application';

describe('ApplicationService', () => {
  let service: ApplicationService;
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
    service = TestBed.inject(ApplicationService);
    authService = TestBed.inject(AuthService);

    actor = await authService.login('pepardo@email.com', 'pass1234');
  });

  afterEach(async () => {
    await authService.logout();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should not create the application, trip has started', (done) => {
    const now = new Date();
    const explorerId = actor._id;
    const expiredTripId = '63f38bf93ff6b85445a656af';
    const comments = `Test comments - ${now.getDate()}`

    service.createApplication(explorerId, expiredTripId, comments).subscribe({
      error: (response: HttpErrorResponse) => {
        const { message } = response.error;
        expect(message).toBe('Trip has already started');
        done();
      }
    });
  });

  it('should create the application or return confilct in case it exists', (done) => {
    const now = new Date();
    const explorerId = actor._id;
    const futureTripId = '63f38c8febcc5d77c3637ba6';
    const comments = `Test comments - ${now.getDate()}`

    service.createApplication(explorerId, futureTripId, comments).subscribe({
      next: (response: Application) => {
        expect(response.explorer).toBe(explorerId);
        done();
      },
      error: (error: HttpErrorResponse) => {
        expect(error.status).toBe(409);
        done();

      }
    });
  });

});
