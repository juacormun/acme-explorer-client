export class Stage {
  private __id: string;
  private _title: string;
  private _description: string;
  private _price: number;

  constructor() {
    this.__id = '';
    this._title = '';
    this._description = '';
    this._price = 0;
  }

  get _id(): string {
    return this.__id;
  }

  set _id(value: string) {
    this.__id = value;
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
