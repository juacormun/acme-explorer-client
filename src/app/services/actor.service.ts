import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Actor } from '../models/actor';
import { AuthService } from './auth.service';
import { Role } from '../enums/RoleEnum';
import { firstValueFrom } from 'rxjs';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class ActorService {

  private actorsUrl = `${environment.backendApiBaseUrl}/v2/actors`;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getActors() {
    const url = this.actorsUrl;
    const headers = this.authService.getHeaders();
    return this.http.get<Actor[]>(url, { headers: headers } );
  }

  getActor(id: string) {
    const url = `${this.actorsUrl}/${id}`;
    const headers = this.authService.getHeaders();
    return this.http.get<Actor>(url, { headers: headers } );
  }

  updateActor(actor: Actor) {
    const url = `${this.actorsUrl}/${actor._id}`;
    const headers = this.authService.getHeaders();

    const newActor = {
      _id: actor._id,
      name: actor.name,
      surname: actor.surname,
      password: actor.password,
      email: actor.email,
      phone: actor.phone,
      address: actor.address,
      role: actor.role
    };

    return new Promise<Actor>((resolve, reject) => {
      firstValueFrom(this.http.put<Actor>(url, newActor, { headers: headers } ))
        .then(updatedActor => {
          resolve(updatedActor);
        })
        .catch(_ => {
          reject(new Actor());
        })
    });
  }

  getRoleName(role: Role) {
    switch (role) {
      case Role.EXPLORER:
        return $localize `Explorer`;
      case Role.SPONSOR:
        return $localize `Sponsor`;
      case Role.MANAGER:
        return $localize `Manager`;
      case Role.ADMINISTRATOR:
        return $localize `Administrator`;
      default:
        return $localize `Anonymous`;
    }
  }

}
