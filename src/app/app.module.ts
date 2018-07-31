import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
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


/* Service */
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
import { AllEventComponent } from './pages/eventTickets/all-event/all-event.component';
import { HomeComponent } from './pages/home/home.component';
import { BookingComponent } from './pages/booking/booking.component';
import { FaqComponent } from './pages/faq/faq.component';
import { PolicyComponent } from './pages/policy/policy.component';
import { AirlinesComponent } from './pages/eventTickets/airlines/airlines.component';
import { BusComponent } from './pages/eventTickets/bus/bus-menu.component';
import { ShoppingComponent } from './pages/eventTickets/shopping/shopping.component';
import { TravelComponent } from './pages/eventTickets/travel/travel.component';
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

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    EventInfoComponent,
    AllEventComponent,
    HomeComponent,
    BookingComponent,
    FaqComponent,
    PolicyComponent,
    AirlinesComponent,
    BusComponent,
    ShoppingComponent,
    TravelComponent,
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
    PopupResultPaidTransitComponent
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
    JasperoConfirmationsModule
  ],
  providers: [
    HeaderService,
    HomeService,
    SharedService,
    DatePipe,
    BusService,
    ErrorMsgService,
    CheckAllowService,
    BuyTicketComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}


