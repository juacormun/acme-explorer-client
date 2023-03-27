import { Actor } from './../../../models/actor';
import { User } from './../../../models/user';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Role } from 'src/app/enums/RoleEnum';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  protected currentActor: Actor | undefined;
  protected activeRole: string = Role.ANONYMOUS;

  constructor(private authService: AuthService) { }

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

  logOut(): void {
    this.authService.logout()
      .then(_ => {
        console.log('User logout completed');
      })
      .catch(err => {
        console.log('Error while logout');
      });
  }

}
