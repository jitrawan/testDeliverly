import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { AlertsService } from '@jaspero/ng2-alerts';
import { ErrorMsgService } from '../../../../shared/services/errorMsg.service';

import { ErrorMessage } from '../../../../shared/constant/error-message';
import { Constant } from '../../../../shared/constant/constant';
import { PassengerInformationModel } from '../../../../shared/models/bus/passengerInformation.model';
import { TransCheckoutModel } from '../../../../shared/models/bus/transCheckout.model';
import { PassengerBookingModel } from '../../../../shared/models/bus/passengerBooking.model';
import { BookingResultModel } from '../../../../shared/models/bus/bookingResult.model';
import { TransIdModel } from '../../../../shared/models/bus/transaction/transId.model'

import { SharedService } from '../../../../shared/services/shared-service.service';
import { BusService } from '../../../../shared/services/bus.service';

@Component({
  selector: 'app-passenger-information',
  templateUrl: './passenger-information.component.html',
  styleUrls: ['./passenger-information.component.css', '../buy-ticket/buy-ticket.component.css']
})
export class PassengerInformationComponent implements OnInit {

  @Input() totalPassenger: number = 1;
  numOfPassengerBox: any[];
  passengerInfoList = new Array<PassengerInformationModel>();
  errorMessage = new ErrorMessage;
  const = new Constant;
  alertSettings: any;
  receiveData: any;
  transId: TransIdModel;
  transCheckoutModel: TransCheckoutModel;
  passengerBookingModel: PassengerBookingModel;
  trips: any;
  bookingResultModel: BookingResultModel;
  isShowLoading: boolean = false;
  isShowLoadingBack: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private sharedService: SharedService,
    private errorMsgService: ErrorMsgService,
    private busService: BusService,
    private _alert: AlertsService,
    private location: Location
  ) { }

  ngOnInit() {
    this.sharedService.receiveData.subscribe(data => this.receiveData = data);
    this.trips = this.receiveData.forwardData;
    this.totalPassenger = this.receiveData.totalPassenger;
    this.transId = this.receiveData.transId;
    this.numOfPassengerBox = Array(Number(this.totalPassenger)).fill('');
    this.transCheckoutModel = this.receiveData.transCheckoutModel;

    for (let index = 0; index < this.totalPassenger; index++) {
      let passengerInfoModel: PassengerInformationModel = new PassengerInformationModel;
      this.passengerInfoList.push(passengerInfoModel);
      let receiveData;
      this.sharedService.receiveData.subscribe(data => receiveData = data);
      this.receiveData = receiveData.forwardData;
    }
  }

  onlyNumberKey(event) {
    let charCode = (event.which) ? event.which : event.keyCode;
    if (charCode != 46 && charCode > 31
      && (charCode < 48 || charCode > 57)) {
      this.openDialog(this.errorMessage.pleaseSelect + 'ตัวเลข');
      return false;
    }
    return true;
  }

  openDialog(msg) {
    let type: any = "warning";
    this.alertSettings = { overlay: true, overlayClickToClose: false, showCloseButton: true, duration: 100000 };
    this._alert.create(type, msg, this.alertSettings);
    jQuery('html,body', window.parent.document).animate({
      scrollTop: jQuery("#alert-box .jaspero__dialog").offset().top - 100
    }, 300);
  }

  nextPage() {
    var isFound = false;
    for (let index = 0; index < this.passengerInfoList.length && !isFound; index++) {
      if (this.passengerInfoList[index].gender == undefined) {
        this.openDialog(this.errorMessage.pleaseSelect + 'เพศ ' + 'ของผู้โดยสารคนที่ ' + (index + 1));
        isFound = true;
      } else if (this.passengerInfoList[index].passengerName == undefined) {
        this.openDialog(this.errorMessage.pleaseSelect + 'ชื่อ ' + 'ของผู้โดยสารคนที่ ' + (index + 1));
        isFound = true;
      } else if (this.passengerInfoList[index].passengerSurname == undefined) {
        this.openDialog(this.errorMessage.pleaseSelect + 'นามสกุล ' + 'ของผู้โดยสารคนที่ ' + (index + 1));
        isFound = true;
      } else if (this.passengerInfoList[index].passengerTel == undefined) {
        this.openDialog(this.errorMessage.pleaseSelect + 'เบอร์มือถือ ' + 'ของผู้โดยสารคนที่ ' + (index + 1));
        isFound = true;
      } else if (this.passengerInfoList[index].passengerTel.length < 10) {
        this.openDialog('เบอร์มือถือ ' + 'ของผู้โดยสารคนที่ ' + (index + 1) + ' ต้องมี 10 ตัวอักษร');
        isFound = true;
      } else if (this.validatePhoneNumber(this.passengerInfoList[index].passengerTel)) {
        this.openDialog('เบอร์มือถือ ' + 'ของผู้โดยสารคนที่ ' + (index + 1) + ' '+this.errorMessage.wrongFormat);
        isFound = true;
      }
    }
    if (!isFound) {
      this.isShowLoading = true;
      this.prepareDataForBooking();
      this.busService.booking(this.passengerBookingModel).subscribe((res) => {
        if (res.code == this.const.successCode) {
          this.bookingResultModel = res.data;
          let forwardData = {
            forwardData: this.trips,
            bookingResultModel: this.bookingResultModel,
            transId: this.transId
          }
          this.sharedService.sendData(forwardData);
          this.router.navigate(['/summary'], { relativeTo: this.route });
        } else {
          this.openDialog(this.errorMsgService.getErrorMsg(res.code));
          this.isShowLoading = false;
        }
      },
        (err) => {
          this.openDialog(this.errorMsgService.getErrorMsg(err.code));
        }
      );
    }
  }

  validatePhoneNumber(phoneNumber: string) {
    for (var i = 0; i < phoneNumber.length; i++ ) {
			if ( ((i == 0) && (phoneNumber.charCodeAt(i) == 48)) || ((i == 1) && (phoneNumber.charCodeAt(i) == 56) && (phoneNumber.charCodeAt(i) == 57) && (i == 1) && (phoneNumber.charCodeAt(i) == 54)) ) {
				return false;
			}
    }
    return true;
  }
  prepareDataForBooking() {
    this.passengerBookingModel = new PassengerBookingModel;
    this.passengerBookingModel.transId = this.transId.transId;
    if (this.transCheckoutModel.rtrnTrip != null) {
      this.passengerBookingModel.tripCnt = "2";
    } else {
      this.passengerBookingModel.tripCnt = "1";
    }
    this.passengerBookingModel.contactName = this.passengerInfoList[0].passengerName + ' ' + this.passengerInfoList[0].passengerSurname;
    this.passengerBookingModel.telNo = this.passengerInfoList[0].passengerTel;

    this.passengerBookingModel.seatCnt = [];
    this.passengerBookingModel.pickupPark = [];
    this.passengerBookingModel.reserveId = [];
    this.passengerBookingModel.gender = [];
    this.passengerBookingModel.passengerName = [];
    this.passengerBookingModel.passengerTel = [];

    this.passengerBookingModel.seatCnt.push(this.totalPassenger + '');
    this.passengerBookingModel.pickupPark.push(this.transCheckoutModel.dptrTrip.dptrPark.id);
    for (let index = 0; index < this.transCheckoutModel.dptrTrip.reserves.length; index++) {
      this.passengerBookingModel.reserveId.push(this.transCheckoutModel.dptrTrip.reserves[index].reserveId);
      this.passengerBookingModel.gender.push(this.passengerInfoList[index].gender);
      this.passengerBookingModel.passengerName.push(this.passengerInfoList[index].passengerName + ' ' + this.passengerInfoList[index].passengerSurname);
      this.passengerBookingModel.passengerTel.push(this.passengerInfoList[index].passengerTel);
    }

    if (this.transCheckoutModel.rtrnTrip != null) {
      this.passengerBookingModel.seatCnt.push(this.totalPassenger + '');
      this.passengerBookingModel.pickupPark.push(this.transCheckoutModel.rtrnTrip.dptrPark.id);
      for (let index = 0; index < this.transCheckoutModel.rtrnTrip.reserves.length; index++) {
        this.passengerBookingModel.reserveId.push(this.transCheckoutModel.rtrnTrip.reserves[index].reserveId);
        this.passengerBookingModel.gender.push(this.passengerInfoList[index].gender);
        this.passengerBookingModel.passengerName.push(this.passengerInfoList[index].passengerName + ' ' + this.passengerInfoList[index].passengerSurname);
        this.passengerBookingModel.passengerTel.push(this.passengerInfoList[index].passengerTel);
      }
    }
  }

  goPreviousPage() {
    this.isShowLoadingBack = true;
    this.busService.clearTransSeatMark(this.transId.transId).subscribe((res) => {
      if (res.code == this.const.successCode) {
        this.busService.getBusLayout(
          this.trips.dptrTrip.id,
          this.trips.dptrTrip.dptrPark.id,
          this.trips.dptrTrip.arrvPark.id
        ).subscribe((res) => {
          if (res.code == this.const.successCode) {
            let busLayout = res.data;
            let forwardData = {
              tripName: 'dptrTrip',
              dptrProvince: this.trips.dptrProvince,
              dptrPark: this.trips.dptrPark,
              arrvProvince: this.trips.arrvProvince,
              arrvPark: this.trips.arrvPark,
              availableTripResultModel: this.trips.availableTripResultModel,
              availableTripSearchModel: this.trips.availableTripSearchModel,
              busLayout: busLayout, // layout เที่ยวไป
              dptrTrip: this.trips.dptrTrip, // เที่ยวไป
              rtrnTrip: this.trips.rtrnTrip, // เที่ยวกลับ
              totalPassenger: this.trips.totalPassenger
            };
            this.sharedService.sendData(forwardData);
            this.router.navigate(['/selectSeat'], { relativeTo: this.route });
          } else {
            this.openDialog(this.errorMsgService.getErrorMsg(res.code));
            this.isShowLoadingBack = false;
          }
        },
          (err) => {
            this.openDialog(this.errorMsgService.getErrorMsg(err.code));
          }
          );
      } else {
        this.openDialog(this.errorMsgService.getErrorMsg(res.code));
        this.isShowLoadingBack = false;
      }
    },
      (err) => {
        this.openDialog(this.errorMsgService.getErrorMsg(err.code));
      }
    );
  }
}


