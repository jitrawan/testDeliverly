import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';

/* Library */
import { CalendarModule } from './shared/lib/datetimepicker/primeng/calendar/calendar';
import { DialogModule } from './shared/lib/dialog/dialog.component';
import { Ng2AutoCompleteModule } from 'ng2-auto-complete';


/* Service */
import { HeaderService } from './shared/services/header.service';
import { HomeService } from './shared/services/home.service';

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
import { BusComponent } from './pages/eventTickets/bus/bus.component';
import { ShoppingComponent } from './pages/eventTickets/shopping/shopping.component';
import { TravelComponent } from './pages/eventTickets/travel/travel.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { PurchaseHistoryComponent } from './pages/purchase-history/purchase-history.component';
import { HistoryDetailComponent } from './pages/history-detail/history-detail.component';
import { SelectDestinationComponent } from './pages/eventTickets/bus/select-destination/select-destination.component';

import { SelectSeatComponent } from './pages/eventTickets/bus/select-seat/select-seat.component';
import { SelectRoundComponent } from './pages/eventTickets/bus/select-round/select-round.component';
import { BusLayoutComponent } from './shared/lib/bus-layout/bus-layout.component';
import { PassengerInformationComponent } from './pages/eventTickets/bus/passenger-information/passenger-information.component';

/* Library */
// import { CalendarModule } from './shared/lib/datetimepicker/primeng/calendar/calendar';
// import { DialogModule } from './shared/lib/dialog/dialog.component';
// import { Ng2AutoCompleteModule } from 'ng2-auto-complete';


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
    PaymentComponent,
    PurchaseHistoryComponent,
    HistoryDetailComponent,
    SelectDestinationComponent,

    SelectSeatComponent,
    SelectRoundComponent,
    BusLayoutComponent,
    PassengerInformationComponent
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
  ],
  providers: [HeaderService, HomeService],
  bootstrap: [AppComponent]
})
export class AppModule { }


