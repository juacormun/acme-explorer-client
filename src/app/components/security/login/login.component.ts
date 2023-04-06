import { User } from './../../../models/user';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/services/message.service';
import { MessageType } from 'src/app/enums/MessageEnum';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private messageService: MessageService) { }

  ngOnInit(): void {
  }

  onLogin(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.authService.login(email, password).then((user: User) => {
      form.reset();
      this.router.navigate(['/']);
    }).catch(({ error }) => {
      this.messageService.notifyMessage(error.message, MessageType.DANGER);
    });
  }

}
