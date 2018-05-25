import { Component, OnInit } from '@angular/core';
import { TransReservToModel } from '@atk-shared/models/payment/transReservTo.model';
import { UserTOModel } from '@atk-shared/models/payment/userTO.model';

@Component({
  selector: 'app-result-paid-transit-popup',
  templateUrl: './result-paid-transit-popup.component.html',
  styleUrls: [ 
      './result-paid-transit-popup.component.css',
      '../../../../assets/css/standard/utility.css' ]
})
export class PopupResultPaidTransitComponent implements OnInit {
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
    this.transReservTo.reserveId = '80434999801803071454453'
    this.transReservTo.transId = '999801802220954085'
    this.transReservTo.data3 = '00538416'

    this.userTO = new UserTOModel;
    this.userTO.firstname = 'burin';
    this.userTO.lastname = 'sangwan';
    this.userTO.email = 'burinsan@gosoft.co.th';
    this.userTO.cardNumber = '1234567890987';
  }

}