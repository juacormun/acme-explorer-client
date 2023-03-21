import { Actor } from './../models/actor';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { environment } from './../../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { Role } from '../enums/RoleEnum';
import { FirebaseError } from 'firebase/app';

describe('AuthService', () => {
  let service: AuthService;

  const email = 'test@test.com';

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
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login a correct user', () => {
    expect(service.getRoles()).toEqual(Object.values(Role))
  })

  it('should login correctly', async () => {
    const res = await service.login(email, '12345678');
    expect(res.user.email).toBe(email);
  })

  it('should not register a user', async () => {
    let actor = new Actor();
    actor.name = 'test';
    actor.surname = 'test';
    actor.email = email;
    actor.password = '12345678';
    // await expectAsync(service.registerUser(actor))
    //   .toBeRejectedWithError(new FirebaseError())
  })

});
