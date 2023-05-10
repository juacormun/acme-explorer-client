import { Status } from "../enums/StatusEnum";
import { Entity } from "./entity.model";

export class Application extends Entity {
  private _explorer: string;
  private _trip: string;
  private _status: Status;
  private _cancellationDate!: Date;
  private _rejectionReason!: string;
  private _paidAt!: Date;
  private _comments: string;

  constructor () {
    super();
    this._explorer = '';
    this._trip = '';
    this._status = Status.PENDING;
    this._comments = '';
  }

  public get explorer(): string {
    return this._explorer;
  }
  public set explorer(value: string) {
    this._explorer = value;
  }

  public get trip(): string {
    return this._trip;
  }
  public set trip(value: string) {
    this._trip = value;
  }

  public get status(): Status {
    return this._status;
  }
  public set status(value: Status) {
    this._status = value;
  }

  public get cancellationDate(): Date {
    return this._cancellationDate;
  }
  public set cancellationDate(value: Date) {
    this._cancellationDate = value;
  }

  public get rejectionReason(): string {
    return this._rejectionReason;
  }
  public set rejectionReason(value: string) {
    this._rejectionReason = value;
  }

  public get paidAt(): Date {
    return this._paidAt;
  }
  public set paidAt(value: Date) {
    this._paidAt = value;
  }

  public get comments(): string {
    return this._comments;
  }
  public set comments(value: string) {
    this._comments = value;
  }

}
