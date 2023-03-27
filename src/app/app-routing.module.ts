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

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile/:id', component: ProfileComponent },
  { path: 'trips', children: [
    { path: 'create', component: TripCreateComponent },
    { path: ':id', component: TripDisplayComponent },
    { path: '', component: TripListComponent }
  ]},
  { path: '', component: HomeComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
