import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

import { AllEventComponent } from './pages/eventTickets/all-event/all-event.component';
import { EventInfoComponent } from './pages/event-info/event-info.component';
import { BookingComponent } from './pages/booking/booking.component';
import { PolicyComponent } from './policy/policy.component';
import { FaqComponent } from './faq/faq.component';
import { PaymentComponent } from './pages/payment/payment.component';

const routes: Routes = [
    { path: '', redirectTo: '/', pathMatch: 'full' },
    { path: '', component: HomeComponent },
    { path: 'booking', component: BookingComponent },
    { path: 'Home', component: HomeComponent },
    { path: 'eventInfo', component: EventInfoComponent },
    { path: 'policy', component: PolicyComponent },
    { path: 'faq', component: FaqComponent },
    { path: 'allevent/:type', component: AllEventComponent },
    { path: 'payment', component: PaymentComponent },
  ];
  
  @NgModule({
    imports: [
      RouterModule.forRoot(routes)
    ],
    exports: [
      RouterModule
    ]
  })
  
  export class AppRoutingModule {
  }
