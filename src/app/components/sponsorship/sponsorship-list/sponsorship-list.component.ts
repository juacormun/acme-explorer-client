import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Actor } from 'src/app/models/actor';
import { Sponsorship } from 'src/app/models/sponsorship';
import { AuthService } from 'src/app/services/auth.service';
import { SponsorshipService } from 'src/app/services/sponsorship.service';
import { ColumnMode } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-sponsorship-list',
  templateUrl: './sponsorship-list.component.html',
  styleUrls: ['./sponsorship-list.component.scss']
})
export class SponsorshipListComponent implements OnInit {

  sponsorships: Sponsorship[];
  actor: Actor;

  sorts = [{
    prop: 'id',
    dir: 'desc'
  },
  {
    prop: 'link',
    dir: 'desc'
  },
  {
    prop: 'paidAt',
    dir: 'desc'
  },]

  loadingIndicator = true;
  reorderable = true;
  ColumnMode = ColumnMode;

  constructor(
    private sponsorshipService: SponsorshipService,
    private authService: AuthService,
    private router: Router
  ) {
    this.sponsorships = [];
    this.actor = new Actor();
  }

  ngOnInit(): void {
    const user = this.authService.getCurrentUser();
    this.sponsorshipService.getSponsorships().subscribe(sponsorships => {
      this.sponsorships = sponsorships;
    });
    this.actor = this.authService.getCurrentActor();
  }

  displaySponsorship(sponsorship: Sponsorship) {
    this.router.navigate(['/sponsorships', sponsorship._id]);
  }
}
