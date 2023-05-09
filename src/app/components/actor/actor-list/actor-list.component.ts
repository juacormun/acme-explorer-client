import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { Role } from 'src/app/enums/RoleEnum';
import { Status } from 'src/app/enums/StatusEnum';
import { Actor } from 'src/app/models/actor';
import { ActorService } from 'src/app/services/actor.service';
import { ApplicationService } from 'src/app/services/application.service';

@Component({
  selector: 'app-actor-list',
  templateUrl: './actor-list.component.html',
  styleUrls: ['./actor-list.component.scss']
})
export class ActorListComponent implements OnInit {

  actors: Actor[];

  @ViewChild('actorsTable') table: any;

  sorts = [
    { prop: 'Name', dir: 'desc' },
    { prop: 'Surname', dir: 'desc' },
    { prop: 'Email', dir: 'desc' },
    { prop: 'Role', dir: 'desc' },
  ];

  loadingIndicator = true;
  reorderable = true;
  ColumnMode = ColumnMode;

  constructor(
    private actorService: ActorService,
    private router: Router
  ) {
    this.actors = [];
  }

  ngOnInit(): void {
    this.actorService.getActors().subscribe(actors => {
      this.actors = actors;
    });
  }

  getRoleName(role: Role) {
    return this.actorService.getRoleName(role);
  }

  displayActor(actor: Actor) {
    this.router.navigate(['/actors', actor._id]);
  }

}
