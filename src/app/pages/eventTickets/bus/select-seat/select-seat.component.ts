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
  trip: any;



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
    console.log('this.receiveData >>>', this.receiveData);
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
          console.log('>>>>', res.data);
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

  // markSeat(trip, tripName,) {
  //   // this.busService.getTransId('M').subscribe((res) => {
  //   // console.log('>>>>', res.data);
  //   // this.transId = res.data;
  //   this.markSeatModel = new MarkSeatModel();
  //   this.markSeatModel.transId = this.transId.transId;
  //   this.markSeatModel.tripId = trip.id;
  //   this.markSeatModel.pickup = trip.dptrPark.id;
  //   this.markSeatModel.pickupDesc = trip.dptrPark.id;
  //   this.markSeatModel.dropoff = trip.arrvPark.id;
  //   this.markSeatModel.dropoffDesc = trip.arrvPark.id;
  //   this.markSeatModel.seatCnt = this.receiveData.totalPassenger;
  //   this.markSeatModel.seatFloor = [this.selectedSeat.pos.z];
  //   this.markSeatModel.seatNo = [this.selectedSeat.name];
  //   this.markSeatModel.gender = ['N']
  //   // for (let index = 0; index < this.selectedSeat.length; index++) {
  //   //   this.markSeatModel.seatFloor.push(this.selectedSeat[index].pos.z);
  //   //   this.markSeatModel.seatNo.push(this.selectedSeat[index].name);
  //   // }
  //   // this.markSeatModel.gender = Array(Number(this.receiveData.totalPassenger)).fill('N');
  //   console.log(' this.markSeat >>', this.markSeatModel);
  //   this.busService.markSeat(this.markSeatModel).subscribe((res) => {
  //     if (res.code == 0) {
  //       console.log('res markseat CALL API >>>', res);
  //       if (tripName == 'rtrnTrip' || this.receiveData.rtrnTrip == null) {
  //         let dataForSend = {
  //           totalPassenger: this.receiveData.totalPassenger,
  //           transId: this.transId
  //         }
  //         this.sharedService.sendData(dataForSend);
  //         this.router.navigate(['../passengerInfomation'], { relativeTo: this.route });
  //       }
  //     } else {
  //       console.log('error ---- res markseat CALL API >>>', res);
  //       this.openDialog(res.msg);
  //     }
  //   });
  //   // });
  // }
  onClick() {
    if (this.selectedSeat.seat.length > 0) {
      if (this.selectedSeat.seat.length < this.totalPassenger) {
        this.openDialog(this.errorMessage.pleaseSelect + 'ที่นั่งให้ครบตามจำนวนคนที่ท่านได้เลือกไว้');
      } else {
        let layout;
        if (this.tripName == 'เที่ยวไป' && this.receiveData.rtrnTrip != null) {
          this.busService.getBusLayout(this.receiveData.rtrnTrip.id, this.receiveData.rtrnTrip.dptrPark.id, this.receiveData.rtrnTrip.arrvPark.id).subscribe((res) => {
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
            console.log('data to send >>', this.receiveData);
            this.router.navigate(['../selectSeat2'], { relativeTo: this.route });
          });
        } else {
          let forwardData = {
            forwardData: this.receiveData,
          }
          this.sharedService.sendData(forwardData);
          this.router.navigate(['../passengerInfomation'], { relativeTo: this.route });
        }
      }
    } else {
      this.openDialog(this.errorMessage.pleaseSelect + 'ที่นั่ง');
    }
  }

  selectSeat(data) {
    console.log('.... selece seat .....', data);
    this.selectedSeat = data;
  }

  goPreviousPage() {
    if (this.router.url == '/selectSeat') {
      let dataBackRound = {
        availableTripResultModel: this.availableTripResultModel,
        availableTripSearchModel: this.availableTripSearchModel,
        dptrProvince: this.dptrProvince,
        dptrPark: this.dptrPark,
        rtrnProvince: this.arrvProvince,
        rtrnPark: this.arrvPark,
        totalPassenger: this.totalPassenger,
      }
      this.sharedService.sendData(dataBackRound);
      this.location.back();
    } else {
      let dataBackSeat = {
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
        rtrnTrip: this.selectedRtrnTrip,
      }
      this.sharedService.sendData(dataBackSeat);
      this.location.back();
    }
  }
}

