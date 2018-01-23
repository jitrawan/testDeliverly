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

  constructor() { }

  ngOnInit() {
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
                  "reserveId": "90560001",
                  "seatFloor": "2",
                  "seatNo": "A7",
                  "fee": "243",
                  "fare": "304",
                  "disFare": "0.00",
                  "disFee": "0.00",
                  "serviceMny": "0.00"
              }
          ]
      },
      "discount": {
          "id": "",
          "desc": ""
      }
  };
    // this.transCheckout.rtrnTrip.reserves.disFare
    // this.transCheckout.rtrnTrip.reserves.disFee
  }


}
