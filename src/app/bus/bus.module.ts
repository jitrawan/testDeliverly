import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

// Import bus's components
import { SelectDestinationComponent } from './select-destination/select-destination.component';
import { SelectSeatComponent } from './select-seat/select-seat.component';
import { SelectRoundComponent } from './select-round/select-round.component';
import { PassengerInformationComponent } from './passenger-information/passenger-information.component';
import { SummaryComponent } from './summary/summary.component';
import { BusReceiveComponent } from './bus-receive/bus-receive.component';
import { BuyTicketComponent } from './buy-ticket/buy-ticket.component';
import { BusErrorComponent } from './bus-error/bus-error.component';
import { BusLayoutComponent } from '../shared/lib/bus-layout/bus-layout.component';

// Import services
import { SharedService } from '../shared/services/shared-service.service';
import { BusService } from '../shared/services/bus.service';
import { ErrorMsgService } from '../shared/services/errorMsg.service';
import { CheckAllowService } from '../shared/services/checkAllow.service';

// Import Libary
import { Ng2AutoCompleteModule } from 'ng2-auto-complete';
import { CalendarModule } from '../shared/lib/datetimepicker/primeng/calendar/calendar';

// Import module
import { SharedModule } from '../shared.module';

const routes: Routes = [
  { path: 'selectDestination', component: SelectDestinationComponent },
  { path: 'selectRound', component: SelectRoundComponent },
  { path: 'selectSeat', component: SelectSeatComponent },
  { path: 'selectSeat2', component: SelectSeatComponent },
  { path: 'passengerInfomation', component: PassengerInformationComponent },
  { path: 'summary', component: SummaryComponent },
  { path: 'busReceive', component: BusReceiveComponent },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CalendarModule,
    Ng2AutoCompleteModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    BuyTicketComponent,
    SelectDestinationComponent,
    SelectRoundComponent,
    SelectSeatComponent,
    PassengerInformationComponent,
    SummaryComponent,
    BusReceiveComponent,
    BusErrorComponent,
    BusLayoutComponent
  ],
  providers: [
    SharedService,
    BusService,
    ErrorMsgService,
    CheckAllowService,
    BuyTicketComponent
  ],
})
export class BusModule { }
