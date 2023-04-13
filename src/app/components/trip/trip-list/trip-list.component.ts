import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Actor } from 'src/app/models/actor';
import { Picture } from 'src/app/models/picture';
import { Trip } from 'src/app/models/trip';
import { AuthService } from 'src/app/services/auth.service';
import { TripService } from 'src/app/services/trip.service';

@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.scss']
})
export class TripListComponent implements OnInit {

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
    const query = {};
    this.tripService.searchTrips(query).subscribe(trips => {
      this.trips = trips;
    });
    this.actor = this.authService.getCurrentActor();
  }

  searchTrips(form: NgForm) {
    const query = form.value;
    this.tripService.searchTrips(query).subscribe((data: any) => (this.trips = data));
  }

  getTripMainPicture(trip: Trip): Picture {
    return trip.pictures?.length > 0 ? trip.pictures[0] : new Picture()
  }

  displayTrip(trip: Trip) {
    this.router.navigate(['/trips', trip._id]);
  }

}
