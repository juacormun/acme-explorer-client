import { Actor } from './../models/actor';
import { User } from './../models/user';
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

  it('should register a user', async () => {
    let r = (Math.random() + 1).toString(36).substring(2);
    let actor = {
      name: 'test' + r,
      surname: 'test' + r,
      email: r + '@test.com',
      password: '12345678',
      role: Role.EXPLORER
    } as Actor;
    await service.registerUser(actor).then((res) => {
      expect(res.user.email).toBe(actor.email);
    })
  })

  it('should not register a user', async () => {
    let actor = {
      name: 'test',
      surname: 'test',
      email: email,
      password: '12345678',
      role: Role.EXPLORER
    } as Actor;

    await service.registerUser(actor).catch((error: { status: number; }) => {
      expect(error.status).toBe(500);
    })
  })

  it('should get the roles', () => {
    expect(service.getRoles()).toEqual(Object.values(Role))
  })

  it('should login correctly', async () => {
    const res = await service.login(email, '12345678');
    expect(res.email).toBe(email);
  })

  it('should not login correctly', async () => {
    await service.login(email, '123456789').catch((error: { status: number; }) => {
      expect(error.status).toBe(401);
    })
  })

  it ('should logout correctly', async () => {
    await service.login(email, '12345678');
    const res = await service.logout();
    expect(res).toEqual('Logout successful');
  })

  it ('should set the user', () => {
    const user = {
      email: email,
      token: '12345678'
    } as User;
    service.setCurrentUser(user)
    expect(localStorage.getItem('currentUser')).toEqual(JSON.stringify(user));
  })

  it ('should get the current user', async () => {
    const user = {
      email: email,
      token: '12345678'
    } as User;
    service.setCurrentUser(user)
    const expected = JSON.parse(JSON.stringify(user));
    expect(service.getCurrentUser()).toEqual(expected);
  })

  it ('should not get the current user', async () => {
    localStorage.removeItem('currentUser');
    expect(service.getCurrentUser()).toBeNull();
  })

});
