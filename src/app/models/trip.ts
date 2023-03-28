import { Entity } from "./entity.model";
import { Picture } from "./picture";
import { Sponsorship } from "./sponsorship";
import { Stage } from "./stage";

export class Trip  extends Entity {

  private _creator: string;
  private _title: string;
  private _description: string;
  private _price!: number;
  private _requirements: string;
  private _startDate: Date;
  private _endDate: Date;
  private _publicationDate!: Date;
  private _cancellationDate!: Date;
  private _cancellationReason!: string;
  private _pictures!: Picture[];
  private _stages!: Stage[];
  private _sponsorships!: Sponsorship[];
  private _ticker!: string;

  constructor() {
    super();
    this._creator = '';
    this._title = '';
    this._description = '';
    this._requirements = '';
    this._startDate = new Date();
    this._endDate = new Date();
  }

  get creator(): string {
    return this._creator;
  }

  set creator(value: string) {
    this._creator = value;
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

  get requirements(): string {
    return this._requirements;
  }

  set requirements(value: string) {
    this._requirements = value;
  }

  get startDate(): Date {
    return this._startDate;
  }

  set startDate(value: Date) {
    this._startDate = value;
  }

  get endDate(): Date {
    return this._endDate;
  }

  set endDate(value: Date) {
    this._endDate = value;
  }

  get publicationDate(): Date {
    return this._publicationDate;
  }

  set publicationDate(value: Date) {
    this._publicationDate = value;
  }

  get cancellationDate(): Date {
    return this._cancellationDate;
  }

  set cancellationDate(value: Date) {
    this._cancellationDate = value;
  }

  get cancellationReason(): string {
    return this._cancellationReason;
  }

  set cancellationReason(value: string) {
    this._cancellationReason = value;
  }

  get pictures(): Picture[] {
    return this._pictures;
  }

  set pictures(value: Picture[]) {
    this._pictures = value;
  }

  get stages(): Stage[] {
    return this._stages;
  }

  set stages(value: Stage[]) {
    this._stages = value;
  }

  get sponsorships(): Sponsorship[] {
    return this._sponsorships;
  }

  set sponsorships(value: Sponsorship[]) {
    this._sponsorships = value;
  }

  get ticker(): string {
    return this._ticker;
  }

  set ticker(value: string) {
    this._ticker = value;
  }

  get mainPicture(): Picture {
    return this.pictures?.length > 0 ? this.pictures[0] : new Picture();
  }

}
