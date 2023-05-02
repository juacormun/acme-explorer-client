import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageType } from 'src/app/enums/MessageEnum';
import { Role } from 'src/app/enums/RoleEnum';
import { Actor } from 'src/app/models/actor';
import { ActorService } from 'src/app/services/actor.service';
import { AuthService } from 'src/app/services/auth.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-actor-display',
  templateUrl: './actor-display.component.html',
  styleUrls: ['./actor-display.component.scss']
})
export class ActorDisplayComponent implements OnInit {

  id: string;
  actor: Actor;
  currentActor: Actor;

  roleList : Role[];

  constructor(
    private actorService: ActorService,
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.id = '0';
    this.actor = new Actor();
    this.currentActor = new Actor();
    this.roleList = Object.values(Role);
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.actorService.getActor(this.id).subscribe((actor) => {
      this.actor = actor;
      this.roleList = this.roleList.filter(r => r !== Role.ANONYMOUS && r !== actor.role);
    })
    this.currentActor = this.authService.getCurrentActor();
  }

  goBack(): void {
    this.router.navigate(['/actors']);
  }

  canDisplayActions(): boolean {
    return this.currentActor._id !== this.actor._id && this.actor.role !== Role.ADMINISTRATOR;
  }

  getRoleName(role: Role) {
    return this.actorService.getRoleName(role);
  }

  onSubmit(form: NgForm) {
    let newActor = structuredClone(this.actor);
    newActor.role = form.value.role;

    this.actorService.updateActor(newActor)
      .then((actor: Actor) => {
        const successMsg = $localize `Role changed successfully`;
        this.messageService.notifyMessage(successMsg, MessageType.SUCCESS);
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/actors', actor._id]);
        });
      })
      .catch(_ => {
        const errorMsg = $localize `An error has occurred`;
        this.messageService.notifyMessage(errorMsg, MessageType.DANGER);
      });
  }

}
