import { Actor } from './../../../models/actor';
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

  protected currentActor: Actor;
  protected activeRole: string = Role.ANONYMOUS;

  constructor(private authService: AuthService, private messageService: MessageService) {
    this.currentActor = this.authService.getCurrentActor();
    this.activeRole = this.currentActor.role;
  }

  ngOnInit(): void {
    const defaultDark = window.matchMedia('(prefers-color-scheme: dark)');
    const theme = localStorage.getItem('theme');
    const body = document.querySelector('body');
    const switchThemeIcon = document.querySelector('#switchThemeIcon');
    if (theme) {
      body?.setAttribute('data-bs-theme', theme);
      if (theme === 'dark') {
        switchThemeIcon?.classList.replace('fa-moon', 'fa-sun');
      }
    } else if (defaultDark.matches) {
      body?.setAttribute('data-bs-theme', 'dark');
      switchThemeIcon?.classList.replace('fa-moon', 'fa-sun');
    } else {
      body?.setAttribute('data-bs-theme', 'light');
    }

    this.authService.getStatus().subscribe(loggedIn => {
      if (loggedIn) {
        this.currentActor = this.authService.getCurrentActor();
        this.activeRole = this.currentActor.role;
      } else {
        this.activeRole = Role.ANONYMOUS;
        this.currentActor = new Actor();
      }
    })
  }

  isLoggedIn() {
    return this.activeRole !== Role.ANONYMOUS;
  }

  changeLanguage(lan: string): void {
    localStorage.setItem('locale', lan);
    location.reload();
  }

  switchTheme(): void {
    const body = document.querySelector('body');
    const switchThemeIcon = document.querySelector('#switchThemeIcon');
    body?.getAttribute('data-bs-theme') === 'light' ?
      (
        body?.setAttribute('data-bs-theme', 'dark'),
        switchThemeIcon?.classList.replace('fa-moon', 'fa-sun'),
        localStorage.setItem('theme', 'dark')
      ) :
      (
        body?.setAttribute('data-bs-theme', 'light'),
        switchThemeIcon?.classList.replace('fa-sun', 'fa-moon'),
        localStorage.setItem('theme', 'light')
      );
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
