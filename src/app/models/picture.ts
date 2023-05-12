export class Picture {
  private __id: string;
  private _title: string;
  private _image: string;

  constructor() {
    this.__id = '';
    this._title = 'Default Image';
    this._image = '../../assets/images/default-trip.jpg';
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

  get image(): string {
    return this._image;
  }

  set image(value: string) {
    this._image = value;
  }
}
