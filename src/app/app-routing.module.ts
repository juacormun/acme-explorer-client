import { TripDisplayComponent } from './components/trip/trip-display/trip-display.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/security/register/register.component';
import { LoginComponent } from './components/security/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './components/shared/not-found/not-found.component';
import { ProfileComponent } from './components/actor/profile/profile.component';
import { TripCreateComponent } from './components/trip/trip-create/trip-create.component';
import { TripListComponent } from './components/trip/trip-list/trip-list.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TripApplicationsComponent } from './components/application/trip-applications/trip-applications.component';
import { TripSponsorshipsComponent } from './components/sponsorship/trip-sponsorships/trip-sponsorships.component';
import { ActorRoleGuard } from './guards/actor-role.guard';
import { Role } from './enums/RoleEnum';
import { DeniedAccessComponent } from './components/shared/denied-access/denied-access.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [ActorRoleGuard], data: { expectedRoles: [Role.ANONYMOUS] } },
  { path: 'register', component: RegisterComponent, canActivate: [ActorRoleGuard], data: { expectedRoles: [Role.ANONYMOUS] } },
  { path: 'profile/:id', component: ProfileComponent },
  { path: 'applications', component: TripApplicationsComponent, canActivate: [ActorRoleGuard], data: { expectedRoles: [Role.EXPLORER] } },
  { path: 'sponsorships', component: TripSponsorshipsComponent, canActivate: [ActorRoleGuard], data: { expectedRoles: [Role.SPONSOR] } },
  { path: 'trips', children: [
    { path: 'create', component: TripCreateComponent, canActivate: [ActorRoleGuard], data: { expectedRoles: [Role.MANAGER] } },
    { path: ':id', component: TripDisplayComponent },
    { path: '', component: TripListComponent }
  ]},
  { path: 'dashboard', component: DashboardComponent, canActivate: [ActorRoleGuard], data: { expectedRoles: [Role.ADMINISTRATOR] } },
  { path: 'denied-access', component: DeniedAccessComponent },
  { path: '', component: HomeComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
