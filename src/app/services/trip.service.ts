import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Trip } from '../models/trip';

@Injectable({
  providedIn: 'root'
})
export class TripService {


  constructor(private http: HttpClient) { }

  searchTrips() {
    //TODO: filtros de búsqueda y token para finder
    return this.http.get<Trip[]>(environment.backendApiBaseUrl + '/v2/search');
  }
}
