import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Role } from 'src/app/enums/RoleEnum';
import { Actor } from 'src/app/models/actor';
import { Sponsorship } from 'src/app/models/sponsorship';
import { AuthService } from 'src/app/services/auth.service';
import { SponsorshipService } from 'src/app/services/sponsorship.service';

@Component({
  selector: 'app-sponsorship-display',
  templateUrl: './sponsorship-display.component.html',
  styleUrls: ['./sponsorship-display.component.scss']
})
export class SponsorshipDisplayComponent implements OnInit {

  id: string;
  sponsorship: Sponsorship;
  actor: Actor;

  constructor(
    private sponsorshipService: SponsorshipService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.id = '0';
    this.sponsorship = new Sponsorship();
    this.actor = new Actor();
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.sponsorshipService.getSponsorship(this.id).subscribe((sponsorship) => {
      this.sponsorship = sponsorship;
    })
    this.actor = this.authService.getCurrentActor();
  }

  goBack(): void {
    this.router.navigate(['/sponsorships']);
  }

  canDisplayActions(): boolean {
    return this.actor && this.actor.role === Role.SPONSOR && this.actor._id === this.sponsorship.sponsor;
  }

}
