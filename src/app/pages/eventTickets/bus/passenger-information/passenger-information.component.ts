import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { AlertsService } from '@jaspero/ng2-alerts';

import { ErrorMessage } from '../../../../shared/constant/error-message';
import { PassengerInformationModel } from '../../../../shared/models/bus/passengerInformation.model';
import { TransCheckoutModel } from '../../../../shared/models/bus/transCheckout.model';
import { PassengerBookingModel } from '../../../../shared/models/bus/passengerBooking.model';
import { BookingResultModel } from '../../../../shared/models/bus/bookingResult.model';
import { TransIdModel } from '../../../../shared/models/bus/transection/transId.model';

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
  // isDisplay: boolean = true;
  alertSettings: any;
  tripName: any;
  receiveData: any;
  transId: TransIdModel;
  transCheckoutModel: TransCheckoutModel;
  passengerBookingModel: PassengerBookingModel;
  trips: any;
  bookingResultModel: BookingResultModel;


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private sharedService: SharedService,
    private busService: BusService,
    private _alert: AlertsService,
    private location: Location,
  ) { }

  ngOnInit() {
    this.sharedService.receiveData.subscribe(data => this.receiveData = data);
    console.log('this.receiveData >>>>', this.receiveData);
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
      }
    }
    if (!isFound) {
      this.prepareDataForBooking();
      this.busService.booking(this.passengerBookingModel).subscribe((res) => {
        if (res.code == 0) {
          this.bookingResultModel = res.data;
          console.log('this.bookingResultModel >>>', this.bookingResultModel);
          this.sharedService.sendData(this.bookingResultModel);
          this.router.navigate(['../summary'], { relativeTo: this.route });
        } else {
          this.openDialog(res.msg);
        }
      });

    }
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
    this.location.back();
  }
}


