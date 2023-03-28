import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RegisterComponent } from './components/security/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/security/login/login.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from 'src/environments/environment';
import { HeaderComponent } from './components/master/header/header.component';
import { NotFoundComponent } from './components/shared/not-found/not-found.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/master/footer/footer.component';
import { ProfileComponent } from './components/actor/profile/profile.component';
import { TripListComponent } from './components/trip/trip-list/trip-list.component';
import { TripDisplayComponent } from './components/trip/trip-display/trip-display.component';
import { TripCreateComponent } from './components/trip/trip-create/trip-create.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HeaderComponent,
    NotFoundComponent,
    HomeComponent,
    FooterComponent,
    ProfileComponent,
    TripListComponent,
    TripDisplayComponent,
    TripCreateComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    HttpClientModule
  ],
  providers: [
    AngularFireAuth
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
