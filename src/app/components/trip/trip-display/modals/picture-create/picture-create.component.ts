import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageType } from 'src/app/enums/MessageEnum';
import { Trip } from 'src/app/models/trip';
import { MessageService } from 'src/app/services/message.service';
import { TripService } from 'src/app/services/trip.service';
import { convertBase64, resizeImage } from 'src/app/utils/file.utils';

@Component({
  selector: 'app-picture-create',
  templateUrl: './picture-create.component.html',
  styleUrls: ['./picture-create.component.scss']
})
export class PictureCreateComponent implements OnInit {

  @Input() trip: Trip = new Trip();

  file!: File;
  base64Image: string = '';

  pictureCreationForm: FormGroup;
  formSubmitted = false;
  formError = '';

  @ViewChild('closeModalButton') closeModalButton!: ElementRef

  constructor(
    private tripService: TripService,
    private messageService: MessageService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.pictureCreationForm = this.fb.group({
      title: ['', Validators.compose([Validators.required, Validators.maxLength(100)])],
      image: ['', Validators.required]
    });
  }

  isFormValid() {
    return this.formSubmitted || !this.pictureCreationForm?.dirty;
  }

  ngOnInit(): void {
  }

  onFileChange(event: any) {
    this.file = event.target.files[0];

    convertBase64(this.file).then((base64: string) => {
      resizeImage(base64).then((resizedimage: string) => {
        this.base64Image = resizedimage;
      })
      .catch(_ => {
        this.base64Image = base64;
      });
    })
    .catch(_ => {
      this.formError = $localize `Could not upload the image`;
      this.image?.reset();
    });
  }

  onSubmit() {
    this.formSubmitted = true;

    const picture = {
      title: this.title?.value,
      image:  this.base64Image
    }
    const newPictures = [ ...this.trip.pictures, picture ];

    let newTrip = {
      ...this.trip,
      pictures: newPictures
    };

    this.tripService.updateTrip(newTrip as Trip)
      .then((trip: Trip) => {
        this.formError = '';
        this.closeModalButton.nativeElement.click();

        let successMsg = $localize `New picture added successfully`
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

  get title() { return this.pictureCreationForm.get('title'); }
  get image() { return this.pictureCreationForm.get('image'); }

  closeError() {
    this.formError = '';
  }

}
