import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Trip } from '../models/trip';
import { AuthService } from './auth.service';
import { Application } from '../models/application';

@Injectable({
  providedIn: 'root'
})
export class TripService {

  private tripsUrl = `${environment.backendApiBaseUrl}/v2/trips`;
  private applicationsUrl = `${environment.backendApiBaseUrl}/v2/applications`;

  constructor(private http: HttpClient, private authService: AuthService) { }

  searchTrips(query: any) {
    let finder = {};
    if (query.keyword) {
      finder = { keyword: query.keyword };
    }
    if (query.minPrice) {
      finder = { ...finder, minPrice: query.minPrice };
    }
    if (query.maxPrice) {
      finder = { ...finder, maxPrice: query.maxPrice };
    }
    if (query.minDate) {
      finder = { ...finder, minDate: query.minDate };
    }
    if (query.maxDate) {
      finder = { ...finder, maxDate: query.maxDate };
    }
    const url = environment.backendApiBaseUrl + '/v2/search';
    const headers = this.authService.getHeaders();
    return this.http.get<Trip[]>(url, { headers: headers, params: finder });
  }

  getTrip(id: string) {
    const url = `${this.tripsUrl}/${id}`;
    const headers = this.authService.getHeaders();
    return this.http.get<Trip>(url, { headers: headers });
  }

  getTrips() {
    const url = this.tripsUrl;
    const headers = this.authService.getHeaders();
    return this.http.get<Trip[]>(url, { headers: headers });
  }

  getTripApplications(id: string) {
    const url = `${this.tripsUrl}/${id}/applications`;
    const headers = this.authService.getHeaders();
    return this.http.get<Application[]>(url, { headers: headers });
  }

  createApplication(explorerId: string, tripId: string, comments?: string) {
    const url = this.applicationsUrl;
    const headers = this.authService.getHeaders();
    const body = comments ? { explorer: explorerId, trip: tripId, comments: comments } : { explorer: explorerId, trip: tripId };
    console.log(body)
    return this.http.post<Application>(url, body, { headers: headers });
  }
}
