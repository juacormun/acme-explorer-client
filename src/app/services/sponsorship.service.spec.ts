import { TestBed } from '@angular/core/testing';

import { SponsorshipService } from './sponsorship.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { AngularFireAuth } from '@angular/fire/compat/auth';

describe('SponsorshipService', () => {
  let service: SponsorshipService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebaseConfig),
        HttpClientModule
      ],
      providers: [
        AngularFireAuth
      ]
    });
    service = TestBed.inject(SponsorshipService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
