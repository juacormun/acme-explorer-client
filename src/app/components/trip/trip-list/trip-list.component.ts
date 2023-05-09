import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Role } from 'src/app/enums/RoleEnum';
import { Actor } from 'src/app/models/actor';
import { Picture } from 'src/app/models/picture';
import { Trip } from 'src/app/models/trip';
import { AuthService } from 'src/app/services/auth.service';
import { TripService } from 'src/app/services/trip.service';
import * as objectHash from 'object-hash';

@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.scss']
})
export class TripListComponent implements OnInit {

  trips: Trip[];
  actor: Actor;
  activeRole: string;

  constructor(
    private tripService: TripService,
    private authService: AuthService,
    private router: Router
  ) {
    this.trips = [];
    this.actor = new Actor();
    this.activeRole = Role.ANONYMOUS;
  }

  ngOnInit(): void {
    this.actor = this.authService.getCurrentActor();
    this.activeRole = this.actor?.role || Role.ANONYMOUS;

    const query = {};
    const expirationDate = new Date().getTime() + (1 * 1000 * 60 * 60);
    const queryId = objectHash.sha1(query);
    const cachedTrips = this.tripService.getCachedTrips(queryId);
    if (cachedTrips) {
      this.trips = cachedTrips;
      return;
    } else {
      this.tripService.searchTrips(query).subscribe((data: any) => {
        this.trips = data;
        this.tripService.saveResultInCache(queryId, { trips: this.trips, expirationDate });
      });
    }
  }

  searchTrips(form: NgForm) {
    const query = form.value;
    const cacheTime: number = form.value.cacheTime && form.value.cacheTime > 0 && form.value.cacheTime <= 24 ?
      form.value.cacheTime : 1;
    const expirationDate = new Date().getTime() + (cacheTime * 1000 * 60 * 60);
    const queryId = objectHash.sha1(query);
    const cachedTrips = this.tripService.getCachedTrips(queryId);
    const maxResults = form.value.maxResults && form.value.maxResults > 0 && form.value.maxResults <= 100 ?
      form.value.maxResults : 10;

    if (cachedTrips) {
      this.trips = cachedTrips;
      return;
    } else {
      this.tripService.searchTrips(query).subscribe((data: any) => {
        if (data.length > maxResults) {
          data = data.slice(0, maxResults);
        }
        this.trips = data;
        this.tripService.saveResultInCache(queryId, { trips: this.trips, expirationDate });
      });
    }
  }

  getTripMainPicture(trip: Trip): Picture {
    return trip.pictures?.length > 0 ? trip.pictures[0] : new Picture()
  }

  displayTrip(trip: Trip) {
    this.router.navigate(['/trips', trip._id]);
  }

  isAboutToStart(trip: Trip) {
    const start = new Date(trip.startDate);
    const now = new Date();
    const timeDiff = start.getTime() - now.getTime();
    const dayDiff = timeDiff / (1000 * 3600 * 24);
    return start > now && dayDiff < 7;
  }

  isNotAvailable(trip: Trip) {
    const start = new Date(trip.startDate);
    const now = new Date();
    return start < now || trip.cancellationDate;
  }

}
