import { DatePipe } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';

import { AlertsService } from '@jaspero/ng2-alerts';
import { SharedService } from '../../../../shared/services/shared-service.service';
import { BusService } from '../../../../shared/services/bus.service';

import { BookingResultModel } from '../../../../shared/models/bus/bookingResult.model';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css', '../buy-ticket/buy-ticket.component.css']
})
export class SummaryComponent implements OnInit {

  @Input() passengerName: string = "นาย เคาท์เตอร์ เซอร์วิส";
  @Input() passengerTel: string = "092-826-7788";
  @Input() bookingResult: BookingResultModel;
  dprtPrice: number = 0;
  dprtDiscount: number = 0;
  rtrnPrice: number = 0;
  rtrnDiscount: number = 0;
  receiveData: any;

  constructor(
    private sharedService: SharedService,
    private busService: BusService,
    private _alert: AlertsService
  ) {
    console.log();
  }

  ngOnInit() {

    this.sharedService.receiveData.subscribe(data => this.receiveData = data);
    this.bookingResult = this.receiveData;
    this.calculateDprtPrice();
    this.calculateDprtDiscount();
    this.calculateRtrnPrice();
    this.calculateRtrnDiscount();

  }

  calculateDprtPrice() {
    for (let index = 0; index < this.bookingResult.dptrTrip.reserves.length; index++) {
      this.dprtPrice = this.dprtPrice + (Number(this.bookingResult.dptrTrip.reserves[index].fare) + Number(this.bookingResult.dptrTrip.reserves[index].fee));
    }
  }

  calculateDprtDiscount() {
    for (let index = 0; index < this.bookingResult.dptrTrip.reserves.length; index++) {
      this.dprtDiscount = this.dprtDiscount + (Number(this.bookingResult.dptrTrip.reserves[index].disFare) + Number(this.bookingResult.dptrTrip.reserves[index].disFee));
    }
  }

  calculateRtrnPrice() {
    for (let index = 0; index < this.bookingResult.rtrnTrip.reserves.length; index++) {
      this.rtrnPrice = this.rtrnPrice + (Number(this.bookingResult.rtrnTrip.reserves[index].fare) + Number(this.bookingResult.rtrnTrip.reserves[index].fee));
    }
  }

  calculateRtrnDiscount() {
    for (let index = 0; index < this.bookingResult.rtrnTrip.reserves.length; index++) {
      this.rtrnDiscount = this.rtrnDiscount + (Number(this.bookingResult.rtrnTrip.reserves[index].disFare) + Number(this.bookingResult.rtrnTrip.reserves[index].disFee));
    }
  }

  receiveMessage(msg: string) {
    console.log('receive >>', msg); // your message from component A
  }

  getFloor(reserves) {
    let floorList = [];
    floorList.push(reserves[0].seatFloor);
    let anotherFloor = reserves.filter(seat => seat.seatFloor != reserves[0].seatFloor);
    if (anotherFloor.length > 0) {
      floorList.push(anotherFloor[0].seatFloor);
      return floorList;
    } else {
      return floorList;
    }
  }
}
