import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoBookingComponent } from '../booking/go-booking/go-booking.component';
import { Routes, RouterModule } from '@angular/router';
import { ScheduleModule } from 'primeng/schedule';
import { SharedModule } from '../shared.module';
import { ReserveSummaryComponent } from '@atk-booking/get-reserve/reserve-summary/reserve-summary.component';
import { HomeComponent } from '@atk-pages/home/home.component';
import { SeatLayoutComponent } from '@atk-shared/lib/seat-layout/seat-layout.component';
import { CheckBookingComponent } from '../booking/get-reserve/check-booking/check-booking.component';
import { ShowDiscountComponent } from './get-reserve/show-discount/show-discount.component'

const routes: Routes = [
  { path: '', component: GoBookingComponent },
  { path: 'get-seat', component: GoBookingComponent },
  { path: 'check-booking', component: CheckBookingComponent },
  { path: 'show-discount', component: ShowDiscountComponent }
  
];

@NgModule({
  imports: [
    CommonModule,
    ScheduleModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    GoBookingComponent,
    ReserveSummaryComponent,
    SeatLayoutComponent,
    CheckBookingComponent,
    ShowDiscountComponent
  ]
})
export class BookingModule { }
