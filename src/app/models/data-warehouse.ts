import { Entity } from "./entity.model";

export class DataWarehouse extends Entity {
  private _tripsManagedByManager!: [
    {
      averageTripsPerManager: number;
      minTripsPerManager: number;
      maxTripsPerManager: number;
      stdDevTripsPerManager: number;
    }
  ];
  private _applicationsPerTrip!: [
    {
      averageApplicationsPerTrip: number;
      minApplicationsPerTrip: number;
      maxApplicationsPerTrip: number;
      stdDevApplicationsPerTrip: number;
    }
  ];
  private _tripsPrice!: [
    {
      averagePrice: number;
      minPrice: number;
      maxPrice: number;
      stdDevPrice: number;
    }
  ];
  private _ratioOfApplicationsByStatus!: [
    {
      _id: string;
      numApplications: number;
    }
  ];
  private _averagePriceRange!: [
    {
      averageMinPrice: number;
      averageMaxPrice: number;
    }
  ];
  private _topSearchedKeywords!: [
    {
      _id: string;
      totalSearches: number;
    }
  ];
  private _computationMoment!: Date;
  private _rebuildPeriod!: string;

  constructor() {
    super();
  }

  public get tripsManagedByManager(): [
    {
      averageTripsPerManager: number;
      minTripsPerManager: number;
      maxTripsPerManager: number;
      stdDevTripsPerManager: number;
    }
  ] {
    return this._tripsManagedByManager;
  }
  public set tripsManagedByManager(
    value: [
      {
        averageTripsPerManager: number;
        minTripsPerManager: number;
        maxTripsPerManager: number;
        stdDevTripsPerManager: number;
      }
    ]
  ) {
    this._tripsManagedByManager = value;
  }

  public get applicationsPerTrip(): [
    {
      averageApplicationsPerTrip: number;
      minApplicationsPerTrip: number;
      maxApplicationsPerTrip: number;
      stdDevApplicationsPerTrip: number;
    }
  ] {
    return this._applicationsPerTrip;
  }
  public set applicationsPerTrip(
    value: [
      {
        averageApplicationsPerTrip: number;
        minApplicationsPerTrip: number;
        maxApplicationsPerTrip: number;
        stdDevApplicationsPerTrip: number;
      }
    ]
  ) {
    this._applicationsPerTrip = value;
  }

  public get tripsPrice(): [
    {
      averagePrice: number;
      minPrice: number;
      maxPrice: number;
      stdDevPrice: number;
    }
  ] {
    return this._tripsPrice;
  }
  public set tripsPrice(
    value: [
      {
        averagePrice: number;
        minPrice: number;
        maxPrice: number;
        stdDevPrice: number;
      }
    ]
  ) {
    this._tripsPrice = value;
  }

  public get ratioOfApplicationsByStatus(): [
    {
      _id: string;
      numApplications: number;
    }
  ] {
    return this._ratioOfApplicationsByStatus;
  }
  public set ratioOfApplicationsByStatus(
    value: [
      {
        _id: string;
        numApplications: number;
      }
    ]
  ) {
    this._ratioOfApplicationsByStatus = value;
  }

  public get averagePriceRange(): [
    {
      averageMinPrice: number;
      averageMaxPrice: number;
    }
  ] {
    return this._averagePriceRange;
  }
  public set averagePriceRange(
    value: [
      {
        averageMinPrice: number;
        averageMaxPrice: number;
      }
    ]
  ) {
    this._averagePriceRange = value;
  }

  public get topSearchedKeywords(): [
    {
      _id: string;
      totalSearches: number;
    }
  ] {
    return this._topSearchedKeywords;
  }
  public set topSearchedKeywords(
    value: [
      {
        _id: string;
        totalSearches: number;
      }
    ]
  ) {
    this._topSearchedKeywords = value;
  }

  public get computationMoment(): Date {
    return this._computationMoment;
  }
  public set computationMoment(value: Date) {
    this._computationMoment = value;
  }

  public get rebuildPeriod(): string {
    return this._rebuildPeriod;
  }
  public set rebuildPeriod(value: string) {
    this._rebuildPeriod = value;
  }
}
