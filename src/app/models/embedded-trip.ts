export class EmbeddedTrip {
  private _id: string;
  private _title: string;
  private _description: string;
  private _ticker: string;

  constructor() {
    this._id = '';
    this._title = '';
    this._description = '';
    this._ticker = '';
  }

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  get ticker(): string {
    return this._ticker;
  }

  set ticker(value: string) {
    this._ticker = value;
  }
}
