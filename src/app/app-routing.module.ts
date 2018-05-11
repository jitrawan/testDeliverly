import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { EventInfoComponent } from './pages/event-info/event-info.component';
import { BookingComponent } from './pages/booking/booking.component';
import { PolicyComponent } from './pages/policy/policy.component';
import { FaqComponent } from './pages/faq/faq.component';
import { ResultReserveTransitComponent } from './pages/resultReserve-transit/resultReserve-transit.component';
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
import { ShowEventComponent } from './pages/home/show-event/show-event.component';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: '', component: HomeComponent },
  { path: 'booking', loadChildren: './booking/booking.module#BookingModule' },
  { path: 'bus', loadChildren: './bus/bus.module#BusModule' },
  { path: 'home', component: HomeComponent },
  { path: 'genre', component: ShowEventComponent },
  { path: 'genre/:genre', component: ShowEventComponent },
  { path: 'policy', component: PolicyComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'faq/:howto', component: FaqComponent },
  { path: 'concert', component: ConcertComponent },
  { path: 'resultReserve', component: ResultReserveTransitComponent },
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
  { path: 'event/:performId', component: EventInfoComponent }
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
