import { Component, OnInit, Input, Pipe } from '@angular/core';

@Component({
  selector: 'bus-layout',
  templateUrl: './bus-layout.component.html',
  styleUrls: ['./bus-layout.component.css']
})
export class BusLayoutComponent implements OnInit {

  numOfCol;
  numOfData;
  busLayoutObj: any[];
  floorOneList: any[];
  floorTwoList: any[];
  datas: any;
  @Input() floor: number = 1;
  constructor() { }

  ngOnInit() {
    // this.numOfCol = [1, 2, 3, 4];
    // this.numOfData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    // this.numOfData = [1, 2, 3, 4, 5];
    // console.log(this.numOfCol);

    this.busLayoutObj = [
      {
        "type": 1,
        "pos": {
          "x": 1,
          "y": 10,
          "z": 2
        },
        "dim": {
          "h": 1,
          "w": 1
        },
        "name": "A7",
        "reserveId": "",
        "status": "",
        "gender": ""
      },
      {
        "type": 1,
        "pos": {
          "x": 1,
          "y": 11,
          "z": 2
        },
        "dim": {
          "h": 1,
          "w": 1
        },
        "name": "A8",
        "reserveId": "",
        "status": "",
        "gender": ""
      },
      {
        "type": 1,
        "pos": {
          "x": 2,
          "y": 2,
          "z": 2
        },
        "dim": {
          "h": 1,
          "w": 1
        },
        "name": "B1",
        "reserveId": "",
        "status": "",
        "gender": ""
      },
      {
        "type": 1,
        "pos": {
          "x": 2,
          "y": 3,
          "z": 2
        },
        "dim": {
          "h": 1,
          "w": 1
        },
        "name": "B2",
        "reserveId": "",
        "status": "",
        "gender": ""
      },
      {
        "type": 1,
        "pos": {
          "x": 2,
          "y": 4,
          "z": 1
        },
        "dim": {
          "h": 1,
          "w": 1
        },
        "name": "B1",
        "reserveId": "",
        "status": "",
        "gender": ""
      },
      {
        "type": 1,
        "pos": {
          "x": 2,
          "y": 4,
          "z": 2
        },
        "dim": {
          "h": 1,
          "w": 1
        },
        "name": "B3",
        "reserveId": "",
        "status": "",
        "gender": ""
      },
      {
        "type": 1,
        "pos": {
          "x": 2,
          "y": 5,
          "z": 1
        },
        "dim": {
          "h": 1,
          "w": 1
        },
        "name": "B2",
        "reserveId": "",
        "status": "",
        "gender": ""
      },
      {
        "type": 1,
        "pos": {
          "x": 2,
          "y": 5,
          "z": 2
        },
        "dim": {
          "h": 1,
          "w": 1
        },
        "name": "B4",
        "reserveId": "",
        "status": "",
        "gender": ""
      },
      {
        "type": 1,
        "pos": {
          "x": 2,
          "y": 8,
          "z": 2
        },
        "dim": {
          "h": 1,
          "w": 1
        },
        "name": "B5",
        "reserveId": "",
        "status": "",
        "gender": ""
      },
      {
        "type": 1,
        "pos": {
          "x": 2,
          "y": 9,
          "z": 2
        },
        "dim": {
          "h": 1,
          "w": 1
        },
        "name": "B6",
        "reserveId": "",
        "status": "",
        "gender": ""
      },
      {
        "type": 1,
        "pos": {
          "x": 2,
          "y": 10,
          "z": 2
        },
        "dim": {
          "h": 1,
          "w": 1
        },
        "name": "B7",
        "reserveId": "",
        "status": "",
        "gender": ""
      },
      {
        "type": 1,
        "pos": {
          "x": 2,
          "y": 11,
          "z": 2
        },
        "dim": {
          "h": 1,
          "w": 1
        },
        "name": "B8",
        "reserveId": "",
        "status": "",
        "gender": ""
      },
      {
        "type": 2,
        "pos": {
          "x": 4,
          "y": 1,
          "z": 1
        },
        "dim": {
          "h": 1,
          "w": 2
        },
        "name": "พขร.",
        "reserveId": "",
        "status": "",
        "gender": ""
      },
      {
        "type": 1,
        "pos": {
          "x": 4,
          "y": 1,
          "z": 2
        },
        "dim": {
          "h": 1,
          "w": 1
        },
        "name": "C1",
        "reserveId": "",
        "status": "",
        "gender": ""
      },
      {
        "type": 1,
        "pos": {
          "x": 4,
          "y": 2,
          "z": 2
        },
        "dim": {
          "h": 1,
          "w": 1
        },
        "name": "C2",
        "reserveId": "",
        "status": "",
        "gender": ""
      },
      {
        "type": 1,
        "pos": {
          "x": 4,
          "y": 3,
          "z": 2
        },
        "dim": {
          "h": 1,
          "w": 1
        },
        "name": "C3",
        "reserveId": "",
        "status": "",
        "gender": ""
      },
      {
        "type": 1,
        "pos": {
          "x": 4,
          "y": 4,
          "z": 1
        },
        "dim": {
          "h": 1,
          "w": 1
        },
        "name": "C1",
        "reserveId": "",
        "status": "",
        "gender": ""
      },
      {
        "type": 1,
        "pos": {
          "x": 4,
          "y": 4,
          "z": 2
        },
        "dim": {
          "h": 1,
          "w": 1
        },
        "name": "C4",
        "reserveId": "",
        "status": "",
        "gender": ""
      },
      {
        "type": 1,
        "pos": {
          "x": 4,
          "y": 5,
          "z": 1
        },
        "dim": {
          "h": 1,
          "w": 1
        },
        "name": "C2",
        "reserveId": "",
        "status": "",
        "gender": ""
      },
      {
        "type": 1,
        "pos": {
          "x": 4,
          "y": 5,
          "z": 2
        },
        "dim": {
          "h": 1,
          "w": 1
        },
        "name": "C5",
        "reserveId": "",
        "status": "",
        "gender": ""
      },
      {
        "type": 1,
        "pos": {
          "x": 4,
          "y": 6,
          "z": 2
        },
        "dim": {
          "h": 1,
          "w": 1
        },
        "name": "C6",
        "reserveId": "",
        "status": "",
        "gender": ""
      },
      {
        "type": 2,
        "pos": {
          "x": 4,
          "y": 7,
          "z": 1
        },
        "dim": {
          "h": 1,
          "w": 2
        },
        "name": "ห้องน้ำ",
        "reserveId": "",
        "status": "",
        "gender": ""
      },
      {
        "type": 1,
        "pos": {
          "x": 4,
          "y": 7,
          "z": 2
        },
        "dim": {
          "h": 1,
          "w": 1
        },
        "name": "C7",
        "reserveId": "",
        "status": "",
        "gender": ""
      },
      {
        "type": 1,
        "pos": {
          "x": 4,
          "y": 8,
          "z": 2
        },
        "dim": {
          "h": 1,
          "w": 1
        },
        "name": "C8",
        "reserveId": "",
        "status": "",
        "gender": ""
      },
      {
        "type": 1,
        "pos": {
          "x": 4,
          "y": 9,
          "z": 2
        },
        "dim": {
          "h": 1,
          "w": 1
        },
        "name": "C9",
        "reserveId": "",
        "status": "",
        "gender": ""
      },
      {
        "type": 1,
        "pos": {
          "x": 4,
          "y": 10,
          "z": 2
        },
        "dim": {
          "h": 1,
          "w": 1
        },
        "name": "C10",
        "reserveId": "",
        "status": "",
        "gender": ""
      },
      {
        "type": 1,
        "pos": {
          "x": 4,
          "y": 11,
          "z": 2
        },
        "dim": {
          "h": 1,
          "w": 1
        },
        "name": "C11",
        "reserveId": "",
        "status": "",
        "gender": ""
      },
      {
        "type": 1,
        "pos": {
          "x": 5,
          "y": 1,
          "z": 2
        },
        "dim": {
          "h": 1,
          "w": 1
        },
        "name": "D1",
        "reserveId": "",
        "status": "",
        "gender": ""
      },
      {
        "type": 1,
        "pos": {
          "x": 5,
          "y": 2,
          "z": 2
        },
        "dim": {
          "h": 1,
          "w": 1
        },
        "name": "D2",
        "reserveId": "",
        "status": "",
        "gender": ""
      },
      {
        "type": 1,
        "pos": {
          "x": 5,
          "y": 3,
          "z": 2
        },
        "dim": {
          "h": 1,
          "w": 1
        },
        "name": "D3",
        "reserveId": "",
        "status": "",
        "gender": ""
      },
      {
        "type": 1,
        "pos": {
          "x": 5,
          "y": 4,
          "z": 1
        },
        "dim": {
          "h": 1,
          "w": 1
        },
        "name": "D1",
        "reserveId": "",
        "status": "",
        "gender": ""
      },
      {
        "type": 1,
        "pos": {
          "x": 5,
          "y": 4,
          "z": 2
        },
        "dim": {
          "h": 1,
          "w": 1
        },
        "name": "D4",
        "reserveId": "",
        "status": "",
        "gender": ""
      },
      {
        "type": 1,
        "pos": {
          "x": 5,
          "y": 5,
          "z": 1
        },
        "dim": {
          "h": 1,
          "w": 1
        },
        "name": "D2",
        "reserveId": "",
        "status": "",
        "gender": ""
      },
      {
        "type": 1,
        "pos": {
          "x": 5,
          "y": 5,
          "z": 2
        },
        "dim": {
          "h": 1,
          "w": 1
        },
        "name": "D5",
        "reserveId": "",
        "status": "",
        "gender": ""
      },
      {
        "type": 1,
        "pos": {
          "x": 5,
          "y": 6,
          "z": 2
        },
        "dim": {
          "h": 1,
          "w": 1
        },
        "name": "D6",
        "reserveId": "",
        "status": "",
        "gender": ""
      },
      {
        "type": 1,
        "pos": {
          "x": 5,
          "y": 7,
          "z": 2
        },
        "dim": {
          "h": 1,
          "w": 1
        },
        "name": "D7",
        "reserveId": "",
        "status": "",
        "gender": ""
      },
      {
        "type": 1,
        "pos": {
          "x": 5,
          "y": 8,
          "z": 2
        },
        "dim": {
          "h": 1,
          "w": 1
        },
        "name": "D8",
        "reserveId": "",
        "status": "",
        "gender": ""
      },
      {
        "type": 1,
        "pos": {
          "x": 5,
          "y": 9,
          "z": 2
        },
        "dim": {
          "h": 1,
          "w": 1
        },
        "name": "D9",
        "reserveId": "",
        "status": "",
        "gender": ""
      },
      {
        "type": 1,
        "pos": {
          "x": 5,
          "y": 10,
          "z": 2
        },
        "dim": {
          "h": 1,
          "w": 1
        },
        "name": "D10",
        "reserveId": "",
        "status": "",
        "gender": ""
      },
      {
        "type": 1,
        "pos": {
          "x": 5,
          "y": 11,
          "z": 2
        },
        "dim": {
          "h": 1,
          "w": 1
        },
        "name": "D11",
        "reserveId": "",
        "status": "",
        "gender": ""
      },
      {
        "type": 2,
        "pos": {
          "x": 1,
          "y": 1,
          "z": 1
        },
        "dim": {
          "h": 1,
          "w": 2
        },
        "name": "บันไดล่าง1",
        "reserveId": "",
        "status": "",
        "gender": ""
      },
      {
        "type": 2,
        "pos": {
          "x": 1,
          "y": 1,
          "z": 2
        },
        "dim": {
          "h": 1,
          "w": 2
        },
        "name": "บันไดบน 1",
        "reserveId": "",
        "status": "",
        "gender": ""
      },
      {
        "type": 2,
        "pos": {
          "x": 1,
          "y": 2,
          "z": 1
        },
        "dim": {
          "h": 2,
          "w": 5
        },
        "name": "ห้องพัก พขร.",
        "reserveId": "",
        "status": "",
        "gender": ""
      },
      {
        "type": 1,
        "pos": {
          "x": 1,
          "y": 2,
          "z": 2
        },
        "dim": {
          "h": 1,
          "w": 1
        },
        "name": "A1",
        "reserveId": "",
        "status": "",
        "gender": ""
      },
      {
        "type": 1,
        "pos": {
          "x": 1,
          "y": 3,
          "z": 2
        },
        "dim": {
          "h": 1,
          "w": 1
        },
        "name": "A2",
        "reserveId": "",
        "status": "",
        "gender": ""
      },
      {
        "type": 1,
        "pos": {
          "x": 1,
          "y": 4,
          "z": 1
        },
        "dim": {
          "h": 1,
          "w": 1
        },
        "name": "A1",
        "reserveId": "",
        "status": "",
        "gender": ""
      },
      {
        "type": 1,
        "pos": {
          "x": 1,
          "y": 4,
          "z": 2
        },
        "dim": {
          "h": 1,
          "w": 1
        },
        "name": "A3",
        "reserveId": "",
        "status": "",
        "gender": ""
      },
      {
        "type": 1,
        "pos": {
          "x": 1,
          "y": 5,
          "z": 1
        },
        "dim": {
          "h": 1,
          "w": 1
        },
        "name": "A2",
        "reserveId": "",
        "status": "",
        "gender": ""
      },
      {
        "type": 1,
        "pos": {
          "x": 1,
          "y": 5,
          "z": 2
        },
        "dim": {
          "h": 1,
          "w": 1
        },
        "name": "A4",
        "reserveId": "",
        "status": "",
        "gender": ""
      },
      {
        "type": 2,
        "pos": {
          "x": 1,
          "y": 6,
          "z": 2
        },
        "dim": {
          "h": 2,
          "w": 2
        },
        "name": "บันไดบน 2",
        "reserveId": "",
        "status": "",
        "gender": ""
      },
      {
        "type": 2,
        "pos": {
          "x": 1,
          "y": 7,
          "z": 1
        },
        "dim": {
          "h": 1,
          "w": 2
        },
        "name": "บันไดล่าง 2",
        "reserveId": "",
        "status": "",
        "gender": ""
      },
      {
        "type": 2,
        "pos": {
          "x": 1,
          "y": 8,
          "z": 1
        },
        "dim": {
          "h": 4,
          "w": 5
        },
        "name": "ห้องเก็บสัมภาระ",
        "reserveId": "",
        "status": "",
        "gender": ""
      },
      {
        "type": 1,
        "pos": {
          "x": 1,
          "y": 8,
          "z": 2
        },
        "dim": {
          "h": 1,
          "w": 1
        },
        "name": "A5",
        "reserveId": "",
        "status": "",
        "gender": ""
      },
      {
        "type": 1,
        "pos": {
          "x": 1,
          "y": 9,
          "z": 2
        },
        "dim": {
          "h": 1,
          "w": 1
        },
        "name": "A6",
        "reserveId": "",
        "status": "",
        "gender": ""
      }
    ];
    console.log(this.busLayoutObj);

    this.datas = {
      "id": "224",
      "code": "4202",
      "desc": "ม.4(ข)46ที่นั่ง/กรต.ปี56",
      "std": {
        "id": "6",
        "desc": "ม.4ข"
      },
      "totalFloor": 2,
      "totalSeat": 46,
      "cols": 5,
      "rows": 11,
      "platform": "32",
      "objects": this.busLayoutObj
    };

    this.numbersOfCol = Array(this.datas.cols).fill('');
    // console.log('numbersOfCol->>> ', this.numbersOfCol);
    this.numbersOfRow = Array(this.datas.rows).fill('');
    // console.log('numbersOfRow->>> ', this.numbersOfRow);

    if (this.datas.totalFloor > 1) {
      this.floorOneList = this.sortObjects(this.groupObjByFloor(this.busLayoutObj, 1));
      this.floorTwoList = this.sortObjects(this.groupObjByFloor(this.busLayoutObj, 2));
      console.log('this.floorOneList >>>', this.floorOneList);
      console.log(' this.floorTwoList >>>', this.floorTwoList);
    } else {
      this.floorOneList = this.sortObjects(this.busLayoutObj);
    }

  }

  numbersOfCol: Array<any>;
  numbersOfRow: Array<any>;
  // indexOfData: number;
  // dataForCol: Array<any>;
  // data: Array<any>;
  // col: number = 0;

  // public getNumbersOfCol(numbOfRow: any): any {
  //   if (numbOfRow == 0) {
  //     this.indexOfData = 0;
  //   }
  //   var dataBegin: any;
  //   var dataLast: any;
  //   while (this.dataForCol.length > 0) {
  //     this.dataForCol.pop();
  //   }

  //   if (this.indexOfData <= this.data.length) {
  //     dataBegin = (numbOfRow * this.col);
  //     dataLast = (this.col * (numbOfRow + 1) - 1);

  //     if (dataLast >= this.data.length) {
  //       dataLast = this.data.length - 1;
  //     }

  //     for (var i = dataBegin; i <= dataLast; i++) {
  //       this.dataForCol.push(this.data[i]);
  //     }
  //   }

  //   this.numbersOfCol = this.dataForCol;
  //   this.indexOfData = this.indexOfData + 1;

  //   return this.numbersOfCol;
  // }

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

}
