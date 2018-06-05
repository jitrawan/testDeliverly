import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

import { SeatByZoneModel } from '../../models/zoneSeat/seatByZone.model';
import { SeatModel } from '../../models/zoneSeat/seat.model';

@Component({
  selector: 'seat-layout',
  templateUrl: './seat-layout.component.html',
  styleUrls: ['./seat-layout.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SeatLayoutComponent implements OnInit {

  @Input() seatList: SeatByZoneModel[];
  @Input() seatLimit:number;

  @Output() seatsSelected: EventEmitter<any> = new EventEmitter();

  labelOfRow: any;
  labelOfCol: any;

  selectedSeat: any[] = [];
  seatLayoutData: any = {};
  zoomRange: Object;
  screenSize: string;
  private zoomStep: number = 1;
  private canzoom: boolean = true;
  private zoomValue = [
    {
      transform: 'translate3d(0,0,0) matrix(0.6, 0, 0, 0.6, 50, -30)'
    },
    {
      transform: 'translate3d(0,0,0) matrix(0.8, 0, 0, 0.8, 35, 0)'
    },
    {
      transform: 'translate3d(0,0,0) matrix(1, 0, 0, 1, 20, 30)'
    },
    {
      transform: 'translate3d(0,0,0) matrix(1.2, 0, 0, 1.2, 35, 50)'
    },
    {
      transform: 'translate3d(0,0,0) matrix(1.4, 0, 0, 1.4, 50, 100)'
    },
  ];
  
  constructor() {}

  ngOnInit() {
    console.time('seat-layout pre-render');
    this.layoutSpecial();
    this.checkScreenSize(window.innerWidth);
    this.zoomTrigger(true);
  }

  ngAfterViewInit() {
    console.timeEnd("seat-layout pre-render")
  }

  fetchRowSpecialData(col, row) {
    var resultAllObject;
    var seatLayoutList: SeatLayoutModel[] = [];
    for (var index = 0; index < this.seatList.length; index++) {
      var resultObject = this.seatList[index].seat.filter(item => item.rowName === row);
      var filterlabelOfColumn = resultObject.filter(item => item.colNo === col);
      if (filterlabelOfColumn != [] && filterlabelOfColumn.length > 0) {
        var seatLayout: SeatLayoutModel = new SeatLayoutModel;
        seatLayout.active = filterlabelOfColumn[0].active;
        seatLayout.available = filterlabelOfColumn[0].available;
        seatLayout.canSelect = filterlabelOfColumn[0].canSelect;
        seatLayout.colNo = filterlabelOfColumn[0].colNo;
        seatLayout.color = this.seatList[index].color;
        seatLayout.fontColor = this.seatList[index].fontColor;
        seatLayout.id = filterlabelOfColumn[0].id;
        seatLayout.lockType = filterlabelOfColumn[0].lockType;
        seatLayout.priceAmt = filterlabelOfColumn[0].priceAmt;
        seatLayout.rowName = filterlabelOfColumn[0].rowName;
        seatLayout.rowNo = filterlabelOfColumn[0].rowNo;
        seatLayout.seatNo = filterlabelOfColumn[0].seatNo;
        seatLayout.status = filterlabelOfColumn[0].status;
        seatLayout.zoneId = filterlabelOfColumn[0].zoneId;
        seatLayoutList.push(seatLayout);
        break;
      } else {
        seatLayoutList = [];
      }
    }
    // console.log(" col : "+col," row : "+row,seatLayoutList)
    return seatLayoutList;
  }

  prerender(){
    for(let row of this.labelOfRow) {
      for(let col of this.labelOfCol) {
        for(let data of this.fetchRowSpecialData(col, row)) {
          this.seatLayoutData[row+'-'+col] = data;
        }
      }
    }
  }

  layoutSpecial() {

    if (this.seatList.length > 1) {
      var row: string[] = [];
      var col: string[] = [];
      for (var index = 0; index < this.seatList.length; index++) {
        row = row.concat(this.seatList[index].labelOfRow);
        col = col.concat(this.seatList[index].labelOfCol);
      }
      this.labelOfRow = row.filter((elem, index) => row.indexOf(elem) === index);
      this.labelOfCol = col.filter((elem, index) => col.indexOf(elem) === index);
    } else {
      this.labelOfRow = this.seatList[0].labelOfRow;
      this.labelOfCol = this.seatList[0].labelOfCol;
    }

    this.prerender();
    
  }

  zoomTrigger(isZoomIn) {
    if(isZoomIn) {

      if(this.canzoom == false) {
        return false;
      }

      this.zoomStep++;

      if(this.zoomValue.length == this.zoomStep+1) {
        this.canzoom = false;
      }
      
    } else {
      if(this.zoomStep == 0) return false;

      this.zoomStep--;
      this.canzoom = true;
    }

    this.zoomRange = this.zoomValue[this.zoomStep];
  }

  selectSeat(event, data){

    const AVAILABLE_CLASS = "available";
    const SELECTED_CLASS = "selected";
    var isSplice = false;
    var seat:HTMLHtmlElement = event.currentTarget.firstElementChild;
    
    if(seat.classList.contains(AVAILABLE_CLASS)) {

      if(this.selectedSeat.length >= this.seatLimit) {
        alert('ไม่สามารถเลือกที่นั่งเกินจำนวนคนที่ท่านเลือกไว้ได้');
        return false;
      }

      seat.classList.remove(AVAILABLE_CLASS);
      seat.classList.add(SELECTED_CLASS);
    } else if(seat.classList.contains(SELECTED_CLASS)) {
      seat.classList.remove(SELECTED_CLASS);
      seat.classList.add(AVAILABLE_CLASS);

      var indexSelectedSeat = this.selectedSeat.indexOf(data);
      if(indexSelectedSeat > -1) {
        this.selectedSeat.splice(indexSelectedSeat, 1);
        isSplice = true;
      }
    }
    
    if (this.selectedSeat.length <= this.seatLimit && !isSplice) {
      this.selectedSeat.push(data);
    }


    // console.log(this.selectedSeat);
    this.seatsSelected.emit(this.selectedSeat);
  }

  checkScreenSize(width) {
    if(width > 1366) {
      this.screenSize = "lg";
    } else if(width < 1366 ) {
      this.screenSize = 'md';
    } else {
      this.screenSize = 'sm';
    }
  }
  
}

export class SeatLayoutModel {
  seatNo: string;
  rowName: string;
  status: string;
  id: string;
  priceAmt: number;
  rowNo: string;
  colNo: string;
  active: string;
  available: boolean;
  canSelect: boolean;
  zoneId: string;
  lockType: string;
  color: string;
  fontColor: string;
}
