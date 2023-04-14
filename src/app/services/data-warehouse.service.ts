import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DataWarehouse } from '../models/data-warehouse';

@Injectable({
  providedIn: 'root'
})
export class DataWarehouseService {
  private dashboardUrl = environment.backendApiBaseUrl + '/api/v2/dashboard';

  constructor(private http: HttpClient) { }

  getIndicators() {
    const url = `${this.dashboardUrl}/latest`;
    return this.http.get<DataWarehouse[]>(url);
  }
}
