import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoBookingComponent } from '../booking/go-booking/go-booking.component';
import { Routes, RouterModule } from '@angular/router';

import { ScheduleModule } from 'primeng/schedule';

const routes: Routes = [
  { path: 'get-seat', component: GoBookingComponent }
];

@NgModule({
  imports: [
    CommonModule,
    ScheduleModule,
    RouterModule.forChild(routes)
  ],
  declarations: [GoBookingComponent]
})
export class BookingModule { }
