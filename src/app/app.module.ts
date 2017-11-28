import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

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
  ],
  imports: [
    NgbModule.forRoot(), BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [ HeaderService ],
  bootstrap: [AppComponent]
})
export class AppModule { }


