import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertsService } from '@jaspero/ng2-alerts';
import { ErrorMessage } from '../../../../shared/constant/error-message';
import { BusLayoutModel } from '../../../.././shared/models/bus/busLayout.model';
import { SharedService } from '../../../../shared/services/shared-service.service';
import { Location } from '@angular/common';

import { AvailableTripModel } from '../../../../shared/models/bus/availableTripSearch.model';
import { AvailableTripResultModel } from '../../../../shared/models/bus/availableTripResult.model';
import { ProvinceModel } from '../../../../shared/models/bus/province.model';
@Component({
  selector: 'app-select-seat',
  templateUrl: './select-seat.component.html',
  styleUrls: ['./select-seat.component.css']
})
export class SelectSeatComponent implements OnInit {

  // @Input() tripName: string;
  @Input() dptrPark: string;
  @Input() arrvPark: string;
  dptrProvince: string;
  arrvProvince: string;
  @Input() dptrDate: Date;
  @Input() arrvDate: Date;
  @Input() dptrTime: Date;
  @Input() arrvTime: Date;
  @Input() busLayout: BusLayoutModel;


  selectedSeat: any[] = [];

  errorMessage: ErrorMessage = new ErrorMessage;
  alertSettings: any;

  availableTripResultModel: AvailableTripModel = new AvailableTripModel;
  availableTripSearchModel: AvailableTripResultModel;
  selectedDptrProvince: ProvinceModel;
  selectedDptrPark: any = '';
  selectedArrvProvince: ProvinceModel;
  selectedArrvPark: any;
  selectedNumOfPerson: number;
  totalPassenger: any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _alert: AlertsService,
    private sharedService: SharedService,
    private location: Location,
  ) { }

  ngOnInit() {
    let receiveData;
    this.sharedService.receiveData.subscribe(data => receiveData = data);
    // console.log('receiveData >>', receiveData);
    this.dptrPark = receiveData.dptrPark;
    this.arrvPark = receiveData.arrvPark;
    this.dptrDate = receiveData.dptrDate;
    this.arrvDate = receiveData.arrvDate;
    this.dptrTime = receiveData.dptrTime;
    this.arrvTime = receiveData.arrvTime;
    this.dptrProvince = receiveData.dptrProvince;
    this.arrvProvince = receiveData.arrvProvince;
    this.busLayout = receiveData.busLayout;
    this.totalPassenger = receiveData.totalPassenger;
    this.availableTripResultModel = receiveData.availableTripResultModel;
    this.availableTripSearchModel = receiveData.availableTripSearchModel;
    // this.tripName = "เที่ยวไป";
  }

  // dptrProvince: this.dptrProvince,
  // dptrPark: this.dptrPark,
  // arrvProvince: this.rtrnProvince,
  // arrvPark: this.rtrnPark,
  // busLayout: this.busLayout,
  // arrvDate: this.selectedDptrTrip.arrvDate,
  // arrvTime: this.selectedDptrTrip.arrvTime,
  // dptrDate: this.selectedDptrTrip.date,
  // dptrTime: this.selectedDptrTrip.time,
  // totalPassenger: this.totalPassenger,
  // availableTripResultModel: this.availableTripResultModel,
  // availableTripSearchModel: this.availableTripSearchModel,


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

  // data: BusLayoutModel = {
  //   id: "224",
  //   code: "4202",
  //   desc: "ม.4(ข)46ที่นั่ง/กรต.ปี56",
  //   std: {
  //     "id": "6",
  //     "desc": "ม.4ข"
  //   },
  //   totalFloor: 2,
  //   totalSeat: 46,
  //   cols: 5,
  //   rows: 11,
  //   platform: "32",
  //   objects: [
  //     {
  //       type: 1,
  //       pos: {
  //         x: 1,
  //         y: 10,
  //         z: 2
  //       },
  //       dim: {
  //         h: 1,
  //         w: 1
  //       },
  //       name: "A7",
  //       reserveId: "",
  //       status: "",
  //       gender: "N"
  //     },
  //     {
  //       "type": 1,
  //       "pos": {
  //         "x": 1,
  //         "y": 11,
  //         "z": 2
  //       },
  //       "dim": {
  //         "h": 1,
  //         "w": 1
  //       },
  //       "name": "A8",
  //       "reserveId": "",
  //       "status": "",
  //       "gender": "N"
  //     },
  //     {
  //       "type": 1,
  //       "pos": {
  //         "x": 2,
  //         "y": 2,
  //         "z": 2
  //       },
  //       "dim": {
  //         "h": 1,
  //         "w": 1
  //       },
  //       "name": "B1",
  //       "reserveId": "",
  //       "status": "",
  //       "gender": ""
  //     },
  //     {
  //       "type": 1,
  //       "pos": {
  //         "x": 2,
  //         "y": 3,
  //         "z": 2
  //       },
  //       "dim": {
  //         "h": 1,
  //         "w": 1
  //       },
  //       "name": "B2",
  //       "reserveId": "",
  //       "status": "",
  //       "gender": "F"
  //     },
  //     {
  //       "type": 1,
  //       "pos": {
  //         "x": 2,
  //         "y": 4,
  //         "z": 1
  //       },
  //       "dim": {
  //         "h": 1,
  //         "w": 1
  //       },
  //       "name": "B1",
  //       "reserveId": "",
  //       "status": "",
  //       "gender": ""
  //     },
  //     {
  //       "type": 1,
  //       "pos": {
  //         "x": 2,
  //         "y": 4,
  //         "z": 2
  //       },
  //       "dim": {
  //         "h": 1,
  //         "w": 1
  //       },
  //       "name": "B3",
  //       "reserveId": "",
  //       "status": "",
  //       "gender": "M"
  //     },
  //     {
  //       "type": 1,
  //       "pos": {
  //         "x": 2,
  //         "y": 5,
  //         "z": 1
  //       },
  //       "dim": {
  //         "h": 1,
  //         "w": 1
  //       },
  //       "name": "B2",
  //       "reserveId": "",
  //       "status": "",
  //       "gender": ""
  //     },
  //     {
  //       "type": 1,
  //       "pos": {
  //         "x": 2,
  //         "y": 5,
  //         "z": 2
  //       },
  //       "dim": {
  //         "h": 1,
  //         "w": 1
  //       },
  //       "name": "B4",
  //       "reserveId": "",
  //       "status": "",
  //       "gender": "O"
  //     },
  //     {
  //       "type": 1,
  //       "pos": {
  //         "x": 2,
  //         "y": 8,
  //         "z": 2
  //       },
  //       "dim": {
  //         "h": 1,
  //         "w": 1
  //       },
  //       "name": "B5",
  //       "reserveId": "",
  //       "status": "",
  //       "gender": ""
  //     },
  //     {
  //       "type": 1,
  //       "pos": {
  //         "x": 2,
  //         "y": 9,
  //         "z": 2
  //       },
  //       "dim": {
  //         "h": 1,
  //         "w": 1
  //       },
  //       "name": "B6",
  //       "reserveId": "",
  //       "status": "",
  //       "gender": ""
  //     },
  //     {
  //       "type": 1,
  //       "pos": {
  //         "x": 2,
  //         "y": 10,
  //         "z": 2
  //       },
  //       "dim": {
  //         "h": 1,
  //         "w": 1
  //       },
  //       "name": "B7",
  //       "reserveId": "",
  //       "status": "",
  //       "gender": ""
  //     },
  //     {
  //       "type": 1,
  //       "pos": {
  //         "x": 2,
  //         "y": 11,
  //         "z": 2
  //       },
  //       "dim": {
  //         "h": 1,
  //         "w": 1
  //       },
  //       "name": "B8",
  //       "reserveId": "",
  //       "status": "",
  //       "gender": ""
  //     },
  //     {
  //       "type": 2,
  //       "pos": {
  //         "x": 4,
  //         "y": 1,
  //         "z": 1
  //       },
  //       "dim": {
  //         "h": 1,
  //         "w": 2
  //       },
  //       "name": "พขร.",
  //       "reserveId": "",
  //       "status": "",
  //       "gender": ""
  //     },
  //     {
  //       "type": 1,
  //       "pos": {
  //         "x": 4,
  //         "y": 1,
  //         "z": 2
  //       },
  //       "dim": {
  //         "h": 1,
  //         "w": 1
  //       },
  //       "name": "C1",
  //       "reserveId": "",
  //       "status": "",
  //       "gender": ""
  //     },
  //     {
  //       "type": 1,
  //       "pos": {
  //         "x": 4,
  //         "y": 2,
  //         "z": 2
  //       },
  //       "dim": {
  //         "h": 1,
  //         "w": 1
  //       },
  //       "name": "C2",
  //       "reserveId": "",
  //       "status": "",
  //       "gender": ""
  //     },
  //     {
  //       "type": 1,
  //       "pos": {
  //         "x": 4,
  //         "y": 3,
  //         "z": 2
  //       },
  //       "dim": {
  //         "h": 1,
  //         "w": 1
  //       },
  //       "name": "C3",
  //       "reserveId": "",
  //       "status": "",
  //       "gender": ""
  //     },
  //     {
  //       "type": 1,
  //       "pos": {
  //         "x": 4,
  //         "y": 4,
  //         "z": 1
  //       },
  //       "dim": {
  //         "h": 1,
  //         "w": 1
  //       },
  //       "name": "C1",
  //       "reserveId": "",
  //       "status": "",
  //       "gender": ""
  //     },
  //     {
  //       "type": 1,
  //       "pos": {
  //         "x": 4,
  //         "y": 4,
  //         "z": 2
  //       },
  //       "dim": {
  //         "h": 1,
  //         "w": 1
  //       },
  //       "name": "C4",
  //       "reserveId": "",
  //       "status": "",
  //       "gender": ""
  //     },
  //     {
  //       "type": 1,
  //       "pos": {
  //         "x": 4,
  //         "y": 5,
  //         "z": 1
  //       },
  //       "dim": {
  //         "h": 1,
  //         "w": 1
  //       },
  //       "name": "C2",
  //       "reserveId": "",
  //       "status": "",
  //       "gender": ""
  //     },
  //     {
  //       "type": 1,
  //       "pos": {
  //         "x": 4,
  //         "y": 5,
  //         "z": 2
  //       },
  //       "dim": {
  //         "h": 1,
  //         "w": 1
  //       },
  //       "name": "C5",
  //       "reserveId": "",
  //       "status": "",
  //       "gender": ""
  //     },
  //     {
  //       "type": 1,
  //       "pos": {
  //         "x": 4,
  //         "y": 6,
  //         "z": 2
  //       },
  //       "dim": {
  //         "h": 1,
  //         "w": 1
  //       },
  //       "name": "C6",
  //       "reserveId": "",
  //       "status": "",
  //       "gender": ""
  //     },
  //     {
  //       "type": 2,
  //       "pos": {
  //         "x": 4,
  //         "y": 7,
  //         "z": 1
  //       },
  //       "dim": {
  //         "h": 1,
  //         "w": 2
  //       },
  //       "name": "ห้องน้ำ",
  //       "reserveId": "",
  //       "status": "",
  //       "gender": ""
  //     },
  //     {
  //       "type": 1,
  //       "pos": {
  //         "x": 4,
  //         "y": 7,
  //         "z": 2
  //       },
  //       "dim": {
  //         "h": 1,
  //         "w": 1
  //       },
  //       "name": "C7",
  //       "reserveId": "",
  //       "status": "",
  //       "gender": ""
  //     },
  //     {
  //       "type": 1,
  //       "pos": {
  //         "x": 4,
  //         "y": 8,
  //         "z": 2
  //       },
  //       "dim": {
  //         "h": 1,
  //         "w": 1
  //       },
  //       "name": "C8",
  //       "reserveId": "",
  //       "status": "",
  //       "gender": ""
  //     },
  //     {
  //       "type": 1,
  //       "pos": {
  //         "x": 4,
  //         "y": 9,
  //         "z": 2
  //       },
  //       "dim": {
  //         "h": 1,
  //         "w": 1
  //       },
  //       "name": "C9",
  //       "reserveId": "",
  //       "status": "",
  //       "gender": ""
  //     },
  //     {
  //       "type": 1,
  //       "pos": {
  //         "x": 4,
  //         "y": 10,
  //         "z": 2
  //       },
  //       "dim": {
  //         "h": 1,
  //         "w": 1
  //       },
  //       "name": "C10",
  //       "reserveId": "",
  //       "status": "",
  //       "gender": ""
  //     },
  //     {
  //       "type": 1,
  //       "pos": {
  //         "x": 4,
  //         "y": 11,
  //         "z": 2
  //       },
  //       "dim": {
  //         "h": 1,
  //         "w": 1
  //       },
  //       "name": "C11",
  //       "reserveId": "",
  //       "status": "",
  //       "gender": ""
  //     },
  //     {
  //       "type": 1,
  //       "pos": {
  //         "x": 5,
  //         "y": 1,
  //         "z": 2
  //       },
  //       "dim": {
  //         "h": 1,
  //         "w": 1
  //       },
  //       "name": "D1",
  //       "reserveId": "",
  //       "status": "",
  //       "gender": ""
  //     },
  //     {
  //       "type": 1,
  //       "pos": {
  //         "x": 5,
  //         "y": 2,
  //         "z": 2
  //       },
  //       "dim": {
  //         "h": 1,
  //         "w": 1
  //       },
  //       "name": "D2",
  //       "reserveId": "",
  //       "status": "",
  //       "gender": ""
  //     },
  //     {
  //       "type": 1,
  //       "pos": {
  //         "x": 5,
  //         "y": 3,
  //         "z": 2
  //       },
  //       "dim": {
  //         "h": 1,
  //         "w": 1
  //       },
  //       "name": "D3",
  //       "reserveId": "",
  //       "status": "",
  //       "gender": ""
  //     },
  //     {
  //       "type": 1,
  //       "pos": {
  //         "x": 5,
  //         "y": 4,
  //         "z": 1
  //       },
  //       "dim": {
  //         "h": 1,
  //         "w": 1
  //       },
  //       "name": "D1",
  //       "reserveId": "",
  //       "status": "",
  //       "gender": ""
  //     },
  //     {
  //       "type": 1,
  //       "pos": {
  //         "x": 5,
  //         "y": 4,
  //         "z": 2
  //       },
  //       "dim": {
  //         "h": 1,
  //         "w": 1
  //       },
  //       "name": "D4",
  //       "reserveId": "",
  //       "status": "",
  //       "gender": ""
  //     },
  //     {
  //       "type": 1,
  //       "pos": {
  //         "x": 5,
  //         "y": 5,
  //         "z": 1
  //       },
  //       "dim": {
  //         "h": 1,
  //         "w": 1
  //       },
  //       "name": "D2",
  //       "reserveId": "",
  //       "status": "",
  //       "gender": ""
  //     },
  //     {
  //       "type": 1,
  //       "pos": {
  //         "x": 5,
  //         "y": 5,
  //         "z": 2
  //       },
  //       "dim": {
  //         "h": 1,
  //         "w": 1
  //       },
  //       "name": "D5",
  //       "reserveId": "",
  //       "status": "",
  //       "gender": ""
  //     },
  //     {
  //       "type": 1,
  //       "pos": {
  //         "x": 5,
  //         "y": 6,
  //         "z": 2
  //       },
  //       "dim": {
  //         "h": 1,
  //         "w": 1
  //       },
  //       "name": "D6",
  //       "reserveId": "",
  //       "status": "",
  //       "gender": ""
  //     },
  //     {
  //       "type": 1,
  //       "pos": {
  //         "x": 5,
  //         "y": 7,
  //         "z": 2
  //       },
  //       "dim": {
  //         "h": 1,
  //         "w": 1
  //       },
  //       "name": "D7",
  //       "reserveId": "",
  //       "status": "",
  //       "gender": ""
  //     },
  //     {
  //       "type": 1,
  //       "pos": {
  //         "x": 5,
  //         "y": 8,
  //         "z": 2
  //       },
  //       "dim": {
  //         "h": 1,
  //         "w": 1
  //       },
  //       "name": "D8",
  //       "reserveId": "",
  //       "status": "",
  //       "gender": ""
  //     },
  //     {
  //       "type": 1,
  //       "pos": {
  //         "x": 5,
  //         "y": 9,
  //         "z": 2
  //       },
  //       "dim": {
  //         "h": 1,
  //         "w": 1
  //       },
  //       "name": "D9",
  //       "reserveId": "",
  //       "status": "",
  //       "gender": ""
  //     },
  //     {
  //       "type": 1,
  //       "pos": {
  //         "x": 5,
  //         "y": 10,
  //         "z": 2
  //       },
  //       "dim": {
  //         "h": 1,
  //         "w": 1
  //       },
  //       "name": "D10",
  //       "reserveId": "",
  //       "status": "",
  //       "gender": ""
  //     },
  //     {
  //       "type": 1,
  //       "pos": {
  //         "x": 5,
  //         "y": 11,
  //         "z": 2
  //       },
  //       "dim": {
  //         "h": 1,
  //         "w": 1
  //       },
  //       "name": "D11",
  //       "reserveId": "",
  //       "status": "",
  //       "gender": ""
  //     },
  //     {
  //       "type": 2,
  //       "pos": {
  //         "x": 1,
  //         "y": 1,
  //         "z": 1
  //       },
  //       "dim": {
  //         "h": 1,
  //         "w": 2
  //       },
  //       "name": "บันไดล่าง1",
  //       "reserveId": "",
  //       "status": "",
  //       "gender": ""
  //     },
  //     {
  //       "type": 2,
  //       "pos": {
  //         "x": 1,
  //         "y": 1,
  //         "z": 2
  //       },
  //       "dim": {
  //         "h": 1,
  //         "w": 2
  //       },
  //       "name": "บันไดบน 1",
  //       "reserveId": "",
  //       "status": "",
  //       "gender": ""
  //     },
  //     {
  //       "type": 2,
  //       "pos": {
  //         "x": 1,
  //         "y": 2,
  //         "z": 1
  //       },
  //       "dim": {
  //         "h": 2,
  //         "w": 5
  //       },
  //       "name": "ห้องพัก พขร.",
  //       "reserveId": "",
  //       "status": "",
  //       "gender": ""
  //     },
  //     {
  //       "type": 1,
  //       "pos": {
  //         "x": 1,
  //         "y": 2,
  //         "z": 2
  //       },
  //       "dim": {
  //         "h": 1,
  //         "w": 1
  //       },
  //       "name": "A1",
  //       "reserveId": "",
  //       "status": "",
  //       "gender": ""
  //     },
  //     {
  //       "type": 1,
  //       "pos": {
  //         "x": 1,
  //         "y": 3,
  //         "z": 2
  //       },
  //       "dim": {
  //         "h": 1,
  //         "w": 1
  //       },
  //       "name": "A2",
  //       "reserveId": "",
  //       "status": "",
  //       "gender": ""
  //     },
  //     {
  //       "type": 1,
  //       "pos": {
  //         "x": 1,
  //         "y": 4,
  //         "z": 1
  //       },
  //       "dim": {
  //         "h": 1,
  //         "w": 1
  //       },
  //       "name": "A1",
  //       "reserveId": "",
  //       "status": "",
  //       "gender": ""
  //     },
  //     {
  //       "type": 1,
  //       "pos": {
  //         "x": 1,
  //         "y": 4,
  //         "z": 2
  //       },
  //       "dim": {
  //         "h": 1,
  //         "w": 1
  //       },
  //       "name": "A3",
  //       "reserveId": "",
  //       "status": "",
  //       "gender": ""
  //     },
  //     {
  //       "type": 1,
  //       "pos": {
  //         "x": 1,
  //         "y": 5,
  //         "z": 1
  //       },
  //       "dim": {
  //         "h": 1,
  //         "w": 1
  //       },
  //       "name": "A2",
  //       "reserveId": "",
  //       "status": "",
  //       "gender": ""
  //     },
  //     {
  //       "type": 1,
  //       "pos": {
  //         "x": 1,
  //         "y": 5,
  //         "z": 2
  //       },
  //       "dim": {
  //         "h": 1,
  //         "w": 1
  //       },
  //       "name": "A4",
  //       "reserveId": "",
  //       "status": "",
  //       "gender": ""
  //     },
  //     {
  //       "type": 2,
  //       "pos": {
  //         "x": 1,
  //         "y": 6,
  //         "z": 2
  //       },
  //       "dim": {
  //         "h": 2,
  //         "w": 2
  //       },
  //       "name": "บันไดบน 2",
  //       "reserveId": "",
  //       "status": "",
  //       "gender": ""
  //     },
  //     {
  //       "type": 2,
  //       "pos": {
  //         "x": 1,
  //         "y": 7,
  //         "z": 1
  //       },
  //       "dim": {
  //         "h": 1,
  //         "w": 2
  //       },
  //       "name": "บันไดล่าง 2",
  //       "reserveId": "",
  //       "status": "",
  //       "gender": ""
  //     },
  //     {
  //       "type": 2,
  //       "pos": {
  //         "x": 1,
  //         "y": 8,
  //         "z": 1
  //       },
  //       "dim": {
  //         "h": 4,
  //         "w": 5
  //       },
  //       "name": "ห้องเก็บสัมภาระ",
  //       "reserveId": "",
  //       "status": "",
  //       "gender": ""
  //     },
  //     {
  //       "type": 1,
  //       "pos": {
  //         "x": 1,
  //         "y": 8,
  //         "z": 2
  //       },
  //       "dim": {
  //         "h": 1,
  //         "w": 1
  //       },
  //       "name": "A5",
  //       "reserveId": "",
  //       "status": "",
  //       "gender": ""
  //     },
  //     {
  //       "type": 1,
  //       "pos": {
  //         "x": 1,
  //         "y": 9,
  //         "z": 2
  //       },
  //       "dim": {
  //         "h": 1,
  //         "w": 1
  //       },
  //       "name": "A6",
  //       "reserveId": "",
  //       "status": "",
  //       "gender": ""
  //     }
  //   ]
  // }

  onClick() {
    if (this.selectedSeat.length > 0) {
      this.router.navigate(['../passengerInfomation'], { relativeTo: this.route });
    } else {
      this.openDialog(this.errorMessage.pleaseSelect + 'ที่นั่ง');
    }
  }

  selectSeat(data) {
    this.selectedSeat = data;
  }

  goPreviousPage() {
    let dataBack = {
      availableTripResultModel: this.availableTripResultModel,
      availableTripSearchModel: this.availableTripSearchModel,
      dptrProvince: this.selectedDptrProvince,
      dptrPark: this.selectedDptrPark,
      arrvProvince: this.arrvProvince,
      arrvPark: this.arrvPark,
      totalPassenger: this.selectedNumOfPerson
    }
    this.sharedService.sendData(dataBack);
    this.location.back();
  }
}


