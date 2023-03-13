export class Ban {

  private _date: Date;
  private _reason: string;

  constructor() {
    this._reason = '';
    this._date = new Date();
  }

  public get reason(): string {
    return this._reason;
  }
  public get date(): Date {
    return this._date;
  }

  public set reason(reason: string) {
    this._reason = reason;
  }
  public set date(date: Date) {
    this._date = date;
  }

}
