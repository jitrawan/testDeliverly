import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

import { AllEventComponent } from './pages/eventTickets/all-event/all-event.component';
import { EventInfoComponent } from './pages/event-info/event-info.component';
import { BookingComponent } from './pages/booking/booking.component';
import { PolicyComponent } from './pages/policy/policy.component';
import { FaqComponent } from './pages/faq/faq.component';
import { AirlinesComponent } from './pages/eventTickets/airlines/airlines.component';
import { BusComponent } from './pages/eventTickets/bus/bus.component';
import { ShoppingComponent } from './pages/eventTickets/shopping/shopping.component';
import { TravelComponent } from './pages/eventTickets/travel/travel.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { PurchaseHistoryComponent } from './pages/purchase-history/purchase-history.component';
import { HistoryDetailComponent } from './pages/history-detail/history-detail.component';
import { SelectDestinationComponent } from './pages/eventTickets/bus/select-destination/select-destination.component';
import { PassengerInformationComponent } from './pages/eventTickets/bus/passenger-information/passenger-information.component';
import { SummaryComponent } from './pages/eventTickets/bus/summary/summary.component';
import { SelectRoundComponent } from './pages/eventTickets/bus/select-round/select-round.component';

const routes: Routes = [
    { path: '', redirectTo: '/', pathMatch: 'full' },
    { path: '', component: HomeComponent },
    { path: 'booking', component: BookingComponent },
    { path: 'Home', component: HomeComponent },
    { path: 'eventInfo', component: EventInfoComponent },
    { path: 'policy', component: PolicyComponent },
    { path: 'faq', component: FaqComponent },
    { path: 'transport/airlines', component: AirlinesComponent },
    { path: 'transport/bus', component: BusComponent },
    { path: 'transport/bus/selectDestination', component: SelectDestinationComponent },
    { path: 'transport/bus/passengerInfomation', component: PassengerInformationComponent },
    { path: 'transport/bus/selectRound', component: SelectRoundComponent },
    { path: 'transport/bus/summary', component: SummaryComponent },
    { path: 'shopping', component: ShoppingComponent },
    { path: 'transport/travel', component: TravelComponent },
    { path: 'allevent/:type', component: AllEventComponent },
    { path: 'payment/:step', component: PaymentComponent },
    { path: 'purchaseHistory', component: PurchaseHistoryComponent },
    { path: 'historyDetail', component: HistoryDetailComponent },
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
