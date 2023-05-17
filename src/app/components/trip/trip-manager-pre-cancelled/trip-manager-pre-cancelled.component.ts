import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from 'src/app/enums/RoleEnum';
import { Actor } from 'src/app/models/actor';
import { Trip } from 'src/app/models/trip';
import { AuthService } from 'src/app/services/auth.service';
import { TripService } from 'src/app/services/trip.service';
import { addMinutes, daysBetween } from 'src/app/utils/file.utils';


@Component({
  selector: 'app-trip-manager-pre-cancelled',
  templateUrl: './trip-manager-pre-cancelled.component.html',
  styleUrls: ['./trip-manager-pre-cancelled.component.scss']
})
export class TripManagerPreCancelledComponent implements OnInit {

  trips: Trip[];
  actor: Actor;

  constructor(
    private tripService: TripService,
    private authService: AuthService,
    private router: Router
  ) {
    this.trips = [];
    this.actor = new Actor();
  }

  ngOnInit(): void {
    const preCancelledTrips = this.tripService.getPreCancelledTrips();
    if (preCancelledTrips) {
      this.trips = preCancelledTrips;
    }
    this.actor = this.authService.getCurrentActor();
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

  cancelAllTrips() {
    for (const trip of this.trips) {
      if (this.canBeCancelled(trip)) {
        const cancellationMsg = $localize`Cancelled by the system in batch`;
        this.tripService.cancelTrip(trip, cancellationMsg);
      }
    }
    localStorage.removeItem('preCancelledTrips');
    location.reload();
  }

  canBeCancelled(trip: Trip): boolean {
    const isCreator = this.actor && this.actor.role === Role.MANAGER && this.actor._id === trip.creator;
    const daysTilStart = daysBetween(new Date(trip.startDate), new Date());

    return isCreator && trip.publicationDate && !trip.cancellationDate && daysTilStart > 6;
  }

}
