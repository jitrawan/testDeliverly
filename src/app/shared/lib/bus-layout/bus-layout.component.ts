import { Component, OnInit, Input, Pipe, EventEmitter, Output } from '@angular/core';
import { AlertsService } from '@jaspero/ng2-alerts';

import { BusService } from '../../services/bus.service';

import { BusLayoutModel } from '../../models/bus/busLayout.model';
import { MarkSeatModel } from '../../models/bus/markSeat.model';
import { ReserveSeatModel } from '../../models/bus/reserveSeat.model';

@Component({
  selector: 'bus-layout',
  templateUrl: './bus-layout.component.html',
  styleUrls: ['./bus-layout.component.css']
})
export class BusLayoutComponent implements OnInit {

  @Input() data: any;
  @Input() numberOfSeat: number;
  @Input() transId: any;
  @Input() trip: any;

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
  reserveSeatModel: ReserveSeatModel;

  constructor(
    private _alert: AlertsService,
    private busService: BusService,
  ) { }

  ngOnInit() {
    console.log('trip >>>', this.trip);
    console.log('transId >>>', this.transId);

    if (this.data != null) {
      this.numbersOfCol = Array(this.data.cols).fill('');
      this.numbersOfRow = Array(this.data.rows).fill('');
      if (this.data.totalFloor > 1) {
        this.floorOneList = this.sortObjects(this.groupObjByFloor(this.data.objects, 1));
        this.floorTwoList = this.sortObjects(this.groupObjByFloor(this.data.objects, 2));
      } else {
        this.floorOneList = this.sortObjects(this.data.objects);
      }
      // this.selectedSeat.seat = [];
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

  checkSeat(objList, row, pos) {
    objList = this.groupObjByRow(objList, row);
    return objList.filter(item => item.pos.x === pos);
  }

  selectSeat(event, data, id) {
    console.log('this.selectedSeat >>', this.selectedSeat);
    if (!event.target.checked) {
      var indexOfSelectSeat = this.selectedSeat.seat.indexOf(data);
      this.unMark(this.trip, data, this.selectedSeat.reserve[indexOfSelectSeat]);
      this.selectedSeat.seat.splice(indexOfSelectSeat, 1);
      this.selectedSeat.reserve.splice(indexOfSelectSeat, 1);
    }
    
    if (this.selectedSeat.seat.length < this.numberOfSeat) {
      if (event.target.checked) {
        this.selectedSeat.seat.push(data);
        this.markSeat(this.trip, data);
      }

      this.outputValue.emit(this.selectedSeat);
    } else {
      this.openDialog('ไม่สามารถเลือกที่นั่งเกินจำนวนคนที่ท่านเลือกไว้ได้');
      (document.getElementById(id) as HTMLInputElement).checked = false;
    }
    console.log('after this.selectedSeat >>', this.selectedSeat);

  }

  openDialog(msg) {
    let type: any = "warning";
    this.alertSettings = { overlay: true, overlayClickToClose: false, showCloseButton: true, duration: 100000 };
    this._alert.create(type, msg, this.alertSettings);
  }

  markSeat(trip, seat) {
    this.markSeatModel = new MarkSeatModel();
    this.markSeatModel.transId = this.transId.transId;
    this.markSeatModel.tripId = trip.id;
    this.markSeatModel.pickup = trip.dptrPark.id;
    this.markSeatModel.pickupDesc = trip.dptrPark.id;
    this.markSeatModel.dropoff = trip.arrvPark.id;
    this.markSeatModel.dropoffDesc = trip.arrvPark.id;
    this.markSeatModel.seatCnt = 1;
    this.markSeatModel.seatFloor = [seat.pos.z];
    this.markSeatModel.seatNo = [seat.name];
    this.markSeatModel.gender = ['N'];
    console.log(' this.markSeat >>', this.markSeatModel);
    this.busService.markSeat(this.markSeatModel).subscribe((res) => {
      if (res.code == 0) {
        console.log('res markseat CALL API >>>', res);
        let data = {
          reserveId: res.data[0].reserveId,
          seatFloor: res.data[0].seatFloor,
          seatNo: res.data[0].seatNo
        };
        this.selectedSeat.reserve.push(data);
      } else {
        console.log('error ---- res markseat CALL API >>>', res);
        this.openDialog(res.msg);
      }
    });
  }

  unMark(trip, seat, reserve) {
    console.log('------------ unmark ----------');
    this.markSeatModel = new MarkSeatModel();
    this.markSeatModel.transId = this.transId.transId;
    this.markSeatModel.tripId = trip.id;
    this.markSeatModel.pickup = trip.dptrPark.id;
    this.markSeatModel.dropoff = trip.arrvPark.id;
    this.markSeatModel.seatCnt = 1;
    this.markSeatModel.seatFloor = [seat.pos.z];
    this.markSeatModel.seatNo = [seat.name];
    this.busService.unMarkSeat(this.markSeatModel, reserve).subscribe((res) => {
      console.log('res >>>', res);
    });

  }
}
