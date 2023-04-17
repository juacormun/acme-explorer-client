import { ApplicationService } from './../../../services/application.service';
import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Status } from 'src/app/enums/StatusEnum';
import { Actor } from 'src/app/models/actor';
import { ApplicationsByStatus } from 'src/app/models/applications-by-status';

@Component({
  selector: 'app-explorer-applications',
  templateUrl: './explorer-applications.component.html',
  styleUrls: ['./explorer-applications.component.scss']
})
export class ExplorerApplicationsComponent implements OnInit {

  actor: Actor;
  applicationsByStatus: ApplicationsByStatus[];

  constructor(private authService: AuthService, private applicationService: ApplicationService) {
    this.actor = new Actor();
    this.applicationsByStatus = [];
  }

  ngOnInit(): void {
    this.actor = this.authService.getCurrentActor();
    this.applicationService.getApplicationsByStatus().subscribe(appsByStatus => {
      this.applicationsByStatus = appsByStatus;
    })
  }

  getStatusName(st: Status) {
    return this.applicationService.getStatusName(st);
  }

}
