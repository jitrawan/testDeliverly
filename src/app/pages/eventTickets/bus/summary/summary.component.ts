import { DatePipe } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertsService } from '@jaspero/ng2-alerts';
import { ConfirmationService } from '@jaspero/ng2-confirmations';
import { SharedService } from '../../../../shared/services/shared-service.service';
import { BusService } from '../../../../shared/services/bus.service';
import { ConfirmBoxEmit } from '../../../../shared/models/confirmBoxEmit';
import { BookingResultModel } from '../../../../shared/models/bus/bookingResult.model';
import { InsertBookingInfoModel, listTripByReserve } from '../../../../shared/models/bus/insertBookingInfo.model';
import { ErrorMsgService } from '../../../../shared/services/errorMsg.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css', '../buy-ticket/buy-ticket.component.css']
})
export class SummaryComponent implements OnInit {

  @Input() bookingResult: BookingResultModel;
  insertBooking: InsertBookingInfoModel;
  dprtPrice: number = 0;
  dprtDiscount: number = 0;
  rtrnPrice: number = 0;
  rtrnDiscount: number = 0;
  fee: number = 15;
  receiveData: any;
  trips: any;
  confirmSettings: any;
  alertSettings: any;
  queryString: any;
  isShowLoading: boolean = false;
  isShowLoadingBack: boolean = false;

  constructor(
    private sharedService: SharedService,
    private busService: BusService,
    private errorMsgService: ErrorMsgService,
    private _alert: AlertsService,
    private _confirm: ConfirmationService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

    this.sharedService.receiveData.subscribe(data => this.receiveData = data);
    console.log('session>>', sessionStorage.getItem('paymentChannel'));
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


  insertBookingInfo() {
    this.isShowLoading = true;
    this.queryString = {
      payment_channel: localStorage.getItem('payment_channel'),
      cust_email: localStorage.getItem('cust_email')
    }

    let listDptrTripByReserve = new listTripByReserve();
    let listRtrnTripByReserve = new listTripByReserve();

    for (let el of this.bookingResult.dptrTrip.reserves) {
      listDptrTripByReserve.passengerName.push(el.passengerName);
      listDptrTripByReserve.passengerTel.push(el.passengerTel);
      listDptrTripByReserve.seatFloor.push(el.seatFloor);
      listDptrTripByReserve.seatNo.push(el.seatNo);
      listDptrTripByReserve.fare.push(el.fare);
      listDptrTripByReserve.fee.push(el.fee);
      listDptrTripByReserve.disFare.push(el.disFare);
      listDptrTripByReserve.disFee.push(el.disFee);
    }

    this.insertBooking = {
      bookCode: this.bookingResult.bookCode,
      bookID: this.bookingResult.bookId,
      passengerName: listDptrTripByReserve.passengerName.toString(),
      passengerTel: listDptrTripByReserve.passengerTel.toString(),
      noOfSeat: this.bookingResult.dptrTrip.reserves.length + "",
      totalAmt: this.totalPrice() + "",
      dptrTrip: {
        dptrProvinceDesc: this.bookingResult.dptrTrip.dptrProvince.desc,
        dptrParkDesc: this.bookingResult.dptrTrip.dptrPark.desc,
        arrvProvinceDesc: this.bookingResult.dptrTrip.arrvProvince.desc,
        arrvParkDesc: this.bookingResult.dptrTrip.arrvPark.desc,
        dptrTripDate: this.bookingResult.dptrTrip.date,
        dptrTripTime: this.bookingResult.dptrTrip.time,
        routeId: this.bookingResult.dptrTrip.route.id,
        busStdDesc: this.bookingResult.dptrTrip.busStd.desc,
        stationDesc: this.bookingResult.dptrTrip.dptrPark.desc,
        platform: this.trips.dptrTrip.platform,
        seatFloor: listDptrTripByReserve.seatFloor.toString(),
        seatNo: listDptrTripByReserve.seatNo.toString(),
        contactName: this.bookingResult.contactName,
        telNo: this.bookingResult.telNo,
        fare: listDptrTripByReserve.fare.toString(),
        fee: listDptrTripByReserve.fee.toString(),
        disFare: listDptrTripByReserve.disFare.toString(),
        disFee: listDptrTripByReserve.disFee.toString(),
        coupon: this.trips.dptrTrip.coupon
      }
    }

    if (this.bookingResult.rtrnTrip != null && this.bookingResult.rtrnTrip != undefined) {

      for (let el of this.bookingResult.rtrnTrip.reserves) {
        listRtrnTripByReserve.passengerName.push(el.passengerName);
        listRtrnTripByReserve.passengerTel.push(el.passengerTel);
        listRtrnTripByReserve.seatFloor.push(el.seatFloor);
        listRtrnTripByReserve.seatNo.push(el.seatNo);
        listRtrnTripByReserve.fare.push(el.fare);
        listRtrnTripByReserve.fee.push(el.fee);
        listRtrnTripByReserve.disFare.push(el.disFare);
        listRtrnTripByReserve.disFee.push(el.disFee);
      }

      this.insertBooking.rtrnTrip = {
        dptrProvinceDesc: this.bookingResult.dptrTrip.dptrProvince.desc,
        dptrParkDesc: this.bookingResult.dptrTrip.dptrPark.desc,
        arrvProvinceDesc: this.bookingResult.dptrTrip.arrvProvince.desc,
        arrvParkDesc: this.bookingResult.dptrTrip.arrvPark.desc,
        dptrTripDate: this.bookingResult.dptrTrip.date,
        dptrTripTime: this.bookingResult.dptrTrip.time,
        routeId: this.bookingResult.dptrTrip.route.id,
        busStdDesc: this.bookingResult.dptrTrip.busStd.desc,
        stationDesc: this.bookingResult.dptrTrip.dptrPark.desc,
        platform: this.trips.dptrTrip.platform,
        seatFloor: listRtrnTripByReserve.seatFloor.toString(),
        seatNo: listRtrnTripByReserve.seatNo.toString(),
        contactName: this.bookingResult.contactName,
        telNo: this.bookingResult.telNo,
        fare: listRtrnTripByReserve.fare.toString(),
        fee: listRtrnTripByReserve.fee.toString(),
        disFare: listRtrnTripByReserve.disFare.toString(),
        disFee: listRtrnTripByReserve.disFee.toString(),
        coupon: this.trips.dptrTrip.coupon
      }
    }

    this.busService.insertBookingInfo(this.insertBooking).subscribe((res) => {
      if (res.code == 0) {
        if(res.transID != undefined && res.transID != '') {
          let CHANNEL_ID = 'C07';
          let param = 'CHANNEL_ID='+CHANNEL_ID+'&TRANSACTION_ID='+res.transID+'&TOTAL_AMT='+this.totalPrice();
          window.parent.postMessage(param,'*');
        }
      } else {
        this.openDialog(res.msg);
        this.isShowLoading = false;
      }
    });

  }
  cancelBooking() {
    this.isShowLoadingBack = true;
    this.confirmSettings = { confirmText: 'ใช่', declineText: 'ไม่ใช่' };
    let isConfirm: any;
    this._confirm.create('กรุณายืนยัน', 'คุณต้องการยกเลิกการจองหรือไม่', this.confirmSettings)
      .subscribe((callback: ConfirmBoxEmit) => {
        if (callback.resolved != undefined && callback.resolved == true) {
          this.executeCancelBooking();
        } else {
          this.isShowLoadingBack = false;
        }
      });
  }

  executeCancelBooking() {
    this.busService.getTransId('C').subscribe((res) => {
      if (res.code == 0) {
        this.busService.cancelBooking(res.data.transId, this.bookingResult.bookId, this.bookingResult.bookCode).subscribe((res) => {
          if (res.code == 0) {
            this.router.navigate(['..'], { relativeTo: this.route });
          } else {
            this.openDialog(this.errorMsgService.getErrorMsg(res.code));
            this.isShowLoadingBack = false;
          }
        });
      } else {
        this.openDialog(this.errorMsgService.getErrorMsg(res.code));
        this.isShowLoadingBack = false;
      }
    });
  }

}
