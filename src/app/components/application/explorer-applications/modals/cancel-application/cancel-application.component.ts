import { Component, Input, OnInit } from '@angular/core';
import { MessageType } from 'src/app/enums/MessageEnum';
import { ApplicationService } from 'src/app/services/application.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-cancel-application',
  templateUrl: './cancel-application.component.html',
  styleUrls: ['./cancel-application.component.scss']
})
export class CancelApplicationComponent implements OnInit {

  @Input() applicationId!: string;

  constructor(
    private applicationService: ApplicationService,
    private messageService: MessageService) { }

  ngOnInit(): void {
  }

  cancelApplication(applicationId: string) {
    this.applicationService.cancelApplication(applicationId).subscribe({
      next: () => {
        this.messageService.notifyMessage($localize`Application cancelled`, MessageType.SUCCESS);
        location.reload();
      },
      error: (err) => {
        this.messageService.notifyMessage($localize`An error has occurred while cancellation`, MessageType.DANGER);
        console.log(err);
      }
    })
  }

}
