import { MessageService } from './message.service';
import { Injectable } from '@angular/core';
import { Actor } from '../models/actor';
import { Role } from "../enums/RoleEnum";
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { environment } from '../../environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { MessageType } from '../enums/MessageEnum';
import { CookieService } from 'ngx-cookie-service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginStatus = new Subject<Boolean>();

  constructor(
    private fireAuth: AngularFireAuth,
    private http: HttpClient,
    private messageService: MessageService,
    private cookieService: CookieService
  ) { }

  registerUser(actor: Actor) {
    const url = environment.backendApiBaseUrl + '/v2/actors';
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return new Promise<any>((resolve, reject) => {
      this.http.post<Actor>(url, actor).toPromise()
        .then(res => {
          if (res) {
            this.fireAuth.createUserWithEmailAndPassword(actor.email, actor.password)
              .then(_ => {
                console.log('Registration completed successfully');
                resolve(_)
              })
              .catch(error => {
                console.log(error);
                reject(error);
              });
          } else {
            reject({ error: { message: 'Problem while registering new user' } });
          }
        }, error => {
          reject(error);
        })
        .catch(error => {
          console.log(error);
          reject(error);
        });
    });
  }

  getRoles(): string[] {
    return Object.values(Role);
  }

  login(email: string, password: string) {
    const url = environment.backendApiBaseUrl + '/v2/login';
    const body = { email, password }
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return new Promise<any>((resolve, reject) => {
      this.http.post<Actor>(url, body).toPromise()
        .then(actor => {
          if (actor) {
            this.fireAuth.signInWithCustomToken(actor.customToken)
            .then(userCredentials => {
              userCredentials.user?.getIdToken()
                .then((token: string) => {
                  this.setCurrentActor(actor, token);
                  this.loginStatus.next(true);
                  const { password, ...actorData } = actor;
                  resolve(actorData);
                })
                .catch(error => {
                  reject({ error: { message: 'No token retrieved' } });
                })
            })
            .catch(error => {
              console.log(error);
              reject(error);
            });
          } else {
            reject({ error: { message: 'Problem while login' } });
          }
        }, error => {
          reject(error);
        })
        .catch(error => {
          console.log(error);
          reject(error);
        });
    });
  }

  logout() {
    return new Promise<any>((resolve, reject) => {
      this.fireAuth.signOut()
        .then(_ => {
          this.setCurrentActor();
          this.loginStatus.next(false);
          resolve('Logout successful');
        }).catch(error => {
          reject(error);
        });
    });
  }

  setCurrentActor(actor?: Actor, token?: any) {
    if (actor) {
      localStorage.setItem('currentActor', JSON.stringify({
        id: actor.id,
        name: actor.name,
        surname: actor.surname,
        role: actor.role,
        language: actor.language
      }));
      if (token) {
        this.cookieService.set('currentToken', token);
      }
    } else {
      localStorage.removeItem('currentActor');
      this.cookieService.delete('currentToken');
    }
  }

  getStatus(): Observable<Boolean> {
    return this.loginStatus.asObservable();
  }

  getCurrentActor(): Actor {
    let result = null;
    const currentActor = localStorage.getItem('currentActor');
    if (currentActor) {
      result = JSON.parse(currentActor)
    } else {
      let message = $localize `User not found`;
      this.messageService.notifyMessage(message, MessageType.DANGER);
      result = new Actor();
    }
    return result;
  }

  checkRole(roles: Role[]): boolean {
    let result = false;
    const currentActor = this.getCurrentActor();
    if (currentActor) {
      result = roles.includes(currentActor.role);
    } else {
      result = roles.includes(Role.ANONYMOUS);
    }
    return result;
  }

  getHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    const actor = this.getCurrentActor();
    if (actor) {
      const token = this.cookieService.get('currentToken')
      headers = headers.append('idtoken', token);
    }
    return headers;
  }

}
