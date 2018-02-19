import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertsService } from '@jaspero/ng2-alerts';
import { SharedService } from '../../../../shared/services/shared-service.service';
import { BusService } from '../../../../shared/services/bus.service';
import { Location } from '@angular/common';

import { AvailableTripModel } from '../../../../shared/models/bus/availableTripSearch.model';
import { AvailableTripResultModel } from '../../../../shared/models/bus/availableTripResult.model';
import { ProvinceModel } from '../../../../shared/models/bus/province.model';
import { TripModel } from '../../../.././shared/models/bus/trip.model';
import { ErrorMessage } from '../../../../shared/constant/error-message';
import { BusLayoutModel } from '../../../.././shared/models/bus/busLayout.model';
import { MarkSeatModel } from '../../../../shared/models/bus/markSeat.model';
import { TransIdModel } from '../../../../shared/models/bus/transection/transId.model';
import { TransCheckoutModel } from '../../../../shared/models/bus/transCheckout.model';

@Component({
  selector: 'app-select-seat',
  templateUrl: './select-seat.component.html',
  styleUrls: ['./select-seat.component.css'],
  providers: [BusService]
})
export class SelectSeatComponent implements OnInit {

  @Input() tripName: string;
  @Input() dptrPark: string;
  @Input() arrvPark: string;
  dptrProvince: string;
  arrvProvince: string;
  @Input() dptrDate: Date;
  @Input() arrvDate: Date;
  @Input() dptrTime: Date;
  @Input() arrvTime: Date;
  @Input() busLayout: BusLayoutModel;
  totalPassenger: number;
  receiveData: any;

  selectedSeat: any = [];

  errorMessage: ErrorMessage = new ErrorMessage;
  alertSettings: any;
  markSeatModel: MarkSeatModel;
  transId: TransIdModel;

  availableTripResultModel: AvailableTripModel;
  availableTripSearchModel: AvailableTripResultModel;
  selectedDptrProvince: ProvinceModel;
  selectedDptrPark: any = '';
  selectedArrvProvince: ProvinceModel;
  selectedArrvPark: any;
  selectedNumOfPerson: number;
  dptrTrip: any;
  rtrnTrip: any;
  selectedDptrTrip: TripModel;
  selectedRtrnTrip: TripModel;
  trip: TripModel;
  transCheckoutModel: TransCheckoutModel;

  isShowLoading: boolean = false;
  isShowLoadingBack: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _alert: AlertsService,
    private sharedService: SharedService,
    private busService: BusService,
    private location: Location,
  ) { }

  ngOnInit() {
    this.sharedService.receiveData.subscribe(data => this.receiveData = data);
    if (this.receiveData != null) {
      this.dptrPark = this.receiveData.dptrPark;
      this.arrvPark = this.receiveData.arrvPark;
      this.totalPassenger = this.receiveData.totalPassenger;
      this.dptrProvince = this.receiveData.dptrProvince;
      this.arrvProvince = this.receiveData.arrvProvince;
      this.busLayout = this.receiveData.busLayout;
      this.availableTripResultModel = this.receiveData.availableTripResultModel;
      this.availableTripSearchModel = this.receiveData.availableTripSearchModel;
      this.selectedDptrTrip = this.receiveData.dptrTrip;
      this.selectedRtrnTrip = this.receiveData.rtrnTrip;
      if (this.receiveData.tripName == 'dptrTrip') {
        this.tripName = "เที่ยวไป";
        this.dptrDate = this.receiveData.dptrTrip.date;
        this.arrvDate = this.receiveData.dptrTrip.arrvDate;
        this.dptrTime = this.receiveData.dptrTrip.time;
        this.arrvTime = this.receiveData.dptrTrip.arrvTime;
        this.busService.getTransId('M').subscribe((res) => {
          this.transId = res.data;
        });
        this.trip = this.receiveData.dptrTrip;
      } else {
        this.tripName = "เที่ยวกลับ";
        this.dptrDate = this.receiveData.rtrnTrip.date;
        this.arrvDate = this.receiveData.rtrnTrip.arrvDate;
        this.dptrTime = this.receiveData.rtrnTrip.time;
        this.arrvTime = this.receiveData.rtrnTrip.arrvTime;
        this.transId = this.receiveData.transId;
        this.trip = this.receiveData.rtrnTrip;
      }
    }

  }

  openDialog(msg) {
    let type: any = "warning";
    this.alertSettings = { overlay: true, overlayClickToClose: false, showCloseButton: true, duration: 100000 };
    this._alert.create(type, msg, this.alertSettings);
  }

  detailContent: any = {
    emptySeat: "ที่นั่งว่าง กดเลือกที่นั่งตามต้องการ",
    sellSeat: "ที่นั่งถูกสำรองแล้ว",
    markSeat: "ที่นั่งที่เลือก"
  };

  onClick() {
    if (this.selectedSeat.seat.length > 0) {
      if (this.selectedSeat.seat.length < this.totalPassenger) {
        this.openDialog(this.errorMessage.pleaseSelect + 'ที่นั่งให้ครบตามจำนวนคนที่ท่านได้เลือกไว้');
      } else {
        this.isShowLoading = true;
        let layout;
        if (this.tripName == 'เที่ยวไป' && this.receiveData.rtrnTrip != null) {
          this.busService.getBusLayout(this.receiveData.rtrnTrip.id, this.receiveData.rtrnTrip.dptrPark.id, this.receiveData.rtrnTrip.arrvPark.id).subscribe((res) => {
            if (res.code == 0) {
              layout = res.data;
              this.receiveData = {
                transId: this.transId,
                tripName: 'rtrnTrip',
                dptrProvince: this.receiveData.dptrProvince,
                dptrPark: this.receiveData.arrvPark,
                arrvPark: this.receiveData.dptrPark,
                arrvProvince: this.receiveData.arrvProvince,
                busLayout: layout, // layout ของเที่ยวกลับ อันใหม่
                dptrTrip: this.receiveData.dptrTrip, // เที่ยวไป
                rtrnTrip: this.receiveData.rtrnTrip, // เที่ยวกลับ
                totalPassenger: this.receiveData.totalPassenger,
                availableTripResultModel: this.availableTripResultModel,
                availableTripSearchModel: this.availableTripSearchModel,
              }
              this.sharedService.sendData(this.receiveData);
              this.router.navigate(['../selectSeat2'], { relativeTo: this.route });
            } else {
              this.isShowLoading = false;
            }
          });
        } else {
          this.busService.getTransCheckout(this.transId.transId).subscribe((res) => {
            if (res.code == 0) {
              this.transCheckoutModel = res.data;
              let forwardData = {
                forwardData: this.receiveData,
                transId: this.transId,
                transCheckoutModel: this.transCheckoutModel,
                totalPassenger: this.totalPassenger
              }
              this.sharedService.sendData(forwardData);
              this.router.navigate(['../passengerInfomation'], { relativeTo: this.route });
            } else {
              this.isShowLoading = false;
            }
          });
        }
      }
    } else {
      this.openDialog(this.errorMessage.pleaseSelect + 'ที่นั่ง');
    }
  }

  selectSeat(data) {
    this.selectedSeat = data;
  }

  goPreviousPage() {
    this.isShowLoadingBack = true;
    let dataBackSeat;
    let routerUrl;
    if (this.router.url == '/selectSeat') {
      dataBackSeat = {
        availableTripResultModel: this.availableTripResultModel,
        availableTripSearchModel: this.availableTripSearchModel,
        dptrProvince: this.dptrProvince,
        dptrPark: this.dptrPark,
        rtrnProvince: this.arrvProvince,
        rtrnPark: this.arrvPark,
        totalPassenger: this.totalPassenger
      }
      routerUrl = '../selectRound'

    } else {
      dataBackSeat = {
        tripName: 'dptrTrip',
        dptrProvince: this.dptrProvince,
        dptrPark: this.dptrPark,
        arrvPark: this.arrvPark,
        arrvProvince: this.arrvProvince,
        busLayout: this.busLayout,
        availableTripResultModel: this.availableTripResultModel,
        availableTripSearchModel: this.availableTripSearchModel,
        totalPassenger: this.totalPassenger,
        dptrTrip: this.selectedDptrTrip,
        rtrnTrip: this.selectedRtrnTrip
      }
      routerUrl = '../selectSeat'
    }
    this.busService.clearTransSeatMark(this.transId.transId).subscribe((res) => {
      if (res.code == 0) {
        this.sharedService.sendData(dataBackSeat);
        this.router.navigate([routerUrl], { relativeTo: this.route });
      } else {
        this.isShowLoadingBack = false;
      }
    });

  }
}

