export class Stage {
  private _id: string;
  private _title: string;
  private _description: string;
  private _price: number;

  constructor() {
    this._id = '';
    this._title = '';
    this._description = '';
    this._price = 0;
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

  get price(): number {
    return this._price;
  }

  set price(value: number) {
    this._price = value;
  }
}
