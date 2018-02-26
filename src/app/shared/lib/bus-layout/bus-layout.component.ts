import { Component, OnInit, Input, EventEmitter, Output, Renderer2 } from '@angular/core';
import { AlertsService } from '@jaspero/ng2-alerts';

import { BusService } from '../../services/bus.service';
import { ErrorMsgService } from '../../services/errorMsg.service';

import { ErrorMessage } from '../../constant/error-message';
import { BusLayoutModel } from '../../models/bus/busLayout.model';
import { MarkSeatModel } from '../../models/bus/markSeat.model';
import { ReserveSeatModel } from '../../models/bus/reserveSeat.model';
import { TripModel } from '../../models/bus/trip.model';
import { ErrorCodeModel } from '../../models/error/error.model';


@Component({
  selector: 'bus-layout',
  templateUrl: './bus-layout.component.html',
  styleUrls: ['./bus-layout.component.css']
})
export class BusLayoutComponent implements OnInit {

  @Input() data: any;
  @Input() numberOfSeat: number;
  @Input() transId: any;
  @Input() trip: TripModel;

  @Output() outputValue: EventEmitter<any> = new EventEmitter();
  selectedSeat: any = {
    seat: [],
    reserve: []
  };
  floorOneList: any[] = [];
  floorTwoList: any[] = [];
  numbersOfCol: Array<any>;
  numbersOfRow: Array<any>;
  alertSettings: any;
  markSeatModel: MarkSeatModel;
  errorMessage: ErrorMessage = new ErrorMessage;
  errorCodeModel: ErrorCodeModel[];
  seatLoading: boolean = false;

  constructor(
    private _alert: AlertsService,
    private errorMsgService: ErrorMsgService,
    private busService: BusService,
    private renderer: Renderer2,
  ) { }

  ngOnInit() {
    this.init();
  }

  init() {
    if (this.data != null) {
      this.numbersOfCol = Array(this.data.cols).fill('');
      this.numbersOfRow = Array(this.data.rows).fill('');
      if (this.data.totalFloor > 1) {
        this.floorOneList = this.sortObjects(this.groupObjByFloor(this.data.objects, 1));
        this.floorTwoList = this.sortObjects(this.groupObjByFloor(this.data.objects, 2));
      } else {
        this.floorOneList = this.sortObjects(this.data.objects);
      }
    }
  }

  sortObjects(objList) {
    return objList.sort(function (a, b) {
      if (a.pos.y == b.pos.y) {
        return (a.pos.x - b.pos.x);
      } else {
        return (a.pos.y - b.pos.y);
      }
    });
  }

  groupObjByFloor(layoutObj, floor) {
    return layoutObj.filter(item => item.pos.z === floor);
  }

  groupObjByRow(objList, row) {
    return objList.filter(item => item.pos.y === row);
  }

  fatchRowData(objList, row, pos) {
    objList = this.groupObjByRow(objList, row);
    return objList.filter(item => item.pos.x === pos);
  }

  selectSeat(event, data, id) {
    if (!event.target.checked) {
      var indexOfSelectSeat = this.selectedSeat.seat.indexOf(data);
      this.unMark(this.trip, data, this.selectedSeat.reserve[indexOfSelectSeat]);
      this.selectedSeat.seat.splice(indexOfSelectSeat, 1);
      this.selectedSeat.reserve.splice(indexOfSelectSeat, 1);
      this.seatLoading = true;

    }

    if (this.selectedSeat.seat.length < this.numberOfSeat) {
      if (event.target.checked) {
        this.markSeat(this.trip, data, id, event);
        this.seatLoading = true;

      }

    } else {
      this.openDialog('ไม่สามารถเลือกที่นั่งเกินจำนวนคนที่ท่านเลือกไว้ได้');
      (document.getElementById(id) as HTMLInputElement).checked = false;
    }
    this.outputValue.emit(this.selectedSeat.seat);
  }

  openDialog(msg) {
    let type: any = "warning";
    this.alertSettings = { overlay: true, overlayClickToClose: false, showCloseButton: true, duration: 100000 };
    this._alert.create(type, msg, this.alertSettings);
    jQuery('html,body', window.parent.document).animate({
      scrollTop: jQuery("#alert-box .jaspero__dialog").offset().top-100
    }, 300);
  }

  markSeat(trip: TripModel, seat, id, event) {
    this.markSeatModel = new MarkSeatModel();
    this.markSeatModel.transId = this.transId.transId;
    this.markSeatModel.tripId = trip.id;
    this.markSeatModel.pickup = trip.dptrPark.id;
    this.markSeatModel.pickupDesc = trip.dptrPark.desc;
    this.markSeatModel.dropoff = trip.arrvPark.id;
    this.markSeatModel.dropoffDesc = trip.arrvPark.desc;
    this.markSeatModel.seatCnt = 1;
    this.markSeatModel.seatFloor = [seat.pos.z];
    this.markSeatModel.seatNo = [seat.name];
    this.markSeatModel.gender = ['N'];
    this.busService.markSeat(this.markSeatModel).subscribe((res) => {
      if (res.code == 0) {
        let data = {
          reserveId: res.data[0].reserveId,
          seatFloor: res.data[0].seatFloor,
          seatNo: res.data[0].seatNo
        };
        this.selectedSeat.seat.push(seat);
        this.selectedSeat.reserve.push(data);
      } else if (res.code == 1004) {
        this.openDialog(this.errorMsgService.getErrorMsg(res.code));
        (document.getElementById(id) as HTMLInputElement).checked = false;
        this.renderer.addClass(event.target.parentElement, 'Ngender');
      } else {
        this.openDialog(this.errorMsgService.getErrorMsg(res.code));
        (document.getElementById(id) as HTMLInputElement).checked = false;
      }
      this.seatLoading = false;
    });
  }

  unMark(trip, seat, reserve) {
    this.markSeatModel = new MarkSeatModel();
    this.markSeatModel.transId = this.transId.transId;
    this.markSeatModel.tripId = trip.id;
    this.markSeatModel.pickup = trip.dptrPark.id;
    this.markSeatModel.dropoff = trip.arrvPark.id;
    this.markSeatModel.seatCnt = 1;
    this.markSeatModel.seatFloor = [seat.pos.z];
    this.markSeatModel.seatNo = [seat.name];
    this.busService.unMarkSeat(this.markSeatModel, reserve).subscribe((res) => {
      this.seatLoading = false;
    });
  }
}
