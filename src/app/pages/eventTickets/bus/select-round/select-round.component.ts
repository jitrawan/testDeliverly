import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe, Location } from '@angular/common';

/* ---------------------------------- services -------------------*/
import { BusService } from '../../../../shared/services/bus.service';
import { ErrorMsgService } from '../../../../shared/services/errorMsg.service';
import { SharedService } from '../../../../shared/services/shared-service.service';
import { AlertsService } from '@jaspero/ng2-alerts';

/* ---------------------------------- models -------------------*/
import { AvailableTripResultModel } from '../../../../shared/models/bus/availableTripResult.model';
import { AvailableTripModel } from '../../../../shared/models/bus/availableTripSearch.model';
import { BusLayoutModel } from '../../../.././shared/models/bus/busLayout.model';
import { TripModel } from '../../../.././shared/models/bus/trip.model';
import { ErrorMessage } from '../../../../shared/constant/error-message';
import { Constant } from '../../../../shared/constant/constant';
import { log } from 'util';

import { BuyTicketComponent } from '../buy-ticket/buy-ticket.component';

@Component({
  selector: 'app-select-round',
  templateUrl: './select-round.component.html',
  styleUrls: ['./select-round.component.css', '../buy-ticket/buy-ticket.component.css'],
  providers: [BusService]

})
export class SelectRoundComponent implements OnInit {
  availableTripResultModel: AvailableTripResultModel;
  availableTripSearchModel: AvailableTripModel;
  dptrProvince: any;
  dptrPark: any;
  rtrnProvince: any;
  rtrnPark: any;
  totalPassenger = 1;

  dptrDate: any[] = [];
  rtrnDate: any[] = [];
  dptrFare: number = 0;
  rtrnFare: number = 0;
  fee: number = 0;

  selectedDptrTrip: TripModel;
  selectedRtrnTrip: TripModel;

  errorMessage: ErrorMessage = new ErrorMessage;
  const = new Constant;
  alertSettings: any;
  busLayout: BusLayoutModel;

  dptrTableLoading: boolean = false;
  retrnTableLoading: boolean = false;
  isShowLoading: boolean = false;
  isShowLoadingBack: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private busService: BusService,
    private errorMsgService: ErrorMsgService,
    private sharedService: SharedService,
    private _alert: AlertsService,
    private datePipe: DatePipe,
    private location: Location,
    private buyTicketComponent: BuyTicketComponent

  ) { }

  ngOnInit() {
    let receiveData;
    this.sharedService.receiveData.subscribe(data => receiveData = data);
    this.availableTripResultModel = receiveData.availableTripResultModel;
    this.availableTripSearchModel = receiveData.availableTripSearchModel;
    this.dptrProvince = receiveData.dptrProvince;
    this.dptrPark = receiveData.dptrPark;
    this.rtrnProvince = receiveData.rtrnProvince;
    this.rtrnPark = receiveData.rtrnPark;
    this.totalPassenger = receiveData.totalPassenger;
    if (this.availableTripResultModel != undefined) {
      this.dptrDate = this.setCalendar(this.convertStringToDate(this.availableTripResultModel.dptrTrips.tripDate));
      if (this.availableTripResultModel.rtrnTrips != null) {
        this.rtrnDate = this.setCalendar(this.convertStringToDate(this.availableTripResultModel.rtrnTrips.tripDate));
      }
    }
  }
  getAvailableTrip(availableTripSearch) {
    this.busService.getAvailableTrip(availableTripSearch).subscribe((res) => {
      if (res.code == this.const.successCode) {
        this.dptrTableLoading = false;
        this.retrnTableLoading = false;
        this.availableTripResultModel = res.data;
        this.dptrDate = this.setCalendar(this.convertStringToDate(this.availableTripResultModel.dptrTrips.tripDate));
        if (this.availableTripResultModel.rtrnTrips != null) {
          this.rtrnDate = this.setCalendar(this.convertStringToDate(this.availableTripResultModel.rtrnTrips.tripDate));
        }
      } else {
        this.openDialog(this.errorMsgService.getErrorMsg(res.code));
        this.dptrTableLoading = false;
        this.retrnTableLoading = false;
      }
    },
      (err) => {
        this.openDialog(this.errorMsgService.getErrorMsg(err.code));
      }
    );
  }

  convertStringToNumber(str) {
    return Number(str);
  }

  convertStringToDate(str) {
    return new Date(str);
  }

  setCalendar(date) {
    let day = new Date(date).getDate();
    let dateList = [];
    for (let d = -2; d <= 2; d++) {
      dateList.push(new Date(date).setDate(day + d));
    }
    return dateList;
  }

  selectDptrTrip(data) {
    this.selectedDptrTrip = data;
    this.selectedRtrnTrip = undefined;
    this.dptrFare = this.convertStringToNumber(this.selectedDptrTrip.fare) + this.convertStringToNumber(this.selectedDptrTrip.fee);
    this.fee = 15;
  }

  selectRtrnTrip(data, event) {
    if (this.selectedDptrTrip == undefined) {
      event.target.checked = false;
      this.openDialog("กรุณาเลือกวันเดินทางไป");
    } else {
      if (this.selectedDptrTrip.arrvDate != null && this.selectedDptrTrip.arrvTime && data != undefined) {
        var selectedDptrDate = new Date(this.selectedDptrTrip.arrvDate + " " + this.selectedDptrTrip.arrvTime);
        var selectedRtrnDate = new Date(data.arrvDate + " " + data.arrvTime);
        if (selectedDptrDate > selectedRtrnDate) {
          event.target.checked = false;
          this.openDialog('กรุณาเลือกเที่ยวกลับ ที่มีวันและเวลา มากกว่าเที่ยวไป');
          return;
        }
      }
      this.selectedRtrnTrip = data;
      this.rtrnFare = this.convertStringToNumber(this.selectedRtrnTrip.fare) + this.convertStringToNumber(this.selectedRtrnTrip.fee);
      this.fee = 15;
    }
  }

  openDialog(msg) {
    let type: any = "warning";
    this.alertSettings = { overlay: true, overlayClickToClose: false, showCloseButton: true, duration: 100000 };
    this._alert.create(type, msg, this.alertSettings);
    jQuery('html,body', window.parent.document).animate({
      scrollTop: jQuery("#alert-box .jaspero__dialog").offset().top - 100
    }, 300);
  }

  checkAuthen() {
    this.busService.checkAuthen(window.location.host).subscribe((response) => {
      if (response.result) {
        this.getBusLayoutToNextPage();
      } else {
        this.isShowLoading = false;
        parent.window.receiveMessage('showLogin');
      }
    },
      (err) => {
        this.openDialog(this.errorMsgService.getErrorMsg(err.code));
        this.isShowLoading = false;
      }
    );
  }

  goNextPage() {
    if (this.selectedDptrTrip == undefined) {
      this.openDialog(this.errorMessage.pleaseSelect + 'วันที่และเวลาเดินทางไป');
    } else if (this.availableTripResultModel.rtrnTrips != null && this.selectedRtrnTrip == undefined) {
      this.openDialog(this.errorMessage.pleaseSelect + 'วันที่และเวลาเดินทางกลับ');
    } else {
      this.isShowLoading = true;
      if (sessionStorage.getItem("paymentChannel") == "C07") {
        this.checkAuthen();
      } else {
        this.getBusLayoutToNextPage();
      }
    }
  }

  getBusLayoutToNextPage() {
    this.busService.getBusLayout(this.selectedDptrTrip.id, this.selectedDptrTrip.dptrPark.id, this.selectedDptrTrip.arrvPark.id).subscribe((res) => {
      if (res.code == this.const.successCode) {
        this.busLayout = res.data;
        let dataListForPassNextPage = {
          tripName: 'dptrTrip',
          dptrProvince: this.dptrProvince,
          dptrPark: this.dptrPark,
          arrvProvince: this.rtrnProvince,
          arrvPark: this.rtrnPark,
          availableTripResultModel: this.availableTripResultModel,
          availableTripSearchModel: this.availableTripSearchModel,
          busLayout: this.busLayout, // layout เที่ยวไป
          dptrTrip: this.selectedDptrTrip, // เที่ยวไป
          rtrnTrip: this.selectedRtrnTrip, // เที่ยวกลับ
          totalPassenger: this.totalPassenger
        };
        this.sharedService.sendData(dataListForPassNextPage);
        this.router.navigate(['/selectSeat'], { relativeTo: this.route });
      } else {
        this.openDialog(this.errorMsgService.getErrorMsg(res.code));
        this.isShowLoading = false;
      }
    },
      (err) => {
        this.openDialog(this.errorMsgService.getErrorMsg(err.code));
        this.isShowLoading = false;
      }
    );
  }

  searchTrips(tripType, tripDate) {
    if (new Date(new Date().setHours(0, 0, 0, 0)) <= new Date(new Date(tripDate).setHours(0, 0, 0, 0))) {
      if (this.availableTripResultModel.rtrnTrips != null) {
        if (tripType == 'dptr') {
          if (new Date(tripDate) > new Date(this.availableTripResultModel.rtrnTrips.tripDate)) {
            this.openDialog(this.errorMessage.pleaseSelect + 'วันที่ไปน้อยกว่าวันที่กลับ');
          } else {
            this.availableTripSearchModel.departDate = this.datePipe.transform(tripDate, 'yyyy-MM-dd');
            this.availableTripSearchModel.returnDate = this.availableTripSearchModel.returnDate;
            this.availableTripSearchModel.pickup = this.availableTripSearchModel.pickup;
            this.availableTripSearchModel.pickupDesc = this.availableTripSearchModel.pickupDesc;
            this.availableTripSearchModel.dropoff = this.availableTripSearchModel.dropoff;
            this.availableTripSearchModel.dropoffDesc = this.availableTripSearchModel.dropoffDesc;
            this.availableTripSearchModel.tripType = this.availableTripSearchModel.tripType;
            this.dptrTableLoading = true;
            this.selectedDptrTrip = undefined;
            this.dptrFare = 0;

            this.getAvailableTrip(this.availableTripSearchModel);
          }
        } else if (tripType == 'rtrn') {
          if (new Date(tripDate) < new Date(this.availableTripResultModel.dptrTrips.tripDate)) {
            this.openDialog(this.errorMessage.pleaseSelect + 'วันที่กลับมากกว่าวันที่ไป');
          } else {
            this.availableTripSearchModel.departDate = this.availableTripSearchModel.departDate;
            this.availableTripSearchModel.returnDate = this.datePipe.transform(tripDate, 'yyyy-MM-dd');
            this.availableTripSearchModel.pickup = this.availableTripSearchModel.pickup;
            this.availableTripSearchModel.pickupDesc = this.availableTripSearchModel.pickupDesc;
            this.availableTripSearchModel.dropoff = this.availableTripSearchModel.dropoff;
            this.availableTripSearchModel.dropoffDesc = this.availableTripSearchModel.dropoffDesc;
            this.availableTripSearchModel.tripType = this.availableTripSearchModel.tripType;
            this.retrnTableLoading = true;
            this.selectedRtrnTrip = undefined;
            this.rtrnFare = 0;
            this.getAvailableTrip(this.availableTripSearchModel);
          }
        }
      } else {
        this.availableTripSearchModel.departDate = this.datePipe.transform(tripDate, 'yyyy-MM-dd');
        this.availableTripSearchModel.returnDate = this.availableTripSearchModel.returnDate;
        this.availableTripSearchModel.pickup = this.availableTripSearchModel.pickup;
        this.availableTripSearchModel.pickupDesc = this.availableTripSearchModel.pickupDesc;
        this.availableTripSearchModel.dropoff = this.availableTripSearchModel.dropoff;
        this.availableTripSearchModel.dropoffDesc = this.availableTripSearchModel.dropoffDesc;
        this.availableTripSearchModel.tripType = this.availableTripSearchModel.tripType;
        this.dptrTableLoading = true;
        this.selectedDptrTrip = undefined;
        this.dptrFare = 0;
        this.getAvailableTrip(this.availableTripSearchModel);
      }
    }
  }

  goPreviousPage() {
    this.isShowLoadingBack = true;
    this.buyTicketComponent.checkTime();
    this.router.navigate([''], { relativeTo: this.route });
  }

}
