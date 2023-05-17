import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageType } from 'src/app/enums/MessageEnum';
import { Trip } from 'src/app/models/trip';
import { ApplicationService } from 'src/app/services/application.service';
import { MessageService } from 'src/app/services/message.service';
import { TripService } from 'src/app/services/trip.service';

@Component({
  selector: 'app-trip-cancel',
  templateUrl: './trip-cancel.component.html',
  styleUrls: ['./trip-cancel.component.scss']
})
export class TripCancelComponent implements OnInit {

  @Input() trip: Trip = new Trip();

  tripCancellationForm: FormGroup;
  formSubmitted = false;
  formError = '';

  @ViewChild('closeModalButton') closeModalButton!: ElementRef

  constructor(
    private tripService: TripService,
    private messageService: MessageService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.tripCancellationForm = this.fb.group({
      reason: ['', Validators.compose([Validators.required, Validators.minLength(25), Validators.maxLength(255)])]
    });
  }

  isFormValid() {
    return this.formSubmitted || !this.tripCancellationForm?.dirty;
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.formSubmitted = true;

    this.tripService.cancelTrip(this.trip, this.reason?.value)
      .then((trip: Trip) => {
        this.formError = '';
        this.closeModalButton.nativeElement.click();

        const preCancelledTrips = this.tripService.getPreCancelledTrips();
        if (preCancelledTrips) {
          if (preCancelledTrips.length > 1) {
            const index = preCancelledTrips.findIndex((t: Trip) => t._id === trip._id);
            if (index !== -1) {
              preCancelledTrips.splice(index, 1);
              localStorage.setItem('preCancelledTrips', JSON.stringify(preCancelledTrips));
            }
          } else {
            localStorage.removeItem('preCancelledTrips');
          }
          location.reload();
        }

        let successMsg = $localize`Trip cancelled successfully`
        this.messageService.notifyMessage(successMsg, MessageType.SUCCESS);
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/trips', trip._id]);
        });
      })
      .catch(error => {
        let errorMsg = $localize`Something wrong occurred...`;
        if (error.status === 422) {
          errorMsg = $localize`There are paid applications for this trip, it can't be cancelled`;
        }
        this.formError = errorMsg;
      });
  }

  get reason() { return this.tripCancellationForm.get('reason'); }

  closeError() {
    this.formError = '';
  }

}
