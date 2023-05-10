import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageType } from 'src/app/enums/MessageEnum';
import { Role } from 'src/app/enums/RoleEnum';
import { Status } from 'src/app/enums/StatusEnum';
import { Actor } from 'src/app/models/actor';
import { Application } from 'src/app/models/application';
import { ApplicationService } from 'src/app/services/application.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-application-display',
  templateUrl: './application-display.component.html',
  styleUrls: ['./application-display.component.scss']
})
export class ApplicationDisplayComponent implements OnInit {

  @Input() application: Application = new Application();
  @Input() actor: Actor = new Actor();

  rejectionForm: FormGroup;
  formSubmitted = false;
  formError = '';

  @ViewChild('closeModalButton') closeModalButton!: ElementRef

  constructor(
    private applicationService: ApplicationService,
    private messageService: MessageService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.rejectionForm = this.fb.group({
      reason: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(255)])]
    });
  }

  isFormValid() {
    return this.formSubmitted || !this.rejectionForm?.dirty;
  }

  ngOnInit(): void {
  }

  rejectApplication() {
    this.formSubmitted = true;

    this.applicationService.rejectApplication(this.application, this.reason?.value)
      .then((application: Application) => {
        this.formError = '';
        this.closeModalButton.nativeElement.click();

        let successMsg = $localize `Application rejected successfully`
        this.messageService.notifyMessage(successMsg, MessageType.SUCCESS);
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/trips', application.trip, 'applications']);
        });
      })
      .catch(error => {
        let errorMsg = $localize `Something wrong occurred...`;
        if (error.status !== 422) {
          errorMsg = $localize `This application can't be rejected`;
        }
        this.formError = errorMsg;
      });
  }

  get reason() { return this.rejectionForm.get('reason'); }

  closeError() {
    this.formError = '';
  }

  getStatusName(st: Status) {
    return this.applicationService.getStatusName(st);
  }

  canChangeStatus() {
    return this.actor && this.actor.role === Role.MANAGER && this.application.status === Status.PENDING;
  }

  acceptApplication() {
    this.applicationService.acceptApplication(this.application)
      .then((application: Application) => {
        this.closeModalButton.nativeElement.click();
        const successMsg = $localize `Application accepted successfully`;
        this.messageService.notifyMessage(successMsg, MessageType.SUCCESS)
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/trips', application.trip, 'applications']);
        });
      })
      .catch(error => {
        let errorMsg = $localize `Something wrong occurred...`;
        if (error.status !== 500) {
          errorMsg = $localize `This application can't be accepted`;
        }
        this.formError = errorMsg;
      })
  }

}
