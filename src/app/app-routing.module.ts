import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

import { EventInfoComponent } from './pages/event-info/event-info.component';
import { BookingComponent } from './pages/booking/booking.component';
import { PolicyComponent } from './pages/policy/policy.component';
import { FaqComponent } from './pages/faq/faq.component';
import { BusComponent } from './pages/eventTickets/bus/bus-menu.component';
import { ResultReserveTransitComponent } from './pages/resultReserve-transit/resultReserve-transit.component';
import { HistoryDetailComponent } from './pages/history-detail/history-detail.component';
import { SelectDestinationComponent } from './pages/eventTickets/bus/select-destination/select-destination.component';

import { SelectSeatComponent } from './pages/eventTickets/bus/select-seat/select-seat.component';
import { SelectRoundComponent } from './pages/eventTickets/bus/select-round/select-round.component';
import { PassengerInformationComponent } from './pages/eventTickets/bus/passenger-information/passenger-information.component';
import { SummaryComponent } from './pages/eventTickets/bus/summary/summary.component';

import { BusLayoutComponent } from './shared/lib/bus-layout/bus-layout.component';
import { BuyTicketComponent } from './pages/eventTickets/bus/buy-ticket/buy-ticket.component';

import { BusReceiveComponent } from './pages/eventTickets/bus/bus-receive/bus-receive.component';
import { BusErrorComponent } from './pages/eventTickets/bus/bus-error/bus-error.component';
import { ResultPaidTransitComponent } from './pages/resultPaid/result-paid-transit/result-paid-transit.component';
import { PopupResultPaidTransitComponent } from './pages/resultPaid-popup/result-paid-transit-popup/result-paid-transit-popup.component';
import { FshowzoneComponent } from './pages/eventTickets/concert/fshowzone/fshowzone.component';
import { ConcertComponent } from './pages/eventTickets/concert/concert.component';

import { HistoryComponent } from './pages/history/history.component';
import { FootballComponent } from './pages/eventTickets/football/football.component';
import { RacingComponent } from './pages/eventTickets/racing/racing.component';
import { RunningComponent } from './pages/eventTickets/running/running.component';
import { OthersComponent } from './pages/eventTickets/others/others.component';
import { SeminarComponent } from './pages/eventTickets/seminar/seminar.component';
import { EducationComponent } from './pages/eventTickets/education/education.component';
import { DiscountComponent } from './pages/discount/discount.component';
import { DiscountDetailComponent } from './pages/discount-detail/discount-detail.component';
const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  // { path: '**', component: SelectDestinationComponent },
  {
    path: '', component: HomeComponent,
    children: [
      { path: 'selectDestination', component: SelectDestinationComponent },
      { path: 'selectRound', component: SelectRoundComponent },
      { path: 'selectSeat', component: SelectSeatComponent },
      { path: 'selectSeat2', component: SelectSeatComponent },
      { path: 'passengerInfomation', component: PassengerInformationComponent },
      { path: 'summary', component: SummaryComponent }
    ]
  },
  { path: 'booking', component: BookingComponent },
  { path: 'Home', component: HomeComponent },
  { path: 'eventInfo', component: EventInfoComponent },
  { path: 'policy', component: PolicyComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'faq/:howto', component: FaqComponent },
  { path: 'concert', component: ConcertComponent },
  { path: 'bus', component: BusComponent },
  { path: 'resultReserve', component: ResultReserveTransitComponent },
  { path: 'historyDetail', component: HistoryDetailComponent },
  { path: 'busReceive', component: BusReceiveComponent },
  { path: 'fshowzone', component: FshowzoneComponent },
  { path: 'history', component: HistoryComponent },
  { path: 'football', component: FootballComponent },
  { path: 'racing', component: RacingComponent },
  { path: 'running', component: RunningComponent },
  { path: 'others', component: OthersComponent },
  { path: 'seminar', component: SeminarComponent },
  { path: 'education', component: EducationComponent },
  { path: 'discount', component: DiscountComponent },
  { path: 'discount-detail', component: DiscountDetailComponent },
  { path: 'event/:performId', component: EventInfoComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true })
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule {
}
