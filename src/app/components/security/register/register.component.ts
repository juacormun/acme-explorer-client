import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageType } from 'src/app/enums/MessageEnum';
import { Role } from 'src/app/enums/RoleEnum';
import { Actor } from 'src/app/models/actor';
import { FormValidation } from 'src/app/models/form-validation';
import { AuthService } from 'src/app/services/auth.service';
import { MessageService } from 'src/app/services/message.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, FormValidation {

  registrationForm: FormGroup;
  formSubmitted = false;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private messageService: MessageService
  ) {
    this.registrationForm = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required],
      phone: [''],
      address: ['']
    });
  }

  isFormValid() {
    return this.formSubmitted || !this.registrationForm?.dirty;
  }

  onRegister() {
    this.formSubmitted = true;

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

  get name() { return this.registrationForm.get('name'); }
  get surname() { return this.registrationForm.get('surname'); }
  get password() { return this.registrationForm.get('password'); }
  get email() { return this.registrationForm.get('email'); }
  get phone() { return this.registrationForm.get('phone'); }
  get address() { return this.registrationForm.get('address'); }

}
