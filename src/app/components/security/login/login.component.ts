import { User } from './../../../models/user';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.authService.getCurrentUser()
      .then((user: User) => {
        if (user) {
          console.log('User is already logged in, redirecting to home page...')
          this.router.navigate(['/']);
        }
      })
      .catch(error => {
        console.log('Error retrieving user info');
      });
  }

  onLogin(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.authService.login(email, password).then((user: User) => {
      form.reset();
      this.router.navigate(['/']);
    }).catch(({ error }) => {
      this.errorMessage = error.message;
    });
  }

}
