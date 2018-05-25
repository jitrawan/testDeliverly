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
import { BusLayoutComponent } from '@atk-shared/lib/bus-layout/bus-layout.component';
import { ResultPaidTransitComponent } from '@atk-pages/resultPaid/result-paid-transit/result-paid-transit.component';
import { PopupResultPaidTransitComponent } from '@atk-pages/resultPaid-popup/result-paid-transit-popup/result-paid-transit-popup.component';
import { ResultReservePopupTransitComponent } from '@atk-pages/popup-resultReserve/popup-result-reserve-transit/popup-result-reserve-transit.component';

// Import services
import { SharedService } from '@atk-service/shared-service.service';
import { BusService } from '@atk-service/bus.service';
import { ErrorMsgService } from '@atk-service/errorMsg.service';
import { CheckAllowService } from '@atk-service/checkAllow.service';

// Import Libary
import { Ng2AutoCompleteModule } from 'ng2-auto-complete';
import { CalendarModule } from '@atk-shared/lib/datetimepicker/primeng/calendar/calendar';

// Import module
import { SharedModule } from '../shared.module';
import { ScheduleModule } from 'primeng/schedule';

const routes: Routes = [
  {
    path: '', component: BuyTicketComponent,
    children: [
      { path: 'select-destination', component: SelectDestinationComponent },
      { path: 'select-round', component: SelectRoundComponent },
      { path: 'selectSeat', component: SelectSeatComponent },
      { path: 'selectSeat2', component: SelectSeatComponent },
      { path: 'passengerInfomation', component: PassengerInformationComponent },
      { path: 'summary', component: SummaryComponent }
    ]
  },
  { path: 'busReceive', component: BusReceiveComponent },
  { path: 'resultPaid', component: ResultPaidTransitComponent },
  { path: 'popupResultPaid', component: PopupResultPaidTransitComponent },
  { path: 'reserveDetail', component: ResultReservePopupTransitComponent }
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
    BusLayoutComponent,
    ResultPaidTransitComponent,
    ResultReservePopupTransitComponent,
    PopupResultPaidTransitComponent
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
