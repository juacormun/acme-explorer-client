import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DataWarehouse } from '../models/data-warehouse';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataWarehouseService {
  private dashboardUrl = environment.backendApiBaseUrl + '/v2/dashboard';

  constructor(private http: HttpClient, private authService: AuthService) { }

  getIndicators() {
    const url = `${this.dashboardUrl}/latest`;
    const headers = this.authService.getHeaders();
    return this.http.get<DataWarehouse[]>(url, { headers: headers });
  }
}
