import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageType } from 'src/app/enums/MessageEnum';
import { Role } from 'src/app/enums/RoleEnum';
import { Actor } from 'src/app/models/actor';
import { Picture } from 'src/app/models/picture';
import { Sponsorship } from 'src/app/models/sponsorship';
import { Trip } from 'src/app/models/trip';
import { ApplicationService } from 'src/app/services/application.service';
import { AuthService } from 'src/app/services/auth.service';
import { MessageService } from 'src/app/services/message.service';
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
    private applicationService: ApplicationService,
    private authService: AuthService,
    private messageService: MessageService,
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

  applyToTrip(applicationForm: NgForm) {
    this.applicationService.createApplication(this.actor._id, this.trip._id, applicationForm.value.comments)
      .subscribe({
        next: (application) => {
          this.router.navigate(['/applications']);
          let message = $localize`Your application has been successfully created`;
          this.messageService.notifyMessage(message, MessageType.SUCCESS);
        },
        error: (err) => {
          if (err.status === 409) {
            let message = $localize`You have already applied to this trip`;
            this.messageService.notifyMessage(message, MessageType.INFO);
          } else {
            let message = $localize`An error has occurred while applying to this trip`;
            this.messageService.notifyMessage(message, MessageType.DANGER);
          }
        }
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
