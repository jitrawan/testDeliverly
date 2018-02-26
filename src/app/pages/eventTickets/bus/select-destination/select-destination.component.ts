import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { DatePipe } from '@angular/common';

import { AlertsService } from '@jaspero/ng2-alerts';
import { BusService } from '../../../../shared/services/bus.service';
import { SharedService } from '../../../../shared/services/shared-service.service';
import { ErrorMsgService } from '../../../../shared/services/errorMsg.service';

import { ErrorMessage } from '../../../../shared/constant/error-message';
import { AvailableTripModel } from '../../../../shared/models/bus/availableTripSearch.model';
import { AvailableTripResultModel } from '../../../../shared/models/bus/availableTripResult.model';
import { ProvinceModel } from '../../../../shared/models/bus/province.model';
import { ParkModel } from '../../../../shared/models/bus/park.model';
import { RoutePrvParkMapModel } from '../../../../shared/models/bus/routePrvParkMap.model';
import { ErrorCodeModel } from '../../../../shared/models/error/error.model';

@Component({
  selector: 'app-select-destination',
  templateUrl: './select-destination.component.html',
  styleUrls: ['./select-destination.component.css', '../buy-ticket/buy-ticket.component.css'],
  providers: [DatePipe]
})
export class SelectDestinationComponent implements OnInit {
  availableTripSeach: AvailableTripModel = new AvailableTripModel;
  availableTripResult: AvailableTripResultModel;
  errorMessage: ErrorMessage = new ErrorMessage;
  provinceList: ProvinceModel[] = [];
  arrvProvinceList: ProvinceModel[] = [];
  parkList: ParkModel[] = [];
  dptrParkList: ParkModel[] = [];
  arrvParkList: any[] = [];
  returnDate: Date = new Date();
  departDate: Date = new Date();
  maxDate: Date = new Date();
  maxDateForReturn: Date = new Date();
  minDate: Date = new Date();
  selectedDptrProvince: any;
  selectedDptrPark: any;
  selectedArrvProvince: any;
  selectedArrvPark: any;
  selectedTripType: string;
  isReturnDate: boolean = true;
  selectedNumOfPerson: number;
  isParkListLoading: boolean = true;
  isProvinceLoading: boolean = true;
  isArrvProvinceLoading: boolean = false;
  alertSettings: any;
  isShowLoading: boolean = false;
  routeMap: RoutePrvParkMapModel[];
  sub: any;
  queryString: any;

  constructor(
    private busService: BusService,
    private errorMsgService: ErrorMsgService,
    private sharedService: SharedService,
    private router: Router,
    private route: ActivatedRoute,
    private _alert: AlertsService,
    private datePipe: DatePipe
  ) { }

  ngOnInit() {
    this.getErrorFile();
    this.maxDate.setDate(this.maxDate.getDate() + 90);
    this.maxDateForReturn.setDate(this.maxDateForReturn.getDate() + 90);
    this.getProvinceList();
    this.getParkList();
    this.selectedTripType = "R";
    this.selectedNumOfPerson = 0;
  }

  setMaxDateForReturn(_event) {
    var tempMaxDate = new Date(_event);
    this.returnDate = undefined;
    tempMaxDate.setDate(tempMaxDate.getDate() + 30);
    this.maxDateForReturn = tempMaxDate;
    if (this.maxDateForReturn > this.maxDate) {
      this.maxDateForReturn = this.maxDate;
    }
  }

  getErrorFile() {
    if (JSON.parse(localStorage.getItem('errorCodeList')) == null) {
      this.errorMsgService.getErrorFile().subscribe((res) => {
        if (res.code == 0) {
          localStorage.setItem('errorCodeList', JSON.stringify(res.data));
        } else {
          this.openDialog(this.errorMsgService.getErrorMsg(res.code));
        }
      });
    }
  }

  getProvinceList() {
    this.busService.getMasProvince().subscribe((res) => {
      if (res.code == 0) {
        this.isProvinceLoading = false;
        this.provinceList = res.data.map((obj: any) => {
          return {
            id: obj.id,
            desc: obj.desc
          };
        });
      } else {
        this.openDialog(this.errorMsgService.getErrorMsg(res.code));
      }
    });
  }

  getParkList() {
    this.busService.getMasPark().subscribe((res) => {
      if (res.code == 0) {
        this.isParkListLoading = false;
        this.parkList = res.data.map((obj: any) => {
          return {
            id: obj.id,
            nameTh: obj.nameTh,
            nameEn: obj.nameEn,
            park: obj.park,
            picking: obj.picking,
            updateDtm: obj.updateDtm,
            province: obj.province
          };
        });
      } else {
        this.openDialog(this.errorMsgService.getErrorMsg(res.code));
      }
    });
  }

  getRoutePrvParkMap() {
    this.isArrvProvinceLoading = true;
    if (this.selectedDptrPark != null) {
      this.busService.getRoutePrvParkMap(this.selectedDptrPark.id).subscribe(
        (res) => {
          if (res.code == 0) {
            this.routeMap = res.data;
            this.getArrvProvince();
          } else {
            this.openDialog(this.errorMsgService.getErrorMsg(res.code));
          }
        },
        (err) => {
          this.openDialog(this.errorMsgService.getErrorMsg(err.code));
        }
      );
    }
  }

  selectDprtProvince(event) {
    if (event == '') {
      this.selectedDptrProvince = undefined;
    }
    this.selectedDptrPark = undefined;
    this.selectedArrvProvince = undefined;
    this.selectedArrvPark = undefined;
    this.dptrParkList = [];
    this.arrvParkList = [];
    this.arrvProvinceList = [];
  }

  selectArrvProvince(event) {
    this.selectedArrvProvince = event;
    this.selectedArrvPark = undefined;
  }

  selectdprtPark(event) {
    this.selectedArrvProvince = undefined;
    this.selectedArrvPark = undefined;
  }

  findDprtParkList() {
    if (this.selectedDptrProvince != undefined) {
      var listPark = this.parkList.filter(item =>
        item.province.id === this.selectedDptrProvince.id);
      if (listPark.length > 0) {
        this.dptrParkList = listPark;
      }
    }
  }

  findArrvParkList() {
    this.arrvParkList = [];
    if (this.selectedArrvProvince != undefined && this.routeMap.length > 0) {
      for (let index = 0; index < this.routeMap.length; index++) {
        var isFound = false;
        if (this.routeMap[index].arrvProvince.id === this.selectedArrvProvince.id) {
          for (let indexOfList = 0; indexOfList < this.arrvParkList.length; indexOfList++) {
            if (this.routeMap[index].arrvPark.desc == this.arrvParkList[indexOfList].desc) {
              isFound = true;
              break;
            }
          }
          if (!isFound) {
            this.arrvParkList.push(this.routeMap[index].arrvPark);
          }
        }
      }
      this.arrvParkList.sort((a, b) => {
        if (a.desc < b.desc) return -1;
        else if (a.desc > b.desc) return 1;
        else return 0;
      });
    }
  }

  getArrvProvince() {
    if (this.routeMap != null) {
      this.arrvProvinceList = [];
      for (let index = 0; index < this.routeMap.length; index++) {
        var isFound = false;
        for (let indexOfList = 0; indexOfList < this.arrvProvinceList.length; indexOfList++) {
          if ((this.arrvProvinceList[indexOfList].id == this.routeMap[index].arrvProvince.id)) {
            isFound = true;
            break;
          }
        }
        if (!isFound) {
          this.arrvProvinceList.push(this.routeMap[index].arrvProvince);
        }
      }
      this.isArrvProvinceLoading = false;
      this.arrvProvinceList.sort((a, b) => {
        if (a.desc < b.desc) return -1;
        else if (a.desc > b.desc) return 1;
        else return 0;
      });
    }
  }

  condition = [
    '- สามารถจองตั๋ว ก่อนเวลาเดินทางของเที่ยววิ่ง 3 ชม.',
    '- วันที่เดินทางไป และกลับ มีระยะเวลาห่างกันไม่เกิน 30 วัน',
    '- สามารถซื้อตั๋วล่วงหน้าได้ 90 วัน'
  ];

  selectType(event) {
    if (event.target.value == "O") {
      this.selectedTripType = "O";
    } else {
      this.selectedTripType = "R";
    }
  }

  onNextPage() {
    this.validateDate();
  }

  openDialog(msg) {
    let type: any = "warning";
    this.alertSettings = { overlay: true, overlayClickToClose: false, showCloseButton: true, duration: 100000 };
    this._alert.create(type, msg, this.alertSettings);

    jQuery('html,body', window.parent.document).animate({
      scrollTop: jQuery("#alert-box .jaspero__dialog").offset().top - 100
    }, 300);

  }

  validateDate() {
    if (this.selectedTripType == undefined) {
      this.openDialog(this.errorMessage.pleaseSelect + "ประเภทการเดินทาง เที่ยวเดียว หรือ ไปกลับ");
    } else if (this.selectedDptrProvince == undefined) {
      this.openDialog(this.errorMessage.pleaseSelect + "จังหวัดต้นทาง");
    } else if (this.selectedDptrPark == undefined) {
      this.openDialog(this.errorMessage.pleaseSelect + "จุดขึ้นรถ");
    } else if (this.selectedArrvProvince == undefined) {
      this.openDialog(this.errorMessage.pleaseSelect + "จังหวัดปลายทาง");
    } else if (this.selectedArrvPark == undefined) {
      this.openDialog(this.errorMessage.pleaseSelect + "จุดลงรถ");
    } else if (this.departDate == undefined) {
      this.openDialog(this.errorMessage.pleaseSelect + "วันที่เดินทางไป");
    } else if (this.selectedTripType == "R" && this.returnDate == undefined) {
      this.openDialog(this.errorMessage.pleaseSelect + "วันที่เดินทางกลับ");
    } else if (this.selectedTripType == "R" && this.returnDate < this.departDate) {
      this.openDialog(this.errorMessage.pleaseSelect + "วันที่เดินทางกลับมากกว่าวันที่ไป");
    } else if (this.selectedNumOfPerson == 0) {
      this.openDialog(this.errorMessage.pleaseSelect + "จำนวนผู้เดินทาง");
    } else {
      this.isShowLoading = true;
      this.availableTripSeach.departDate = this.datePipe.transform(this.departDate, 'yyyy-MM-dd');
      this.availableTripSeach.returnDate = this.datePipe.transform(this.returnDate, 'yyyy-MM-dd');
      this.availableTripSeach.pickup = this.selectedDptrPark.id;
      this.availableTripSeach.pickupDesc = this.selectedDptrPark.nameTh;
      this.availableTripSeach.dropoff = this.selectedArrvPark.id;
      this.availableTripSeach.dropoffDesc = this.selectedArrvPark.desc;
      this.availableTripSeach.tripType = this.selectedTripType;
      this.busService.getAvailableTrip(this.availableTripSeach).subscribe((res) => {
        if (res.code == 0) {
          this.availableTripResult = res.data;
          let dataForSend = {
            availableTripResultModel: this.availableTripResult,
            availableTripSearchModel: this.availableTripSeach,
            dptrProvince: this.selectedDptrProvince.desc,
            dptrPark: this.selectedDptrPark.nameTh,
            rtrnProvince: this.selectedArrvProvince.desc,
            rtrnPark: this.selectedArrvPark.desc,
            totalPassenger: this.selectedNumOfPerson
          }
          this.sharedService.sendData(dataForSend);
          this.router.navigate(['/selectRound'], { relativeTo: this.route });
        } else {
          this.openDialog(this.errorMsgService.getErrorMsg(res.code));
          this.isShowLoading = false;
        }
      });
    }
  }

  deselect(_el) {
    if (_el === 'selectedDptrProvince') {
      this.selectedDptrProvince = undefined;
      this.selectedDptrPark = undefined;
      this.selectedArrvProvince = undefined;
      this.selectedArrvPark = undefined;
      this.dptrParkList = [];
      this.arrvParkList = [];
      this.arrvProvinceList = [];
    } else if (_el === 'selectedDptrPark') {
      this.selectedDptrPark = undefined;
      this.selectedArrvProvince = undefined;
      this.selectedArrvPark = undefined;
      this.arrvParkList = [];
      this.arrvProvinceList = [];
    } else if (_el === 'selectedArrvProvince') {
      this.selectedArrvProvince = undefined;
      this.selectedArrvPark = undefined;
    } else if (_el === 'selectedArrvPark') {
      this.selectedArrvPark = undefined;
    }
  }

}