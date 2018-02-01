import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertsService } from '@jaspero/ng2-alerts';
import { AvailableTripModel } from '../../../../shared/models/bus/availableTripSearch.model';
import { AvailableTripResultModel } from '../../../../shared/models/bus/availableTripResult.model';
import { ErrorMessage } from '../../../../shared/constant/error-message';
import { BusService } from '../../../../shared/services/bus.service';
import { SharedService } from '../../../../shared/services/shared-service.service';
import { ProvinceModel } from '../../../../shared/models/bus/province.model';
import { ParkModel } from '../../../../shared/models/bus/park.model';
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-select-destination',
  templateUrl: './select-destination.component.html',
  styleUrls: ['./select-destination.component.css', '../buy-ticket/buy-ticket.component.css'],
  providers: [BusService, DatePipe]
})
export class SelectDestinationComponent implements OnInit {
  availableTripSeach: AvailableTripModel = new AvailableTripModel;
  availableTripResult: AvailableTripResultModel;
  // availableTripResult: any;
  errorMessage: ErrorMessage = new ErrorMessage;
  provinceList: ProvinceModel[] = [];
  arrvProvinceList: ProvinceModel[] = [];
  parkList: ParkModel[] = [];
  dptrParkList: ParkModel[] = [];
  arrvParkList: ParkModel[] = [];
  returnDate: Date = new Date(Date.now());
  departDate: Date = new Date(Date.now());
  selectedDptrProvince: ProvinceModel;
  selectedDptrPark: ParkModel;
  selectedArrvProvince: ProvinceModel;
  selectedArrvPark: ParkModel;
  selectedTripType: string;
  isReturnDate: boolean = true;
  selectedNumOfPerson: number;
  isDisplay: boolean = true;
  isParkListLoading: boolean = true;
  isProvinceLoading: boolean = true;
  alertSettings: any;

  constructor(
    private busService: BusService,
    private sharedService: SharedService,
    private router: Router,
    private route: ActivatedRoute,
    private _alert: AlertsService,
    private datePipe: DatePipe
  ) { }

  ngOnInit() {
    this.getProvinceList();
    this.getParkList();
    this.selectedTripType = "R";
    this.selectedNumOfPerson = 0;
  }

  getProvinceList() {
    this.busService.getMasProvince().subscribe((res) => {
      this.isProvinceLoading = false;
      this.provinceList = res.data.map((obj: any) => {
        return {
          id: obj.id,
          desc: obj.desc
        };
      });
    });
  }

  getParkList() {
    this.busService.getMasPark().subscribe((res) => {
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
    });
  }

  selectDprtProvince(event) {
    this.selectedDptrProvince = event;
    this.selectedDptrPark = undefined;
  }

  selectArrvProvince(event) {
    this.selectedArrvProvince = event;
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
    if (this.selectedArrvProvince != undefined) {
      var listPark = this.parkList.filter(item =>
        item.province.id === this.selectedArrvProvince.id);
      if (listPark.length > 0) {
        this.arrvParkList = listPark;
      }
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
    console.log('submit');
    this.validateDate();
  }

  openDialog(msg) {
    let type: any = "warning";
    this.alertSettings = { overlay: true, overlayClickToClose: false, showCloseButton: true, duration: 100000 };
    this._alert.create(type, msg, this.alertSettings);
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
    } else if (this.selectedTripType == "R" && this.returnDate < this.departDate) {
      this.openDialog(this.errorMessage.pleaseSelect + "วันที่เดินทางกลับมากกว่าวันที่ไป");
    } else if (this.selectedNumOfPerson == 0) {
      this.openDialog(this.errorMessage.pleaseSelect + "จำนวนผู้เดินทาง");
    } else {
      // let latest_date =this.datePipe.transform(this.departDate, 'yyyy-MM-dd');
      console.log(this.datePipe.transform(this.departDate, 'yyyy-MM-dd'));
      this.availableTripSeach.departDate = this.datePipe.transform(this.departDate, 'yyyy-MM-dd');
      this.availableTripSeach.returnDate = this.datePipe.transform(this.returnDate, 'yyyy-MM-dd');
      this.availableTripSeach.pickup = this.selectedDptrPark.id;
      // this.availableTripSeach.pickupDesc = this.selectedDptrPark.nameTh;
      this.availableTripSeach.dropoff = this.selectedArrvPark.id;
      // this.availableTripSeach.dropoffDesc = this.selectedArrvPark.nameTh;
      this.availableTripSeach.tripType = this.selectedTripType;
      console.log('------------>>> ', this.availableTripSeach);

      /* --------------------- call API ---------------------*/

      // // -------------- รอเทสกับ API -----------------
      this.busService.getAvailableTrip(this.availableTripSeach).subscribe((res) => {
        this.availableTripResult = res.data;
        console.log('res<<<', this.availableTripResult);
        this.isDisplay = false;
      });

    }
  }

  onSwap() {
    var provinceTemp = this.selectedDptrProvince;
    this.selectedDptrProvince = this.selectedArrvProvince;
    this.selectedArrvProvince = provinceTemp;

    var ParkListtemp = this.selectedDptrPark;
    this.findDprtParkList();
    this.selectedDptrPark = this.selectedArrvPark;
    this.findArrvParkList();
    this.selectedArrvPark = ParkListtemp;
  }

}