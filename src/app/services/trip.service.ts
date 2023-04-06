import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Trip } from '../models/trip';

@Injectable({
  providedIn: 'root'
})
export class TripService {

  private tripsUrl = `${environment.backendApiBaseUrl}/v2/trips`;

  constructor(private http: HttpClient) { }

  searchTrips() {
    //TODO: filtros de búsqueda y token para finder
    return this.http.get<Trip[]>(environment.backendApiBaseUrl + '/v2/search');
  }

  getTrip(id: string) {
    const url = `${this.tripsUrl}/${id}`;
    return this.http.get<Trip>(url);
  }
}
