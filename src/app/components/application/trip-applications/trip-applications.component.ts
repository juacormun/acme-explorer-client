import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { Actor } from 'src/app/models/actor';
import { Application } from 'src/app/models/application';
import { Trip } from 'src/app/models/trip';
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
  actor: Actor;

  @ViewChild('applicationsTable') table: any;

  sorts = [
    { prop: 'explorer', dir: 'desc' },
    { prop: 'status', dir: 'desc' },
    { prop: 'cancellationDate', dir: 'desc' },
    { prop: 'cancellationReason', dir: 'desc' },
  ];

  loadingIndicator = true;
  reorderable = true;
  ColumnMode = ColumnMode;

  constructor(
    private tripService: TripService,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {
    this.id = '0';
    this.trip = new Trip();
    this.applications = [];
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

  toggleExpandRow(row: Application) {
    this.table.rowDetail.toggleExpandRow(row);
  }

}
