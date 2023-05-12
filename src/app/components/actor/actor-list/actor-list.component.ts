import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from 'src/app/enums/RoleEnum';
import { Actor } from 'src/app/models/actor';
import { ActorService } from 'src/app/services/actor.service';

@Component({
  selector: 'app-actor-list',
  templateUrl: './actor-list.component.html',
  styleUrls: ['./actor-list.component.scss']
})
export class ActorListComponent implements OnInit {

  actors: Actor[];

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
