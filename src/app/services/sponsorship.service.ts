import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Sponsorship } from '../models/sponsorship';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SponsorshipService {

  private sponsorshipsUrl = `${environment.backendApiBaseUrl}/v2/sponsorships`;

  constructor(private http: HttpClient, private authService: AuthService) { }

  getSponsorships() {
    const url = `${this.sponsorshipsUrl}`;
    const headers = this.authService.getHeaders();
    return this.http.get<Sponsorship[]>(url, { headers: headers });
  }

  getSponsorship(id: string) {
    const url = `${this.sponsorshipsUrl}/${id}`;
    return this.http.get<Sponsorship>(url);
  }
}
