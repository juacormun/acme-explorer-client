import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { Application } from '../models/application';
import { ApplicationsByStatus } from '../models/applications-by-status';
import { Status } from '../enums/StatusEnum';
import { firstValueFrom } from 'rxjs';

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

  createApplication(explorerId: string, tripId: string, comments?: string) {
    const url = this.applicationsUrl;
    const headers = this.authService.getHeaders();
    const body = comments ? { explorer: explorerId, trip: tripId, comments: comments } : { explorer: explorerId, trip: tripId };
    return this.http.post<Application>(url, body, { headers: headers });
  }

  cancelApplication(applicationId: string) {
    const url = `${this.applicationsUrl}/${applicationId}/cancel`;
    const headers = this.authService.getHeaders();
    return this.http.patch<Application>(url, "", { headers: headers });
  }

  payApplication(applicationId: string) {
    const url = `${this.applicationsUrl}/${applicationId}/pay`;
    const headers = this.authService.getHeaders();
    return this.http.patch<Application>(url, "", { headers: headers });
  }

  acceptApplication(application: Application) {
    const url = `${this.applicationsUrl}/${application._id}/accept`;
    const headers = this.authService.getHeaders();

    return new Promise<Application>((resolve, reject) => {
      firstValueFrom(this.http.patch<Application>(url, {}, { headers: headers } ))
        .then(updatedApplication => {
          resolve(updatedApplication);
        })
        .catch(error => {
          reject(error);
        })
    });
  }

  rejectApplication(application: Application, rejectionReason: string) {
    const url = `${this.applicationsUrl}/${application._id}/reject`;
    const headers = this.authService.getHeaders();

    return new Promise<Application>((resolve, reject) => {
      firstValueFrom(this.http.patch<Application>(url, { rejectionReason }, { headers: headers } ))
        .then(updatedApplication => {
          resolve(updatedApplication);
        })
        .catch(error => {
          reject(error);
        })
    });
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
