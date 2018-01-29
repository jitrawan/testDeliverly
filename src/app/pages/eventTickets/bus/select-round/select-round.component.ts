import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BusService } from '../../../../shared/services/bus.service';
import { AvailableTripResultModel } from '../../../../shared/models/bus/availableTripResult.model';
import { AvailableTrip } from '../../../../shared/models/bus/availableTripSearch.model';
import { ErrorMessage } from '../../../../shared/constant/error-message';
// import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-select-round',
  templateUrl: './select-round.component.html',
  styleUrls: ['./select-round.component.css', '../buy-ticket/buy-ticket.component.css'],
  providers: [BusService]

})
export class SelectRoundComponent implements OnInit {
  @Input() availableTripResultModel: any;
  @Input() availableTripSearchModel: AvailableTrip;
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

  selectedDptrTrip: any;
  selectedRtrnTrip: any;

  errorMessage: ErrorMessage = new ErrorMessage;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private busService: BusService
  ) { }

  ngOnInit() {
    this.availableTripResultModel = {
      "dptrTrips": {
        "tripDate": "2018-02-01",
        "trips": [
          {
            "id": "3720857",
            "dptrPark": {
              "id": "1223",
              "desc": "กรุงเทพ(สายใต้ใหม่)"
            },
            "arrvPark": {
              "id": "846",
              "desc": "จุดจอด อ.คลองท่อม"
            },
            "date": "2018-02-01",
            "time": "18:30",
            "arrvDate": "2018-02-02",
            "arrvTime": "06:30",
            "route": {
              "id": "211",
              "code": "2S99120042",
              "desc": "กรุงเทพฯ-คลองท่อม-กระบี่",
              "line": "9912"
            },
            "busStd": {
              "id": "6",
              "desc": "ม.4ข"
            },
            "fare": "304",
            "fee": "243",
            "seats": 46,
            "emptySeats": 46,
            "coupon": "Y",
            "station": {
              "id": "2",
              "desc": "กรุงเทพ(สายใต้ใหม่)"
            },
            "platform": "32"
          },
          {
            "id": "3715436",
            "dptrPark": {
              "id": "1223",
              "desc": "กรุงเทพ(หมอชิตใหม่2)"
            },
            "arrvPark": {
              "id": "846",
              "desc": "จุดจอด อ.คลองท่อม"
            },
            "date": "2018-02-01",
            "time": "18:35",
            "arrvDate": "2018-02-02",
            "arrvTime": "08:35",
            "route": {
              "id": "966",
              "code": "9C09830142",
              "desc": "กรุงเทพ(หมอชิต2)-กระบี่-(บ้านหัวหิน)",
              "line": "0983"
            },
            "busStd": {
              "id": "6",
              "desc": "ม.4ข"
            },
            "fare": "343",
            "fee": "274",
            "seats": 48,
            "emptySeats": 48,
            "coupon": "Y",
            "station": {
              "id": "1",
              "desc": "กรุงเทพ(หมอชิตใหม่2)"
            },
            "platform": "111(หมอชิต2)"
          }
        ]
      },
      "rtrnTrips": {
        "tripDate": "2018-02-03",
        "trips": [
          {
            "id": "3720984",
            "dptrPark": {
              "id": "846",
              "desc": "จุดจอด อ.คลองท่อม"
            },
            "arrvPark": {
              "id": "1223",
              "desc": "กรุงเทพ(สายใต้ใหม่)"
            },
            "date": "2018-02-03",
            "time": "16:00",
            "arrvDate": "2018-02-04",
            "arrvTime": "04:00",
            "route": {
              "id": "211",
              "code": "2S99120042",
              "desc": "กรุงเทพฯ-คลองท่อม-กระบี่",
              "line": "9912"
            },
            "busStd": {
              "id": "6",
              "desc": "ม.4ข"
            },
            "fare": "304",
            "fee": "243",
            "seats": 46,
            "emptySeats": 46,
            "coupon": "Y",
            "station": {
              "id": "28",
              "desc": "สถานีเดินรถกระบี่"
            },
            "platform": "1"
          },
          {
            "id": "3715439",
            "dptrPark": {
              "id": "846",
              "desc": "จุดจอด อ.คลองท่อม"
            },
            "arrvPark": {
              "id": "1223",
              "desc": "กรุงเทพ(หมอชิตใหม่2)"
            },
            "date": "2018-02-03",
            "time": "16:31",
            "arrvDate": "2018-02-04",
            "arrvTime": "06:31",
            "route": {
              "id": "966",
              "code": "9C09830142",
              "desc": "กรุงเทพ(หมอชิต2)-กระบี่-(บ้านหัวหิน)",
              "line": "0983"
            },
            "busStd": {
              "id": "6",
              "desc": "ม.4ข"
            },
            "fare": "343",
            "fee": "274",
            "seats": 48,
            "emptySeats": 48,
            "coupon": "Y",
            "station": {
              "id": "28",
              "desc": "สถานีเดินรถกระบี่"
            },
            "platform": "กระบี่18.00"
          }
        ]
      }
    };

    this.dptrDate = this.setCalendar(this.convertStringToDate(this.availableTripResultModel.dptrTrips.tripDate));
    this.rtrnDate = this.setCalendar(this.convertStringToDate(this.availableTripResultModel.rtrnTrips.tripDate));
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
    console.log('data>>>> ', data);
    this.selectedDptrTrip = data;
    this.dptrFare = this.convertStringToNumber(this.selectedDptrTrip.fare) + this.convertStringToNumber(this.selectedDptrTrip.fee);
    this.fee = 15;
  }

  selectRtrnTrip(data) {
    this.selectedRtrnTrip = data;
    this.rtrnFare = this.convertStringToNumber(this.selectedRtrnTrip.fare) + this.convertStringToNumber(this.selectedRtrnTrip.fee);
    this.fee = 15;
  }

  goNextPage() {
    if (this.selectedDptrTrip == undefined) {
      alert(this.errorMessage.pleaseSelect + 'วันที่และเวลาเดินทางไป');
    } else if (this.availableTripResultModel.rtrnTrips != null && this.selectedRtrnTrip == undefined) {
      alert(this.errorMessage.pleaseSelect + 'วันที่และเวลาเดินทางกลับ');
    } else {
      // var returnCode = parent.window.receiveMessage('checkAuthen');
      // console.log('return >>> ', returnCode);
      // console.log('5 >>>');
      // if (returnCode) {
      this.router.navigate(['../selectSeat'], { relativeTo: this.route });
      // }
    }
  }

  searchTrips(tripType, tripDate) {
    console.log('tripType >> ', tripType);
    console.log('tripDate >> ', new Date(tripDate));
    if (tripType == 'dptr') {
      this.availableTripSearchModel.departDate = new Date(tripDate);
    } else if (tripType == 'rtrn') {
      this.availableTripSearchModel.returnDate = new Date(tripDate);
    }

    // this.availableTripResultModel = this.busService.getAvailableTrip(this.availableTripSearchModel);
    // this.dptrDate = this.setCalendar(this.convertStringToDate(this.availableTripResultModel.dptrTrips.tripDate));
    // this.rtrnDate = this.setCalendar(this.convertStringToDate(this.availableTripResultModel.rtrnTrips.tripDate));
  }

}
