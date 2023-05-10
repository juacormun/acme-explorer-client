import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageType } from 'src/app/enums/MessageEnum';
import { Trip } from 'src/app/models/trip';
import { MessageService } from 'src/app/services/message.service';
import { TripService } from 'src/app/services/trip.service';

@Component({
  selector: 'app-stage-create',
  templateUrl: './stage-create.component.html',
  styleUrls: ['./stage-create.component.scss']
})
export class StageCreateComponent implements OnInit {

  @Input() trip: Trip = new Trip();

  stageCreationForm: FormGroup;
  formSubmitted = false;
  formError = '';

  @ViewChild('closeModalButton') closeModalButton!: ElementRef

  constructor(
    private tripService: TripService,
    private messageService: MessageService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.stageCreationForm = this.fb.group({
      title: ['', Validators.compose([Validators.required, Validators.maxLength(100)])],
      description: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(255)])],
      price: ['', Validators.compose([Validators.required, Validators.min(0.1)])],
      updateTotalPrice: [false]
    });
  }

  isFormValid() {
    return this.formSubmitted || !this.stageCreationForm?.dirty;
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.formSubmitted = true;

    const stage = {
      title: this.title?.value,
      description: this.description?.value,
      price: this.price?.value
    }
    const newStages = [ ...this.trip.stages, stage ];

    let newTrip = {
      ...this.trip,
      stages: newStages,
      price: this.updateTotalPrice?.value ? 0: this.trip.price
    };

    this.tripService.updateTrip(newTrip as Trip)
      .then((trip: Trip) => {
        this.formError = '';
        this.closeModalButton.nativeElement.click();

        let successMsg = $localize `New stage added successfully`
        this.messageService.notifyMessage(successMsg, MessageType.SUCCESS);
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/trips', trip._id]);
        });
      })
      .catch(error => {
        let errorMsg = $localize `Something wrong occurred...`;
        if (error.status === 422) {
          errorMsg = $localize `There are some errors in the data introduced`;
        }
        this.formError = errorMsg;
      });
  }

  get title() { return this.stageCreationForm.get('title'); }
  get description() { return this.stageCreationForm.get('description'); }
  get price() { return this.stageCreationForm.get('price'); }
  get updateTotalPrice() { return this.stageCreationForm.get('updateTotalPrice'); }

  closeError() {
    this.formError = '';
  }

}
