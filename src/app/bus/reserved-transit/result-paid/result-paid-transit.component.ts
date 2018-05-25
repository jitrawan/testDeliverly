import { Component, OnInit } from '@angular/core';
import { TransReservToModel } from '../../../../app/shared/models/payment/transReservTo.model';
import { UserTOModel } from '../../../../app/shared/models/payment/userTO.model';

@Component({
  selector: 'app-result-paid-transit',
  templateUrl: './result-paid-transit.component.html',
  styleUrls: [
      './result-paid-transit.component.css',
      '../../../../assets/css/standard/utility.css'
  ]
})
export class ResultPaidTransitComponent implements OnInit {
  transReservTo: TransReservToModel;
  userTO: UserTOModel;
  foodDetail: string = '1';
  transitFoodTicketAvail: string = 'มีบัตรอาหาร';
  transDetailTurn: string = '';

  priceAmt: number = 0;
  csFee: number = 0;
  endPriceStr: number = 0;

  constructor() { }

  ngOnInit() {
    this.transReservTo = new TransReservToModel;
    this.transReservTo.reserveId = '810018043400168704'
    this.transReservTo.transId = '999801802220954085'
    this.transReservTo.data3 = '00538416'

    this.userTO = new UserTOModel;
    this.userTO.firstname = 'burin';
    this.userTO.lastname = 'sangwan';
    this.userTO.email = 'burinsan@gosoft.co.th';
    this.userTO.cardNumber = '1234567890987';
  }

}
