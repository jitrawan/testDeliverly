import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { EventInfoComponent } from './pages/event-info/event-info.component';
import { PolicyComponent } from './pages/policy/policy.component';
import { FaqComponent } from './pages/faq/faq.component';
import { HistoryComponent } from './pages/history/history.component';
import { DiscountDetailComponent } from './pages/discount-detail/discount-detail.component';
import { ShowEventComponent } from './pages/home/show-event/show-event.component';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: '', component: HomeComponent },
  { path: 'booking', loadChildren: './booking/booking.module#BookingModule' },
  { path: 'bus', loadChildren: './bus/bus.module#BusModule' },
  { path: 'home', component: HomeComponent },
  { path: 'category', component: ShowEventComponent },
  { path: 'category/:category', component: ShowEventComponent },
  { path: 'policy', component: PolicyComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'faq/:howto', component: FaqComponent },
  { path: 'history', component: HistoryComponent },
  { path: 'discount-detail', component: DiscountDetailComponent },
  { path: 'event/:performUri', component: EventInfoComponent }
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
