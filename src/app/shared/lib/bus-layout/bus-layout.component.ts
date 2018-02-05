import { Component, OnInit, Input, Pipe, EventEmitter, Output } from '@angular/core';
import { AlertsService } from '@jaspero/ng2-alerts';
import { BusLayoutModel } from '../../models/bus/busLayout.model';

@Component({
  selector: 'bus-layout',
  templateUrl: './bus-layout.component.html',
  styleUrls: ['./bus-layout.component.css']
})
export class BusLayoutComponent implements OnInit {

  @Input() data: any;
  @Input() numberOfSeat: number;
  @Output() outputValue: EventEmitter<any> = new EventEmitter();
  selectedSeat: Array<any> = [];
  floorOneList: any[] = [];
  floorTwoList: any[] = [];
  numbersOfCol: Array<any>;
  numbersOfRow: Array<any>;
  alertSettings: any;

  constructor(private _alert: AlertsService) { }

  ngOnInit() {
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

  checkSeat(objList, row, pos) {
    objList = this.groupObjByRow(objList, row);
    return objList.filter(item => item.pos.x === pos);
  }

  selectSeat(event, data, id) {
    if (!event.target.checked) {
      var indexOfSelectSeat = this.selectedSeat.indexOf(data);
      this.selectedSeat.splice(indexOfSelectSeat, 1);
    }
    if (this.selectedSeat.length < this.numberOfSeat) {
      if (event.target.checked) {
        this.selectedSeat.push(data);
      }
      this.outputValue.emit(this.selectedSeat);
    }
    else {
      this.openDialog('ไม่สามารถเลือกที่นั่งเกินจำนวนคนที่ท่านเลือกไว้ได้');
      (document.getElementById(id) as HTMLInputElement).checked = false;
    }
  }

  openDialog(msg) {
    let type: any = "warning";
    this.alertSettings = { overlay: true, overlayClickToClose: false, showCloseButton: true, duration: 100000 };
    this._alert.create(type, msg, this.alertSettings);
  }
}
