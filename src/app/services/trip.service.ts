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

  getCachedTrips(queryId: string): Trip[] | undefined {
    const cachedTrips = localStorage.getItem(queryId);
    if (cachedTrips) {
      const parsedTrips = JSON.parse(cachedTrips) as any;
      const now = new Date().getTime();

      if (now < parsedTrips.expirationDate) {
        this.saveResultInCache(queryId, parsedTrips);
        return parsedTrips.trips;
      } else {
        localStorage.removeItem(queryId);
      }
    }
    return undefined;
  }

  saveResultInCache(queryId: any, finderResult: any) {
    localStorage.setItem(queryId, JSON.stringify(finderResult));
    this.clearExpiredCache();
  }

  clearExpiredCache() {
    const now = new Date().getTime();
    Object.keys(localStorage).forEach((key) => {
      const cachedTrips = localStorage.getItem(key);
      if (cachedTrips) {
        try {
          const parsedTrips = JSON.parse(cachedTrips) as any;
          if (now > parsedTrips.expirationDate) {
            localStorage.removeItem(key);
          }
        } catch (error) {
          // console.log(cachedTrips);
        }
      }
    });
  }

  getTripApplications(id: string) {
    const url = `${this.tripsUrl}/${id}/applications`;
    const headers = this.authService.getHeaders();
    return this.http.get<Application[]>(url, { headers: headers });
  }
}
