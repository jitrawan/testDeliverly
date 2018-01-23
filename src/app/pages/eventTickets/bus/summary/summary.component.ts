import { Component, OnInit, Input } from '@angular/core';
import { TransCheckoutModel } from '../../../../shared/models/bus/transCheckout.model';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {

  @Input() passengerName: string = "นาย เคาท์เตอร์ เซอร์วิส";
  @Input() passengerTel: string = "092-826-7788";
  @Input() transCheckout: TransCheckoutModel;
  dprtPrice: number = 0;
  dprtDiscount: number = 0;
  rtrnPrice: number = 0;
  rtrnDiscount: number = 0;

  constructor() { }

  ngOnInit() {
    // this.transCheckout = {
    //   "dptrTrip": {
    //     "id": "3720857",
    //     "code": "บขส2S99120042G01",
    //     "date": "2018-02-01",
    //     "time": "18:30",
    //     "route": {
    //       "id": "211",
    //       "desc": "กรุงเทพฯ-คลองท่อม-กระบี่"
    //     },
    //     "busStd": {
    //       "id": "6",
    //       "desc": "ม.4ข"
    //     },
    //     "dptrPark": {
    //       "id": "1223",
    //       "desc": "กรุงเทพ(สายใต้ใหม่)"
    //     },
    //     "arrvPark": {
    //       "id": "846",
    //       "desc": "จุดจอด อ.คลองท่อม"
    //     },
    //     "reserves": [
    //       {
    //         "reserveId": "90560001",
    //         "seatFloor": "2",
    //         "seatNo": "A7",
    //         "fee": "243",
    //         "fare": "304",
    //         "disFare": "0.00",
    //         "disFee": "0.00",
    //         "serviceMny": "0.00"
    //       }
    //     ]
    //   },
    //   "discount": {
    //     "id": "",
    //     "desc": ""
    //   }
    // };

    this.transCheckout = {
      "dptrTrip": {
        "id": "3720857",
        "code": "บขส2S99120042G01",
        "date": "2018-02-01",
        "time": "18:30",
        "route": {
          "id": "211",
          "desc": "กรุงเทพฯ-คลองท่อม-กระบี่"
        },
        "busStd": {
          "id": "6",
          "desc": "ม.4ข"
        },
        "dptrPark": {
          "id": "1223",
          "desc": "กรุงเทพ(สายใต้ใหม่)"
        },
        "arrvPark": {
          "id": "846",
          "desc": "จุดจอด อ.คลองท่อม"
        },
        "reserves": [
          {
            "reserveId": "90560055",
            "seatFloor": "2",
            "seatNo": "B1",
            "fee": "243",
            "fare": "304",
            "disFare": "30.00",
            "disFee": "0.00",
            "serviceMny": "0.00"
          }
        ]
      },
      "rtrnTrip": {
        "id": "3720984",
        "code": "บขส2S99120042B01",
        "date": "2018-02-03",
        "time": "16:00",
        "route": {
          "id": "211",
          "desc": "กรุงเทพฯ-คลองท่อม-กระบี่"
        },
        "busStd": {
          "id": "6",
          "desc": "ม.4ข"
        },
        "dptrPark": {
          "id": "846",
          "desc": "จุดจอด อ.คลองท่อม"
        },
        "arrvPark": {
          "id": "1223",
          "desc": "กรุงเทพ(สายใต้ใหม่)"
        },
        "reserves": [
          {
            "reserveId": "90560056",
            "seatFloor": "2",
            "seatNo": "B1",
            "fee": "243",
            "fare": "304",
            "disFare": "30.00",
            "disFee": "0.00",
            "serviceMny": "0.00"
          }
        ]
      },
      "discount": {
        "id": "1",
        "desc": "10% ตั๋วไป-กลับ"
      }
    };

    this.calculateDprtPrice();
    this.calculateDprtDiscount();
    this.calculateRtrnPrice();
    this.calculateRtrnDiscount();

  }

  calculateDprtPrice() {
    for (let index = 0; index < this.transCheckout.dptrTrip.reserves.length; index++) {
      this.dprtPrice = this.dprtPrice + (Number(this.transCheckout.dptrTrip.reserves[index].fare) + Number(this.transCheckout.dptrTrip.reserves[index].fee));
    }
  }

  calculateDprtDiscount() {
    for (let index = 0; index < this.transCheckout.dptrTrip.reserves.length; index++) {
      this.dprtDiscount = this.dprtDiscount + (Number(this.transCheckout.dptrTrip.reserves[index].disFare) + Number(this.transCheckout.dptrTrip.reserves[index].disFee));
    }
  }

  calculateRtrnPrice() {
    for (let index = 0; index < this.transCheckout.rtrnTrip.reserves.length; index++) {
      this.rtrnPrice = this.rtrnPrice + (Number(this.transCheckout.rtrnTrip.reserves[index].fare) + Number(this.transCheckout.rtrnTrip.reserves[index].fee));
    }
  }

  calculateRtrnDiscount() {
    for (let index = 0; index < this.transCheckout.rtrnTrip.reserves.length; index++) {
      this.rtrnDiscount = this.rtrnDiscount + (Number(this.transCheckout.rtrnTrip.reserves[index].disFare) + Number(this.transCheckout.rtrnTrip.reserves[index].disFee));
    }
  }
}
