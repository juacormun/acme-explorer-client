import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MessageType } from 'src/app/enums/MessageEnum';
import { Role } from 'src/app/enums/RoleEnum';
import { AuthService } from 'src/app/services/auth.service';
import { MessageService } from 'src/app/services/message.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registrationForm: FormGroup;
  roleList : string[];

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private messageService: MessageService
  ) {
    this.roleList = this.authService.getRoles();
    // Delete ANONYMOUS role from the list, as it is not allowed to register as ANONYMOUS
    this.roleList.splice(this.roleList.indexOf(Role.ANONYMOUS), 1);
    this.registrationForm = this.fb.group({
      name: [''],
      surname: [''],
      email: [''],
      password: [''],
      phone: [''],
      address: [''],
      role: [Role.EXPLORER]
    });
  }

  onRegister() {
    this.authService.registerUser(this.registrationForm.value)
      .then(res => {
        this.messageService.notifyMessage('Registration successful, navitage to login page', MessageType.SUCCESS);
      })
      .catch(error => {
        let errorMsg = 'Something wrong occurred...';
        if (error.status === 422) {
          errorMsg = 'There are some errors in the data introduced';
        }
        this.messageService.notifyMessage(errorMsg, MessageType.DANGER);
      });
  }

  ngOnInit(): void {
  }

}
