import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Role } from 'src/app/enums/RoleEnum';
import { Actor } from 'src/app/models/actor';
import { Picture } from 'src/app/models/picture';
import { Trip } from 'src/app/models/trip';
import { AuthService } from 'src/app/services/auth.service';
import { TripService } from 'src/app/services/trip.service';

@Component({
  selector: 'app-trip-display',
  templateUrl: './trip-display.component.html',
  styleUrls: ['./trip-display.component.scss']
})
export class TripDisplayComponent implements OnInit {

  id: string;
  trip: Trip;
  actor: Actor;

  constructor(
    private tripService: TripService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.id = '0';
    this.trip = new Trip();
    this.actor = new Actor();
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.tripService.getTrip(this.id).subscribe((trip) => {
      this.trip = trip;
    })
    this.actor = this.authService.getCurrentActor();
  }

  goBack(): void {
    this.router.navigate(['/trips']);
  }

  getMainPicture(): Picture {
    return this.trip.pictures?.length > 0 ? this.trip.pictures[0] : new Picture()
  }

  canDisplayActions(): boolean {
    return this.actor && this.actor.role === Role.MANAGER && this.actor._id === this.trip.creator;
  }

}
