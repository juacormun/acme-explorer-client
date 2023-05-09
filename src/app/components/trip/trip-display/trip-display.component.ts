import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Role } from 'src/app/enums/RoleEnum';
import { Actor } from 'src/app/models/actor';
import { Picture } from 'src/app/models/picture';
import { Sponsorship } from 'src/app/models/sponsorship';
import { Trip } from 'src/app/models/trip';
import { AuthService } from 'src/app/services/auth.service';
import { TripService } from 'src/app/services/trip.service';

@Component({
  selector: 'app-trip-display',
  templateUrl: './trip-display.component.html',
  styleUrls: ['./trip-display.component.scss'],
})
export class TripDisplayComponent implements OnInit {

  id: string;
  trip: Trip;
  sponsorship: any;
  actor: Actor;

  hasExpired: boolean = false;
  isCancelled: boolean = false;
  isAboutToStart: boolean = false;

  constructor(
    private tripService: TripService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.id = '0';
    this.trip = new Trip();
    this.actor = new Actor();
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.tripService.getTrip(this.id).subscribe((trip) => {
      this.trip = trip;
      this.hasExpired = this.setHasExpired();
      this.isCancelled = trip.cancellationDate != null;
      this.isAboutToStart = this.setIsAboutToStart();
      this.sponsorship = this.getRandomSponsorship();
    })
    this.actor = this.authService.getCurrentActor();
  }

  goBack(): void {
    this.router.navigate(['/trips']);
  }

  getMainPicture(): Picture {
    return this.trip.pictures?.length > 0 ? this.trip.pictures[0] : new Picture()
  }

  getRandomSponsorship(): Sponsorship | null {
    const paidSponsorships = this.trip.sponsorships?.filter(sponsorship => sponsorship.paidAt);
    return paidSponsorships?.length > 0 ? paidSponsorships[Math.floor(Math.random() * paidSponsorships.length)] : null;
  }

  canDisplayActions(): boolean {
    return this.actor && this.actor.role === Role.MANAGER && this.actor._id === this.trip.creator;
  }

  canBeApplied(): boolean {
    return this.actor && this.actor.role === Role.EXPLORER && !this.hasExpired && !this.isCancelled;
  }

  displayTripApplications(trip: Trip) {
    this.router.navigate(['/trips', trip._id, 'applications']);
  }

  applyToTrip(trip: Trip, comments?: string) {
    this.tripService.createApplication(this.actor._id, trip._id, comments).subscribe((application) => {
      this.router.navigate(['/applications']);
    });
  }

  setHasExpired() {
    const start = new Date(this.trip.startDate);
    const now = new Date();
    return start < now;
  }

  setIsAboutToStart() {
    const start = new Date(this.trip.startDate);
    const now = new Date();
    const timeDiff = start.getTime() - now.getTime();
    const dayDiff = timeDiff / (1000 * 3600 * 24);
    return start > now && dayDiff < 7;
  }

  getTripStartTime() {
    const date = new Date(this.trip.startDate);
    return date.getTime();
  }

}
