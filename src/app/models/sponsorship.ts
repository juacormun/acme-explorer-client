import { EmbeddedTrip } from "./embedded-trip";

export class Sponsorship {
  public _id: string;
  private _banner: string;
  private _sponsor: string;
  private _link: string;
  private _financedAmount!: string;
  private _paidAt!: Date;
  private _trip!: EmbeddedTrip;

  constructor() {
    this._id = '';
    this._banner = '';
    this._sponsor = '';
    this._link = '';
  }

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get banner(): string {
    return this._banner;
  }

  set banner(value: string) {
    this._banner = value;
  }

  get sponsor(): string {
    return this._sponsor;
  }

  set sponsor(value: string) {
    this._sponsor = value;
  }

  get link(): string {
    return this._link;
  }

  set link(value: string) {
    this._link = value;
  }

  get financedAmount(): string {
    return this._financedAmount;
  }

  set financedAmount(value: string) {
    this._financedAmount = value;
  }

  get paidAt(): Date {
    return this._paidAt;
  }

  set paidAt(value: Date) {
    this._paidAt = value;
  }

  get trip(): EmbeddedTrip {
    return this._trip;
  }

  set trip(value: EmbeddedTrip) {
    this._trip = value;
  }
}
