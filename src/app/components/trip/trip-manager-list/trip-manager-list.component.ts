import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { Actor } from 'src/app/models/actor';
import { Trip } from 'src/app/models/trip';
import { AuthService } from 'src/app/services/auth.service';
import { TripService } from 'src/app/services/trip.service';

@Component({
  selector: 'app-trip-manager-list',
  templateUrl: './trip-manager-list.component.html',
  styleUrls: ['./trip-manager-list.component.scss']
})
export class TripManagerListComponent implements OnInit {

  trips: Trip[];
  actor: Actor;

  sorts = [
    { prop: 'ticker', dir: 'desc' },
    { prop: 'title', dir: 'desc' },
    { prop: 'startDate', dir: 'desc' },
    { prop: 'endDate', dir: 'desc' },
    { prop: 'price', dir: 'desc' }
  ];

  loadingIndicator = true;
  reorderable = true;
  ColumnMode = ColumnMode;

  constructor(
    private tripService: TripService,
    private authService: AuthService,
    private router: Router
  ) {
    this.trips = [];
    this.actor = new Actor();
  }

  ngOnInit(): void {
    this.tripService.getTrips().subscribe(trips => {
      this.trips = trips;
    });
    this.actor = this.authService.getCurrentActor();
  }

  displayTrip(trip: Trip) {
    this.router.navigate(['/trips', trip._id]);
  }

}
