import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertsService } from '@jaspero/ng2-alerts';
import { ErrorMessage } from '../../../../shared/constant/error-message';
import { BusLayoutModel } from '../../../.././shared/models/bus/busLayout.model';
import { SharedService } from '../../../../shared/services/shared-service.service';
import { BusService } from '../../../../shared/services/bus.service';


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

  selectedSeat: any[] = [];

  errorMessage: ErrorMessage = new ErrorMessage;
  alertSettings: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _alert: AlertsService,
    private sharedService: SharedService,
    private busService: BusService
  ) { }

  ngOnInit() {
    this.sharedService.receiveData.subscribe(data => this.receiveData = data);
    console.log('this.receiveData >>', this.receiveData);
    if (this.receiveData != null) {
      this.dptrPark = this.receiveData.dptrPark;
      this.arrvPark = this.receiveData.arrvPark;
      this.totalPassenger = this.receiveData.totalPassenger;
      this.dptrProvince = this.receiveData.dptrProvince;
      this.arrvProvince = this.receiveData.rtrnProvince;
      this.busLayout = this.receiveData.busLayout;
      if (this.receiveData.tripName == 'dptrTrip') {
        this.tripName = "เที่ยวไป";
        this.dptrDate = this.receiveData.dptrTrip.date;
        this.arrvDate = this.receiveData.dptrTrip.arrvDate;
        this.dptrTime = this.receiveData.dptrTrip.time;
        this.arrvTime = this.receiveData.dptrTrip.arrvTime;
      } else {
        this.tripName = "เที่ยวกลับ";
        this.dptrDate = this.receiveData.rtrnTrip.date;
        this.arrvDate = this.receiveData.rtrnTrip.arrvDate;
        this.dptrTime = this.receiveData.rtrnTrip.time;
        this.arrvTime = this.receiveData.rtrnTrip.arrvTime;
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
    if (this.selectedSeat.length > 0) {
      console.log('this.receiveData.selectedRtrnTrip>>>', this.receiveData.rtrnTrip);
      let layout;
      if (this.tripName == 'เที่ยวไป' && this.receiveData.rtrnTrip != null) {
        this.busService.getBusLayout(this.receiveData.rtrnTrip.id, this.receiveData.rtrnTrip.dptrPark.id, this.receiveData.rtrnTrip.arrvPark.id).subscribe((res) => {
          layout = res.data;
          this.receiveData = {
            tripName: 'rtrnTrip',
            dptrProvince: this.receiveData.dptrProvince,
            dptrPark: this.receiveData.arrvPark,
            arrvPark: this.receiveData.dptrPark,
            arrvProvince: this.receiveData.rtrnProvince,
            busLayout: layout, // layout เที่ยวกลับ
            dptrTrip: this.receiveData.dptrTrip, // เที่ยวไป
            rtrnTrip: this.receiveData.rtrnTrip, // เที่ยวกลับ
            totalPassenger: this.receiveData.totalPassenger
          }
          this.sharedService.sendData(this.receiveData);
          this.router.navigate(['../selectSeat2'], { relativeTo: this.route });
        });
      } else {
        this.router.navigate(['../passengerInfomation'], { relativeTo: this.route });
      }
    } else {
      this.openDialog(this.errorMessage.pleaseSelect + 'ที่นั่ง');
    }
  }

  selectSeat(data) {
    this.selectedSeat = data;
  }
}
