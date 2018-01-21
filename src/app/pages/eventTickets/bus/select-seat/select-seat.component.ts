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
}
