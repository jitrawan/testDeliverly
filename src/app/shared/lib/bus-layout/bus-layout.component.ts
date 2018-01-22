import { Component, OnInit, Input, Pipe } from '@angular/core';
import { BusLayoutModel } from '../../models/bus/busLayout.model';

@Component({
  selector: 'bus-layout',
  templateUrl: './bus-layout.component.html',
  styleUrls: ['./bus-layout.component.css']
})
export class BusLayoutComponent implements OnInit {

  @Input() data: any;
  @Input() numberOfSeat: number;

  selectedSeat: Array<any> = [];

  // busLayoutObj: any[];
  floorOneList: any[];
  floorTwoList: any[];
  // datas: any;
  numbersOfCol: Array<any>;
  numbersOfRow: Array<any>;
  constructor() { }

  ngOnInit() {

    console.log('.>>', this.data);
    console.log('. numberOfSeat>>', this.numberOfSeat);
    if (this.data != null) {
      this.numbersOfCol = Array(this.data.cols).fill('');
      this.numbersOfRow = Array(this.data.rows).fill('');
      if (this.data.totalFloor > 1) {
        this.floorOneList = this.sortObjects(this.groupObjByFloor(this.data.objects, 1));
        this.floorTwoList = this.sortObjects(this.groupObjByFloor(this.data.objects, 2));
        console.log('this.floorOneList >>>', this.floorOneList);
        console.log(' this.floorTwoList >>>', this.floorTwoList);
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

  selectSeat(event, data) {
    console.log('event >>>', event);
    console.log('data >>>', data);
    console.log('length >>>', this.selectedSeat.length);
    if (this.selectedSeat.length < this.numberOfSeat) {
      if (event.target.checked) {
        this.selectedSeat.push(data);
      } else {
        var index = this.selectedSeat.indexOf(data);
        this.selectedSeat.splice(index, 1);
      }
      console.log('this.selectedSeat >>> ', this.selectedSeat);
    } else {
      alert('');
    }
  }

}
