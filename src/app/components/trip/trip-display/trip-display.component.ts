import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Role } from 'src/app/enums/RoleEnum';
import { Actor } from 'src/app/models/actor';
import { Picture } from 'src/app/models/picture';
import { Sponsorship } from 'src/app/models/sponsorship';
import { Trip } from 'src/app/models/trip';
import { AuthService } from 'src/app/services/auth.service';
import { MessageService } from 'src/app/services/message.service';
import { TripService } from 'src/app/services/trip.service';
import { endDateAfterStartDate, isFuture } from 'src/app/validators/dates.validator';

@Component({
  selector: 'app-trip-display',
  templateUrl: './trip-display.component.html',
  styleUrls: ['./trip-display.component.scss'],
})
export class TripDisplayComponent implements OnInit {

  id: string;
  trip: Trip;
  sponsorship: any;
  actor: Actor;

  infoForm: FormGroup;
  infoFormSubmitted = false;
  infoFormIsEditable = false;

  hasExpired: boolean = false;
  isCancelled: boolean = false;
  isAboutToStart: boolean = false;

  constructor(
    private tripService: TripService,
    private authService: AuthService,
    private fb: FormBuilder,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.id = '0';
    this.trip = new Trip();
    this.actor = new Actor();

    this.infoForm = this.fb.group({
      _id: [{ value:'', disabled: true }],
      creator: [{ value:'', disabled: true }],
      stages: [{ value:'', disabled: true }],
      pictures: [{ value:'', disabled: true }],
      price: [{ value:'', disabled: true }],
      title: [{ value:'', disabled: true }, Validators.compose([Validators.required, Validators.maxLength(100)])],
      description: [{ value:'', disabled: true }, Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(255)])],
      requirements: [{ value:'', disabled: true }, Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(255)])],
      startDate: [{ value:'', disabled: true }, Validators.compose([Validators.required, isFuture])],
      endDate: [{ value:'', disabled: true }, Validators.compose([Validators.required, isFuture])],
    },
    { validators: endDateAfterStartDate });
  }

  ngOnInit(): void {
    this.actor = this.authService.getCurrentActor();
    this.initializeInfoForm();
  }

  initializeInfoForm() {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.id = id;

      this.tripService.getTrip(this.id).subscribe((trip) => {
        this.trip = trip;
        this.resetInfoForm();

        this.hasExpired = this.setHasExpired();
        this.isCancelled = trip.cancellationDate != null;
        this.isAboutToStart = this.setIsAboutToStart();
        this.sponsorship = this.getRandomSponsorship();
      })
    }
  }

  resetInfoForm() {
    this.infoFormSubmitted = false;
    this.infoForm.controls['_id'].setValue(this.trip._id);
    this.infoForm.controls['creator'].setValue(this.trip.creator);
    this.infoForm.controls['title'].setValue(this.trip.title);
    this.infoForm.controls['description'].setValue(this.trip.description);
    this.infoForm.controls['requirements'].setValue(this.trip.requirements);
    this.infoForm.controls['startDate'].setValue(this.trip.startDate);
    this.infoForm.controls['endDate'].setValue(this.trip.endDate);
    this.infoForm.controls['stages'].setValue(this.trip.stages);
    this.infoForm.controls['pictures'].setValue(this.trip.pictures);
    this.infoForm.controls['price'].setValue(this.trip.price);
  }

  toggleEditInfo() {
    this.infoFormIsEditable = !this.infoFormIsEditable;
    if (this.infoFormIsEditable) {
      this.title?.enable();
      this.description?.enable();
      this.requirements?.enable();
      this.startDate?.enable();
      this.endDate?.enable();
    } else {
      this.title?.disable();
      this.description?.disable();
      this.requirements?.disable();
      this.startDate?.disable();
      this.endDate?.disable();
    }
    this.resetInfoForm();
  }

  onInfoFormSubmit() {
    this.infoFormSubmitted = true;

    console.log('Send trip with this data: ', this.infoForm.value);

    // this.tripService.createTrip(this.infoForm.value)
    //   .then((trip: Trip) => {
    //     let successMsg = $localize `Trip created successfully, complete its info and publish`
    //     this.messageService.notifyMessage(successMsg, MessageType.SUCCESS);
    //     this.router.navigate(['/trips', trip._id]);
    //   })
    //   .catch(error => {
    //     let errorMsg = $localize `Something wrong occurred...`;
    //     if (error.status === 422) {
    //       errorMsg = $localize `There are some errors in the data introduced`;
    //     }
    //     this.messageService.notifyMessage(errorMsg, MessageType.DANGER);
    //   });
  }

  get _id() { return this.infoForm.get('id'); }
  get creator() { return this.infoForm.get('creator'); }
  get title() { return this.infoForm.get('title'); }
  get description() { return this.infoForm.get('description'); }
  get requirements() { return this.infoForm.get('requirements'); }
  get startDate() { return this.infoForm.get('startDate'); }
  get endDate() { return this.infoForm.get('endDate'); }
  get stages() { return this.infoForm.get('stages'); }
  get pictures() { return this.infoForm.get('pictures'); }
  get price() { return this.infoForm.get('price'); }

  goBack(): void {
    this.router.navigate(['/trips']);
  }

  getRandomSponsorship(): Sponsorship | null {
    const paidSponsorships = this.trip.sponsorships?.filter(sponsorship => sponsorship.paidAt);
    return paidSponsorships?.length > 0 ? paidSponsorships[Math.floor(Math.random() * paidSponsorships.length)] : null;
  }

  canDisplayActions(): boolean {
    return this.actor && this.actor.role === Role.MANAGER && this.actor._id === this.trip.creator;
  }

  displayTripApplications(trip: Trip) {
    this.router.navigate(['/trips', trip._id, 'applications']);
  }

  setHasExpired() {
    const start = new Date(this.trip.startDate);
    const now = new Date();
    return start < now;
  }

  setIsAboutToStart() {
    const start = new Date(this.trip.startDate);
    const now = new Date();
    const timeDiff = start.getTime() - now.getTime();
    const dayDiff = timeDiff / (1000 * 3600 * 24);
    return start > now && dayDiff < 7;
  }

  getTripStartTime() {
    const date = new Date(this.trip.startDate);
    return date.getTime();
  }

}
