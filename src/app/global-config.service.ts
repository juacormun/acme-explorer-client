import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './services/auth.service';
import { environment } from 'src/environments/environment';
import { GlobalConfig } from './models/global-config';

@Injectable({
  providedIn: 'root'
})
export class GlobalConfigService {

  private configUrl = `${environment.backendApiBaseUrl}/v2/config`;

  constructor(private http: HttpClient, private authService: AuthService) { }

  getConfig() {
    const url = this.configUrl;
    const headers = this.authService.getHeaders();
    const res = this.http.get<GlobalConfig[]>(url, { headers: headers });
    console.log(res);
    return res;
  }

  updateConfig(config: GlobalConfig) {
    const url = this.configUrl;
    const headers = this.authService.getHeaders();
    return this.http.put<GlobalConfig>(url, config, { headers: headers });
  }
}
