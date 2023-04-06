import { Actor } from './../../../models/actor';
import { User } from './../../../models/user';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Role } from 'src/app/enums/RoleEnum';
import { MessageType } from 'src/app/enums/MessageEnum';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  protected currentActor: Actor | undefined;
  protected activeRole: string = Role.ANONYMOUS;

  constructor(private authService: AuthService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.authService.getStatus().subscribe(loggedIn => {
      if (loggedIn) {
        this.currentActor = this.authService.getCurrentActor();
        this.activeRole = this.currentActor.role;
      } else {
        this.activeRole = Role.ANONYMOUS;
        this.currentActor = undefined;
      }
    })
  }

  changeLanguage(lan: string): void {

  }

  logOut(): void {
    this.authService.logout()
      .then(_ => {
        this.messageService.notifyMessage('User logout completed', MessageType.SUCCESS);
      })
      .catch(err => {
        this.messageService.notifyMessage('Error while logout', MessageType.DANGER);
      });
  }

}
