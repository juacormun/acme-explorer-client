import { User } from './../../../models/user';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user: User = new User();

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getCurrentUser()
      .then((user: User) => {
        if (user) {
          this.user = user;
        }
      })
      .catch(error => {
        console.log('Error retrieving user info');
      });
  }

  logOut(): void {
    this.authService.logout()
      .then(_ => {
        console.log('User logout completed');
        this.user = new User();
      })
      .catch(err => {
        console.log('Error while logout');
      });
  }

  userNotLogged(): boolean {
    return !this.user.email;
  }

}
