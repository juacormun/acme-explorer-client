import { CountdownModule } from 'ngx-countdown';
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
import { AngularFireAuth } from '@angular/fire/compat/auth';
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
import { TripApplicationsComponent } from './components/application/trip-applications/trip-applications.component';
import { MessageComponent } from './components/master/message/message.component';
import { DeniedAccessComponent } from './components/shared/denied-access/denied-access.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ExplorerApplicationsComponent } from './components/application/explorer-applications/explorer-applications.component';
import { SponsorshipListComponent } from './components/sponsorship/sponsorship-list/sponsorship-list.component';
import { SponsorshipDisplayComponent } from './components/sponsorship/sponsorship-display/sponsorship-display.component';
import { TripManagerListComponent } from './components/trip/trip-manager-list/trip-manager-list.component';
import { I18nModule } from './i18n.module';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { NgxPayPalModule } from 'ngx-paypal';
import { MessageService } from './services/message.service';
import { CookieService } from 'ngx-cookie-service';
import { ActorListComponent } from './components/actor/actor-list/actor-list.component';
import { ActorDisplayComponent } from './components/actor/actor-display/actor-display.component';
import { StageCreateComponent } from './components/trip/trip-display/modals/stage-create/stage-create.component';
import { PictureCreateComponent } from './components/trip/trip-display/modals/picture-create/picture-create.component';
import { TripCancelComponent } from './components/trip/trip-display/modals/trip-cancel/trip-cancel.component';
import { ApplicationDisplayComponent } from './components/application/trip-applications/modals/application-display/application-display.component';


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
    DashboardComponent,
    TripApplicationsComponent,
    MessageComponent,
    DeniedAccessComponent,
    ExplorerApplicationsComponent,
    SponsorshipListComponent,
    SponsorshipDisplayComponent,
    TripManagerListComponent,
    CheckoutComponent,
    ActorListComponent,
    ActorDisplayComponent,
    StageCreateComponent,
    PictureCreateComponent,
    TripCancelComponent,
    ApplicationDisplayComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    HttpClientModule,
    NgxDatatableModule,
    CountdownModule,
    NgxPayPalModule
  ],
  providers: [
    I18nModule.setLocale(),
    I18nModule.setLocaleId(),
    AngularFireAuth,
    MessageService,
    CookieService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
