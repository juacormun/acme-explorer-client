import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { Status } from 'src/app/enums/StatusEnum';
import { Actor } from 'src/app/models/actor';
import { Application } from 'src/app/models/application';
import { Trip } from 'src/app/models/trip';
import { ApplicationService } from 'src/app/services/application.service';
import { AuthService } from 'src/app/services/auth.service';
import { TripService } from 'src/app/services/trip.service';

@Component({
  selector: 'app-trip-applications',
  templateUrl: './trip-applications.component.html',
  styleUrls: ['./trip-applications.component.scss']
})
export class TripApplicationsComponent implements OnInit {

  id: string;
  trip: Trip;
  applications: Application[];
  selectedApplication: Application;
  actor: Actor;

  constructor(
    private tripService: TripService,
    private applicationService: ApplicationService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.id = '0';
    this.trip = new Trip();
    this.applications = [];
    this.selectedApplication = new Application();
    this.actor = new Actor();
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.tripService.getTrip(this.id).subscribe(trip => {
      this.trip = trip;
    })
    this.tripService.getTripApplications(this.id).subscribe(apps => {
      this.applications = apps;
    });
    this.actor = this.authService.getCurrentActor();
  }

  goBack(): void {
    this.router.navigate(['/trips', this.trip._id]);
  }

  getStatusName(st: Status) {
    return this.applicationService.getStatusName(st);
  }

  showApplicationDetails(app: Application) {
    this.selectedApplication = app;
  }

}
