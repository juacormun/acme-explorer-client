export class User {
  public _email: string;
  public _token: string;

  constructor() {
    this._email = '';
    this._token = '';
  }

  public get email(): string {
    return this._email;
  }
  public get token(): string {
    return this._token;
  }

  public set email(email: string) {
    this._email = email;
  }
  public set token(token: string) {
    this._token = token;
  }
}
