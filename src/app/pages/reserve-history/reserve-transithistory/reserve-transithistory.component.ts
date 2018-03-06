import { Component, OnInit } from '@angular/core';
import { TransReservToModel } from '../../../../app/shared/models/payment/transReservTo.model';

@Component({
  selector: 'app-reserve-transithistory',
  templateUrl: './reserve-transithistory.component.html',
  styleUrls: ['./reserve-transithistory.component.css']
})
export class ReserveTransithistoryComponent implements OnInit {
  transReservTo: TransReservToModel;
  constructor() { }

  ngOnInit() {
  }

}
