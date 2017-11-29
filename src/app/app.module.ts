import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
<<<<<<< HEAD
import { AgmCoreModule } from '@agm/core';
=======

>>>>>>> e96048dc94ba14ceee7555de9d1fd9dac6369179
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';

import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';

import { EventInfoComponent } from './pages/event-info/event-info.component';
import { AllEventComponent } from './pages/eventTickets/all-event/all-event.component';
import { HomeComponent } from './pages/home/home.component';
import { BookingComponent } from './pages/booking/booking.component';

import { HeaderService } from './shared/service/header.service';
import { FaqComponent } from './faq/faq.component';
import { PolicyComponent } from './policy/policy.component';
<<<<<<< HEAD
=======
import { AirlinesComponent } from './pages/eventTickets/airlines/airlines.component';
import { BusComponent } from './pages/eventTickets/bus/bus.component';
import { ShoppingComponent } from './pages/eventTickets/shopping/shopping.component';
import { TravelComponent } from './pages/eventTickets/travel/travel.component';
>>>>>>> e96048dc94ba14ceee7555de9d1fd9dac6369179
import { PaymentComponent } from './pages/payment/payment.component';


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
<<<<<<< HEAD
=======
    AirlinesComponent,
    BusComponent,
    ShoppingComponent,
    TravelComponent,
>>>>>>> e96048dc94ba14ceee7555de9d1fd9dac6369179
    PaymentComponent
  ],
  imports: [
    NgbModule.forRoot(), BrowserModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAGx0n_0P-3W46Pf77PqB25XtjNv8MpJDk'
    }),
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [ HeaderService ],
  bootstrap: [AppComponent]
})
export class AppModule { }


