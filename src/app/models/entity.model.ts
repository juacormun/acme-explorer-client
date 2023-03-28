export class Entity {

    public _id: string;
    public _version: number;
    private _createdAt!: Date;
    private _updatedAt!: Date;

    constructor() {
        this._id = '0';
        this._version = 0;
    }

    public get id(): string {
        return this._id;
    }
    public get version(): number {
        return this._version;
    }

    public set id(id: string) {
        this._id = id;
    }

    public get createdAt(): Date {
        return this._createdAt;
    }

    public get updatedAt(): Date {
        return this._updatedAt;
    }
}
