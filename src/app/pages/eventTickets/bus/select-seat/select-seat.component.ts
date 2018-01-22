import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-select-seat',
  templateUrl: './select-seat.component.html',
  styleUrls: ['./select-seat.component.css']
})
export class SelectSeatComponent implements OnInit {

  @Input() tripName: string;
  @Input() dptrPark: string;
  @Input() arrvPark: string;
  @Input() dptrDate: Date;
  @Input() arrvDate: Date;

  constructor() { }

  ngOnInit() {
    this.tripName = "เที่ยวไป";
  }


  detailContent: any = {
    emptySeat: "ที่นั่งว่าง กดเลือกที่นั่งตามต้องการ",
    sellSeat: "ที่นั่งถูกสำรองแล้ว",
    markSeat: "ที่นั่งที่เลือก"
  };

  data = {
    id: "224",
    code: "4202",
    desc: "ม.4(ข)46ที่นั่ง/กรต.ปี56",
    std: {
      "id": "6",
      "desc": "ม.4ข"
    },
    totalFloor: 2,
    totalSeat: 46,
    cols: 5,
    rows: 11,
    platform: "32",
    objects: [
      {
        type: 1,
        pos: {
          x: 1,
          y: 10,
          z: 2
        },
        dim: {
          h: 1,
          w: 1
        },
        name: "A7",
        reserveId: "",
        status: "",
        gender: ""
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
    ]
  }
}
