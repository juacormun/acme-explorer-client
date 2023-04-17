import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { ApplicationsByStatus } from '../models/applications-by-status';
import { Status } from '../enums/StatusEnum';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  private applicationsUrl = `${environment.backendApiBaseUrl}/v2/applications`;

  constructor(private http: HttpClient, private authService: AuthService) { }

  getApplicationsByStatus() {
    const url = `${this.applicationsUrl}`;
    const headers = this.authService.getHeaders();
    return this.http.get<ApplicationsByStatus[]>(url, { headers: headers } );
  }

  getStatusName(st: Status) {
    switch (st) {
      case Status.PENDING:
        return $localize `Pending`;
      case Status.DUE:
        return $localize `Due`;
      case Status.ACCEPTED:
        return $localize `Accepted`;
      case Status.REJECTED:
        return $localize `Rejected`;
      case Status.CANCELLED:
        return $localize `Cancelled`;
    }
  }
}
