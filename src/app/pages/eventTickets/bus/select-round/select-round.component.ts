import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

/* ---------------------------------- services -------------------*/
import { BusService } from '../../../../shared/services/bus.service';
import { SharedService } from '../../../../shared/services/shared-service.service';
import { AlertsService } from '@jaspero/ng2-alerts';

/* ---------------------------------- models -------------------*/
import { AvailableTripResultModel } from '../../../../shared/models/bus/availableTripResult.model';
import { AvailableTripModel } from '../../../../shared/models/bus/availableTripSearch.model';
import { BusLayoutModel } from '../../../.././shared/models/bus/busLayout.model';
import { TripModel } from '../../../.././shared/models/bus/trip.model';
import { ErrorMessage } from '../../../../shared/constant/error-message';


@Component({
  selector: 'app-select-round',
  templateUrl: './select-round.component.html',
  styleUrls: ['./select-round.component.css', '../buy-ticket/buy-ticket.component.css'],
  providers: [BusService]

})
export class SelectRoundComponent implements OnInit {
  @Input() availableTripResultModel: AvailableTripResultModel;
  @Input() availableTripSearchModel: AvailableTripModel;
  @Input() dptrProvince: any;
  @Input() dptrPark: any;
  @Input() rtrnProvince: any;
  @Input() rtrnPark: any;
  @Input() totalPassenger = 1;

  dptrDate: any[] = [];
  rtrnDate: any[] = [];
  dptrFare: number = 0;
  rtrnFare: number = 0;
  fee: number = 0;

  selectedDptrTrip: TripModel;
  selectedRtrnTrip: TripModel;

  errorMessage: ErrorMessage = new ErrorMessage;
  alertSettings: any;
  busLayout: BusLayoutModel;

  dptrTableLoading: boolean = false;
  retrnTableLoading: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private busService: BusService,
    private sharedService: SharedService,
    private _alert: AlertsService,
    private datePipe: DatePipe,

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
      this.dptrTableLoading = false;
      this.retrnTableLoading = false;
      this.availableTripResultModel = res.data;
      this.dptrDate = this.setCalendar(this.convertStringToDate(this.availableTripResultModel.dptrTrips.tripDate));
      if (this.availableTripResultModel.rtrnTrips != null) {
        this.rtrnDate = this.setCalendar(this.convertStringToDate(this.availableTripResultModel.rtrnTrips.tripDate));
      }
    });
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
    this.dptrFare = this.convertStringToNumber(this.selectedDptrTrip.fare) + this.convertStringToNumber(this.selectedDptrTrip.fee);
    this.fee = 15;
  }

  selectRtrnTrip(data) {
    this.selectedRtrnTrip = data;
    this.rtrnFare = this.convertStringToNumber(this.selectedRtrnTrip.fare) + this.convertStringToNumber(this.selectedRtrnTrip.fee);
    this.fee = 15;
  }

  openDialog(msg) {
    let type: any = "warning";
    this.alertSettings = { overlay: true, overlayClickToClose: false, showCloseButton: true, duration: 100000 };
    this._alert.create(type, msg, this.alertSettings);
  }

  goNextPage() {
    if (this.selectedDptrTrip == undefined) {
      this.openDialog(this.errorMessage.pleaseSelect + 'วันที่และเวลาเดินทางไป');
    } else if (this.availableTripResultModel.rtrnTrips != null && this.selectedRtrnTrip == undefined) {
      this.openDialog(this.errorMessage.pleaseSelect + 'วันที่และเวลาเดินทางกลับ');
    } else {
      // parent.window.receiveMessage('checkAuthen');
      this.busService.getBusLayout(this.selectedDptrTrip.id, this.selectedDptrTrip.dptrPark.id, this.selectedDptrTrip.arrvPark.id).subscribe((res) => {
        this.busLayout = res.data;
        let dataListForPassNextPage = {
          tripName: 'dptrTrip',
          dptrProvince: this.dptrProvince,
          dptrPark: this.dptrPark,
          arrvProvince: this.rtrnProvince,
          arrvPark: this.rtrnPark,
          busLayout: this.busLayout, // layout เที่ยวไป
          dptrTrip: this.selectedDptrTrip, // เที่ยวไป
          rtrnTrip: this.selectedRtrnTrip, // เที่ยวกลับ
          totalPassenger: this.totalPassenger
        };
        this.sharedService.sendData(dataListForPassNextPage);
        this.router.navigate(['../selectSeat'], { relativeTo: this.route });
      });
      // var returnCode = parent.window.receiveMessage('checkAuthen');
      // console.log('return >>> ', returnCode);
      // console.log('5 >>>');
      // if (returnCode) {
      // }
    }
  }

  searchTrips(tripType, tripDate) {
    if (this.availableTripResultModel.rtrnTrips != null) {
      if (tripType == 'dptr') {
        if (new Date(tripDate) > new Date(this.availableTripResultModel.rtrnTrips.tripDate)) {
          this.openDialog(this.errorMessage.pleaseSelect + 'วันที่ไปน้อยกว่าวันที่กลับ');
        } else {
          this.availableTripSearchModel = {
            "departDate": this.datePipe.transform(tripDate, 'yyyy-MM-dd'),
            "dropoff": this.availableTripSearchModel.dropoff,
            "pickup": this.availableTripSearchModel.pickup,
            "returnDate": this.availableTripSearchModel.returnDate,
            "tripType": this.availableTripSearchModel.tripType
          };
          this.dptrTableLoading = true;
          this.getAvailableTrip(this.availableTripSearchModel);
        }
      } else if (tripType == 'rtrn') {
        if (new Date(tripDate) < new Date(this.availableTripResultModel.dptrTrips.tripDate)) {
          this.openDialog(this.errorMessage.pleaseSelect + 'วันที่กลับมากกว่าวันที่ไป');
        } else {
          this.availableTripSearchModel = {
            "departDate": this.availableTripSearchModel.departDate,
            "dropoff": this.availableTripSearchModel.dropoff,
            "pickup": this.availableTripSearchModel.pickup,
            "returnDate": this.datePipe.transform(tripDate, 'yyyy-MM-dd'),
            "tripType": this.availableTripSearchModel.tripType
          };
          this.retrnTableLoading = true;
          this.getAvailableTrip(this.availableTripSearchModel);
        }
      }
    } else {
      this.availableTripSearchModel = {
        "departDate": this.datePipe.transform(tripDate, 'yyyy-MM-dd'),
        "dropoff": this.availableTripSearchModel.dropoff,
        "pickup": this.availableTripSearchModel.pickup,
        "returnDate": this.availableTripSearchModel.returnDate,
        "tripType": this.availableTripSearchModel.tripType
      };
      this.dptrTableLoading = true;
      this.getAvailableTrip(this.availableTripSearchModel);
    }
  }
}
