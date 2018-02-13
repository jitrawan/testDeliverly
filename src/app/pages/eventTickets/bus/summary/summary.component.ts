import { DatePipe } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertsService } from '@jaspero/ng2-alerts';
import { ConfirmationService } from '@jaspero/ng2-confirmations';
import { SharedService } from '../../../../shared/services/shared-service.service';
import { BusService } from '../../../../shared/services/bus.service';
import { ConfirmBoxEmit } from '../../../../shared/models/confirmBoxEmit';
import { BookingResultModel } from '../../../../shared/models/bus/bookingResult.model';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css', '../buy-ticket/buy-ticket.component.css']
})
export class SummaryComponent implements OnInit {

  @Input() bookingResult: BookingResultModel;
  dprtPrice: number = 0;
  dprtDiscount: number = 0;
  rtrnPrice: number = 0;
  rtrnDiscount: number = 0;
  fee: number = 15;
  receiveData: any;
  trips: any;
  confirmSettings: any;
  alertSettings: any;

  constructor(
    private sharedService: SharedService,
    private busService: BusService,
    private _alert: AlertsService,
    private _confirm: ConfirmationService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {

    this.sharedService.receiveData.subscribe(data => this.receiveData = data);
    this.trips = this.receiveData.forwardData;
    this.bookingResult = this.receiveData.bookingResultModel;
    this.dprtPrice = this.dprtPrice + (Number(this.bookingResult.dptrTrip.reserves[0].fare) + Number(this.bookingResult.dptrTrip.reserves[0].fee));
    this.dprtDiscount = this.dprtDiscount + (Number(this.bookingResult.dptrTrip.reserves[0].disFare) + Number(this.bookingResult.dptrTrip.reserves[0].disFee));
    if (this.bookingResult.rtrnTrip != null) {
      this.rtrnPrice = this.rtrnPrice + (Number(this.bookingResult.rtrnTrip.reserves[0].fare) + Number(this.bookingResult.rtrnTrip.reserves[0].fee));
      this.rtrnDiscount = this.rtrnDiscount + (Number(this.bookingResult.rtrnTrip.reserves[0].disFare) + Number(this.bookingResult.rtrnTrip.reserves[0].disFee));
    }
  }

  totalPrice() {
    let totalDprtPrice = 0;
    let totalDprtDiscount = 0;
    let totalRtrnPrice = 0;
    let totalRtrnDiscount = 0;
    for (let index = 0; index < this.bookingResult.dptrTrip.reserves.length; index++) {
      totalDprtPrice = totalDprtPrice + (Number(this.bookingResult.dptrTrip.reserves[index].fare) + Number(this.bookingResult.dptrTrip.reserves[index].fee));
      totalDprtDiscount = totalDprtDiscount + (Number(this.bookingResult.dptrTrip.reserves[index].disFare) + Number(this.bookingResult.dptrTrip.reserves[index].disFee));
    }
    if (this.bookingResult.rtrnTrip != null) {
      for (let index = 0; index < this.bookingResult.rtrnTrip.reserves.length; index++) {
        totalRtrnPrice = totalRtrnPrice + (Number(this.bookingResult.rtrnTrip.reserves[index].fare) + Number(this.bookingResult.rtrnTrip.reserves[index].fee));
        totalRtrnDiscount = totalRtrnDiscount + (Number(this.bookingResult.rtrnTrip.reserves[index].disFare) + Number(this.bookingResult.rtrnTrip.reserves[index].disFee));
      }
    }

    let summaryPrice = (totalDprtPrice - totalDprtDiscount) + (totalRtrnPrice - totalRtrnDiscount) + this.fee;
    return summaryPrice;
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

  openDialog(msg) {
    let type: any = "warning";
    this.alertSettings = { overlay: true, overlayClickToClose: false, showCloseButton: true, duration: 100000 };
    this._alert.create(type, msg, this.alertSettings);
  }
  
  cancelBooking() {
    this.confirmSettings = { confirmText: 'ใช่', declineText: 'ไม่' };
    let isConfirm:any;
    this._confirm.create('กรุณายืนยัน','คุณต้องการยกเลิกการจองหรือไม่' , this.confirmSettings)
      .subscribe((callback: ConfirmBoxEmit) => {
        console.log(callback)
        if(callback.resolved != undefined && callback.resolved == true) {
          this.executeCancelBooking();
        }
      });

    
  }
  
  executeCancelBooking() {

    this.busService.getTransId('C').subscribe((res) => {
      if(res.code == 0) {
        this.busService.cancelBooking(res.data.transId,this.bookingResult.bookId,this.bookingResult.bookCode).subscribe((res) => {
          console.log("cancelBooking",res);
          if (res.code == 0) {
            this.router.navigate(['..'], { relativeTo: this.route });
          } else {
            this.openDialog(res.msg);
          }
        });
      } else {
        this.openDialog(res.msg);
      }
    });
  }
  
}
