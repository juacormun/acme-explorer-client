import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageType } from 'src/app/enums/MessageEnum';
import { Role } from 'src/app/enums/RoleEnum';
import { Actor } from 'src/app/models/actor';
import { FormValidation } from 'src/app/models/form-validation';
import { ActorService } from 'src/app/services/actor.service';
import { AuthService } from 'src/app/services/auth.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, FormValidation {

  actor: Actor;

  isEditable = false;

  profileForm: FormGroup;
  formSubmitted = false;

  constructor(
    private actorService: ActorService,
    private authService: AuthService,
    private messageService: MessageService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.profileForm = this.fb.group({
      _id: [''],
      name: [{ value:'', disabled: true }, Validators.required],
      surname: [{ value:'', disabled: true }, Validators.required],
      email: [''],
      password: [''],
      phone: [{ value:'', disabled: true }],
      address: [{ value:'', disabled: true }],
      language: [{ value:'', disabled: true }, Validators.required],
      role: [Role.EXPLORER]
    });
    this.actor = new Actor();
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  isFormValid() {
    return this.formSubmitted || !this.profileForm?.dirty;
  }

  getRoleName(role: Role) {
    return this.actorService.getRoleName(role);
  }

  toggleEdit() {
    this.isEditable = !this.isEditable;
    if (this.isEditable) {
      this.name?.enable();
      this.surname?.enable();
      this.phone?.enable();
      this.address?.enable();
      this.language?.enable();
    } else {
      this.name?.disable();
      this.surname?.disable();
      this.phone?.disable();
      this.address?.disable();
      this.language?.disable();
    }
    this.resetForm();
  }

  onSubmit() {
    this.formSubmitted = true;
    const newActor = this.profileForm.value;

    this.actorService.updateActor(newActor)
    .then((actor: Actor) => {
      const successMsg = $localize `Profile updated correctly`;
      this.messageService.notifyMessage(successMsg, MessageType.SUCCESS);
      localStorage.setItem('locale', actor.language);
      location.reload();
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/profile']);
      });
    })
    .catch(_ => {
      const errorMsg = $localize `An error has occurred`;
      this.messageService.notifyMessage(errorMsg, MessageType.DANGER);
    });
  }

  initializeForm() {
    const currentActor = this.authService.getCurrentActor();
    if (currentActor) {
      const id = currentActor._id;

      if (!this.actor._id) {
        this.resetForm();
      } else {
        this.actorService.getActor(id).subscribe((actor) => {
          this.actor = actor;
          this.resetForm();
        });
      }
    }
  }

  resetForm() {
    this.formSubmitted = false;
    this.profileForm.controls['_id'].setValue(this.actor._id);
    this.profileForm.controls['name'].setValue(this.actor.name);
    this.profileForm.controls['surname'].setValue(this.actor.surname);
    this.profileForm.controls['password'].setValue(this.actor.password);
    this.profileForm.controls['email'].setValue(this.actor.email);
    this.profileForm.controls['phone'].setValue(this.actor.phone);
    this.profileForm.controls['address'].setValue(this.actor.address);
    this.profileForm.controls['language'].setValue(this.actor.language);
    this.profileForm.controls['role'].setValue(this.actor.role);
  }

  get _id() { return this.profileForm.get('id'); }
  get name() { return this.profileForm.get('name'); }
  get surname() { return this.profileForm.get('surname'); }
  get password() { return this.profileForm.get('password'); }
  get email() { return this.profileForm.get('email'); }
  get phone() { return this.profileForm.get('phone'); }
  get address() { return this.profileForm.get('address'); }
  get language() { return this.profileForm.get('language'); }
  get role() { return this.profileForm.get('role'); }

}
