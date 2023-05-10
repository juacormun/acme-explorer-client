export class GlobalConfig {
  private _defaultLanguage: string;
  private _cacheLifetime: number;
  private _numResults: number;
  private _sponsorshipFlatRate: number;
  private _dataWhRefresh : number;

  constructor() {
    this._defaultLanguage = 'en';
    this._cacheLifetime = 3600;
    this._numResults = 10;
    this._sponsorshipFlatRate = 100;
    this._dataWhRefresh = 60;
  }

  get defaultLanguage(): string {
    return this._defaultLanguage;
  }

  set defaultLanguage(value: string) {
    this._defaultLanguage = value;
  }

  get cacheLifetime(): number {
    return this._cacheLifetime;
  }

  set cacheLifetime(value: number) {
    this._cacheLifetime = value;
  }

  get numResults(): number {
    return this._numResults;
  }

  set numResults(value: number) {
    this._numResults = value;
  }

  get sponsorshipFlatRate(): number {
    return this._sponsorshipFlatRate;
  }

  set sponsorshipFlatRate(value: number) {
    this._sponsorshipFlatRate = value;
  }

  get dataWhRefresh(): number {
    return this._dataWhRefresh;
  }

  set dataWhRefresh(value: number) {
    this._dataWhRefresh = value;
  }

}
