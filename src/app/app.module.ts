
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { DatePipe } from '@angular/common';

/* Library */
import { CalendarModule } from './shared/lib/datetimepicker/primeng/calendar/calendar';
import { DialogModule } from './shared/lib/dialog/dialog.component';
import { Ng2AutoCompleteModule } from 'ng2-auto-complete';
import { ThaiDatePipe } from './shared/lib/date-format/thaidate.pipe';
import { JasperoAlertsModule } from '@jaspero/ng2-alerts';
import { JasperoConfirmationsModule } from '@jaspero/ng2-confirmations'
import { AccordionModule } from 'primeng/accordion';     //accordion and accordion tab
import { ScheduleModule } from 'primeng/schedule';

/* Service */
import { ApiService } from './shared/services/api.service';
import { HeaderService } from './shared/services/header.service';
import { HomeService } from './shared/services/home.service';
import { SharedService } from './shared/services/shared-service.service';
import { BusService } from './shared/services/bus.service';
import { ErrorMsgService } from './shared/services/errorMsg.service';
import { CheckAllowService } from './shared/services/checkAllow.service';

/* Page */
import { AppComponent } from './app.component';

import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';

import { EventInfoComponent } from './pages/event-info/event-info.component';
import { HomeComponent } from './pages/home/home.component';
import { BookingComponent } from './pages/booking/booking.component';
import { FaqComponent } from './pages/faq/faq.component';
import { PolicyComponent } from './pages/policy/policy.component';
import { BusComponent } from './pages/eventTickets/bus/bus-menu.component';
import { ResultReserveTransitComponent } from './pages/resultReserve-transit/resultReserve-transit.component';
import { HistoryDetailComponent } from './pages/history-detail/history-detail.component';
import { SelectDestinationComponent } from './pages/eventTickets/bus/select-destination/select-destination.component';

import { SelectSeatComponent } from './pages/eventTickets/bus/select-seat/select-seat.component';
import { BusLayoutComponent } from './shared/lib/bus-layout/bus-layout.component';
import { PassengerInformationComponent } from './pages/eventTickets/bus/passenger-information/passenger-information.component';
import { SummaryComponent } from './pages/eventTickets/bus/summary/summary.component';
import { SelectRoundComponent } from './pages/eventTickets/bus/select-round/select-round.component';
import { BuyTicketComponent } from './pages/eventTickets/bus/buy-ticket/buy-ticket.component';
import { BusReceiveComponent } from './pages/eventTickets/bus/bus-receive/bus-receive.component';
import { BusErrorComponent } from './pages/eventTickets/bus/bus-error/bus-error.component';

import { ResultPaidTransitComponent } from './pages/resultPaid/result-paid-transit/result-paid-transit.component';
import { PopupResultPaidTransitComponent } from './pages/resultPaid-popup/result-paid-transit-popup/result-paid-transit-popup.component';
import { FshowzoneComponent } from './pages/eventTickets/concert/fshowzone/fshowzone.component';
import { ConcertComponent } from './pages/eventTickets/concert/concert.component';
import { HistoryComponent } from './pages/history/history.component';

import { SocialLoginModule } from 'angularx-social-login';
import { AuthServiceConfig, GoogleLoginProvider, FacebookLoginProvider, LinkedInLoginProvider } from 'angularx-social-login';

import { FootballComponent } from './pages/eventTickets/football/football.component';
import { RacingComponent } from './pages/eventTickets/racing/racing.component';
import { RunningComponent } from './pages/eventTickets/running/running.component';
import { OthersComponent } from './pages/eventTickets/others/others.component';
import { SeminarComponent } from './pages/eventTickets/seminar/seminar.component';
import { EducationComponent } from './pages/eventTickets/education/education.component';
import { DiscountComponent } from './pages/discount/discount.component';
import { DiscountDetailComponent } from './pages/discount-detail/discount-detail.component';
import { RecaptchaModule } from 'ng-recaptcha';
import { PushNotificationModule } from 'ng-push-notification';

import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';


const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('425750395938-52us01eev9lune9ltac5t2o0d1b1utdl.apps.googleusercontent.com')
    // 624796833023-clhjgupm0pu6vgga7k5i5bsfp6qp6egh.apps.googleusercontent.com
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider('391051151360464')
    //561602290896109
  }
]);

export function provideConfig() {
  return config;
}


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    EventInfoComponent,
    HomeComponent,
    BookingComponent,
    FaqComponent,
    PolicyComponent,
    BusComponent,
    ResultReserveTransitComponent,
    HistoryDetailComponent,
    SelectDestinationComponent,
    PassengerInformationComponent,
    SummaryComponent,

    SelectSeatComponent,
    SelectRoundComponent,
    BusLayoutComponent,
    PassengerInformationComponent,
    BuyTicketComponent,

    ThaiDatePipe,

    BusReceiveComponent,
    BusErrorComponent,
    ResultPaidTransitComponent,
    PopupResultPaidTransitComponent,
    FshowzoneComponent,
    ConcertComponent,
    HistoryComponent,
    FootballComponent,
    RacingComponent,
    RunningComponent,
    OthersComponent,
    SeminarComponent,
    EducationComponent,
    DiscountComponent,
    DiscountDetailComponent,
  ],
  imports: [
    NgbModule.forRoot(),
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAGx0n_0P-3W46Pf77PqB25XtjNv8MpJDk'
    }),
    AppRoutingModule,
    HttpClientModule,
    HttpModule,
    CalendarModule,
    DialogModule,
    Ng2AutoCompleteModule,
    JasperoAlertsModule,
    JasperoConfirmationsModule,
    SocialLoginModule,
    ReactiveFormsModule,
    AccordionModule,
    ScheduleModule,
    RecaptchaModule.forRoot(),
    PushNotificationModule.forRoot(),
    environment.production ? ServiceWorkerModule.register('ngsw-worker.js') : []

  ],
  providers: [
    HeaderService,
    HomeService,
    SharedService,
    DatePipe,
    BusService,
    ErrorMsgService,
    CheckAllowService,
    BuyTicketComponent,
    ApiService,
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}


