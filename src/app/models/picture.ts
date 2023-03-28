export class Picture {
  private _id: string;
  private _title: string;
  private _image: string;

  constructor() {
    this._id = '';
    this._title = 'Default Image';
    this._image = '../../assets/images/default-trip.jpg';
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

  get image(): string {
    return this._image;
  }

  set image(value: string) {
    this._image = value;
  }
}
