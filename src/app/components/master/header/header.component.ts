import { User } from './../../../models/user';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user: User = new User();

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.authService.getCurrentUser()
      .then((user: User) => {
        if (!user) {
          console.log('No session found, redirecting to login...')
          this.router.navigate(['/login'])
        }
        this.user = user;
      })
      .catch(error => {
        console.log(error);
        this.router.navigate(['/login']);
      });
  }

}
