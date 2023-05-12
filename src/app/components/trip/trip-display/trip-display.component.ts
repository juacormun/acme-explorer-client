import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageType } from 'src/app/enums/MessageEnum';
import { Role } from 'src/app/enums/RoleEnum';
import { Actor } from 'src/app/models/actor';
import { Sponsorship } from 'src/app/models/sponsorship';
import { Trip } from 'src/app/models/trip';
import { ApplicationService } from 'src/app/services/application.service';
import { AuthService } from 'src/app/services/auth.service';
import { MessageService } from 'src/app/services/message.service';
import { TripService } from 'src/app/services/trip.service';
import { addMinutes, daysBetween } from 'src/app/utils/file.utils';
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
    private applicationService: ApplicationService,
    private authService: AuthService,
    private fb: FormBuilder,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.id = '0';
    this.trip = new Trip();
    this.actor = new Actor();

    this.infoForm = this.fb.group({
      _id: ['', Validators.required],
      creator: ['', Validators.required],
      stages: ['', Validators.required],
      pictures: ['', Validators.required],
      price: [{ value:'', disabled: true }, Validators.compose([Validators.required, Validators.min(0)])],
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
    const locale = localStorage.getItem('locale') ?? 'en';
    this.infoFormSubmitted = false;
    this.infoForm.controls['_id'].setValue(this.trip._id);
    this.infoForm.controls['creator'].setValue(this.trip.creator);
    this.infoForm.controls['title'].setValue(this.trip.title);
    this.infoForm.controls['description'].setValue(this.trip.description);
    this.infoForm.controls['requirements'].setValue(this.trip.requirements);
    this.infoForm.controls['startDate'].setValue(formatDate(this.trip.startDate, 'yyyy-MM-dd', locale));
    this.infoForm.controls['endDate'].setValue(formatDate(this.trip.endDate, 'yyyy-MM-dd', locale));
    this.infoForm.controls['stages'].setValue(JSON.stringify(this.trip.stages));
    this.infoForm.controls['pictures'].setValue(JSON.stringify(this.trip.pictures));
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
      this.price?.enable();
    } else {
      this.title?.disable();
      this.description?.disable();
      this.requirements?.disable();
      this.startDate?.disable();
      this.endDate?.disable();
      this.price?.disable();
    }
    this.resetInfoForm();
  }

  onInfoFormSubmit() {
    this.infoFormSubmitted = true;

    let newTrip = {
      ...this.infoForm.value,
      price: this.price?.value,
      stages: JSON.parse(this.stages?.value),
      pictures: JSON.parse(this.pictures?.value),
    }
    this.tripService.updateTrip(newTrip)
      .then((trip: Trip) => {
        let successMsg = $localize `Trip updated successfully`
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
        this.messageService.notifyMessage(errorMsg, MessageType.DANGER);
      });
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

  canBeApplied(): boolean {
    return this.actor && this.actor.role === Role.EXPLORER && !this.hasExpired && !this.isCancelled;
  }

  canBePublished(): boolean {
    return this.trip.publicationDate === null;
  }

  canBeModified(): boolean {
    const isCreator = this.actor && this.actor.role === Role.MANAGER && this.actor._id === this.trip.creator;
    const daysTilStart = daysBetween(new Date(this.trip.startDate), new Date());

    return isCreator && !this.trip.publicationDate && daysTilStart > 9;
  }

  canBeCancelled(): boolean {
    const isCreator = this.actor && this.actor.role === Role.MANAGER && this.actor._id === this.trip.creator;
    const daysTilStart = daysBetween(new Date(this.trip.startDate), new Date());

    return isCreator && this.trip.publicationDate && !this.trip.cancellationDate && daysTilStart > 6;
  }

  goToTripApplications(trip: Trip) {
    this.router.navigate(['/trips', trip._id, 'applications']);
  }

  applyToTrip(applicationForm: NgForm) {
    this.applicationService.createApplication(this.actor._id, this.trip._id, applicationForm.value.comments)
      .subscribe({
        next: (application) => {
          this.router.navigate(['/applications']);
          let message = $localize`Your application has been successfully created`;
          this.messageService.notifyMessage(message, MessageType.SUCCESS);
        },
        error: (err) => {
          if (err.status === 409) {
            let message = $localize`You have already applied to this trip`;
            this.messageService.notifyMessage(message, MessageType.INFO);
          } else {
            let message = $localize`An error has occurred while applying to this trip`;
            this.messageService.notifyMessage(message, MessageType.DANGER);
          }
        }
      });
  }

  publishTrip() {
    const confirmMessage = $localize `Are you sure you want to publish this trip?`;
    const pubDate = addMinutes(new Date(), 5);
    if (confirm(confirmMessage)) {
      this.tripService.publishTrip(this.trip, pubDate)
      .then(trip => {
        const successMsg = $localize `Trip published successfully, it will appear in the main page after 5 minutes`;
        this.messageService.notifyMessage(successMsg, MessageType.SUCCESS)
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/trips', trip._id]);
        });
      })
      .catch(_ => {
        const errorMsg = $localize `An error ocurred while publishing the trip`;
        this.messageService.notifyMessage(errorMsg, MessageType.DANGER)
      })
    }
  }

  deleteTrip() {
    const trip = this.trip;
    const confirmMessage = $localize `Are you sure you want to delete this trip?`;
    if (confirm(confirmMessage)) {
      this.tripService.deleteTrip(this.trip)
      .then(_ => {
        const successMsg = $localize `Trip ${trip.ticker} deleted successfully`;
        this.messageService.notifyMessage(successMsg, MessageType.SUCCESS)
        this.router.navigate(['/mytrips']);
      })
      .catch(_ => {
        const errorMsg = $localize `An error ocurred while deleting the trip`;
        this.messageService.notifyMessage(errorMsg, MessageType.DANGER)
      })
    }
  }

  deleteStage(stageId: string) {
    let newStages = this.trip.stages.filter(s => s._id !== stageId);
    const newTrip = {
      ...this.trip,
      stages: newStages
    }
    this.tripService.updateTrip(newTrip as Trip)
      .then((trip: Trip) => {
        let successMsg = $localize `Stage deleted successfully`
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
        this.messageService.notifyMessage(errorMsg, MessageType.DANGER);
      });
  }

  deletePicture(pictureId: string) {
    let newPictures = this.trip.pictures.filter(p => p._id !== pictureId);
    const newTrip = {
      ...this.trip,
      pictures: newPictures
    }
    this.tripService.updateTrip(newTrip as Trip)
      .then((trip: Trip) => {
        let successMsg = $localize `Picture deleted successfully`
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
        this.messageService.notifyMessage(errorMsg, MessageType.DANGER);
      });
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
