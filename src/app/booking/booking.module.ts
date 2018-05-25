import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoBookingComponent } from '../booking/go-booking/go-booking.component';
import { Routes, RouterModule } from '@angular/router';
import { ScheduleModule } from 'primeng/schedule';
import { SharedModule } from '../shared.module';
import { ReserveSummaryComponent } from '@atk-booking/get-reserve/reserve-summary/reserve-summary.component';

const routes: Routes = [
  { path: 'get-seat', component: GoBookingComponent }
];

@NgModule({
  imports: [
    CommonModule,
    ScheduleModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [GoBookingComponent, ReserveSummaryComponent]
})
export class BookingModule { }
