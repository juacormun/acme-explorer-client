import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageType } from 'src/app/enums/MessageEnum';
import { FormValidation } from 'src/app/models/form-validation';
import { Trip } from 'src/app/models/trip';
import { MessageService } from 'src/app/services/message.service';
import { TripService } from 'src/app/services/trip.service';
import { endDateAfterStartDate, isFuture } from 'src/app/validators/dates.validator';

@Component({
  selector: 'app-trip-create',
  templateUrl: './trip-create.component.html',
  styleUrls: ['./trip-create.component.scss']
})
export class TripCreateComponent implements OnInit, FormValidation {

  creationForm: FormGroup;
  formSubmitted = false;

  constructor(
    private tripService: TripService,
    private fb: FormBuilder,
    private messageService: MessageService,
    private router: Router
  ) {
    this.creationForm = this.fb.group({
      title: ['', Validators.compose([Validators.required, Validators.maxLength(100)])],
      description: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(255)])],
      requirements: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(255)])],
      startDate: ['', Validators.compose([Validators.required, isFuture])],
      endDate: ['', Validators.compose([Validators.required, isFuture])],
    },
    { validators: endDateAfterStartDate });
  }

  isFormValid() {
    return this.formSubmitted || !this.creationForm?.dirty;
  }

  onSubmit() {
    this.formSubmitted = true;

    this.tripService.createTrip(this.creationForm.value)
      .then((trip: Trip) => {
        let successMsg = $localize `Trip created successfully, complete its info and publish`
        this.messageService.notifyMessage(successMsg, MessageType.SUCCESS);
        this.router.navigate(['/trips', trip._id]);
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

  get title() { return this.creationForm.get('title'); }
  get description() { return this.creationForm.get('description'); }
  get requirements() { return this.creationForm.get('requirements'); }
  get startDate() { return this.creationForm.get('startDate'); }
  get endDate() { return this.creationForm.get('endDate'); }

}
