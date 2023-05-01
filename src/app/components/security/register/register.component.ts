import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MessageType } from 'src/app/enums/MessageEnum';
import { Role } from 'src/app/enums/RoleEnum';
import { Actor } from 'src/app/models/actor';
import { AuthService } from 'src/app/services/auth.service';
import { MessageService } from 'src/app/services/message.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registrationForm: FormGroup;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private messageService: MessageService
  ) {
    this.registrationForm = this.fb.group({
      name: [''],
      surname: [''],
      email: [''],
      password: [''],
      phone: [''],
      address: ['']
    });
  }

  onRegister() {
    let newUser = new Actor();
    newUser = { ...this.registrationForm.value, role: Role.EXPLORER };
    this.authService.registerUser(newUser)
      .then(res => {
        let successMsg = $localize `Registration successful, navigate to login page`
        this.messageService.notifyMessage(successMsg, MessageType.SUCCESS);
      })
      .catch(error => {
        let errorMsg = $localize `Something wrong occurred...`;
        if (error.status === 422) {
          errorMsg = $localize `There are some errors in the data introduced`;
        }
        this.messageService.notifyMessage(errorMsg, MessageType.DANGER);
      });
  }

  ngOnInit(): void {
  }

}
