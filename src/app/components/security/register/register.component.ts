import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Role } from 'src/app/enums/RoleEnum';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registrationForm: FormGroup;
  roleList : string[];
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private authService: AuthService,
    private fb: FormBuilder) {
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
        console.log(res);
        this.errorMessage = '';
        this.successMessage = 'Registration successful, navitage to login page';
      })
      .catch(error => {
        if (error.status === 422) {
          this.errorMessage = 'There are some errors in the data introduced';
        }
        this.successMessage = '';
      });
  }

  ngOnInit(): void {
  }

}
