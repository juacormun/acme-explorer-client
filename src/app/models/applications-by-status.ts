import { Status } from "../enums/StatusEnum";
import { Application } from "./application";

export class ApplicationsByStatus {
  private __id: Status;
  private _applications: Application[];

  constructor() {
    this.__id = Status.PENDING;
    this._applications = [];
  }

  public get _id(): Status {
    return this.__id;
  }
  public set _id(value: Status) {
    this.__id = value;
  }

  public get applications(): Application[] {
    return this._applications;
  }
  public set applications(value: Application[]) {
    this._applications = value;
  }
}
