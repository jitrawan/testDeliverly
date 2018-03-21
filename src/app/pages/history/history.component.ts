import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css', '../../../assets/css/standard/utility.css', '../../../assets/css/standard/layout.css']
})
export class HistoryComponent implements OnInit {

  eventHis: boolean = true;
  busHis: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  showEventHis() {
    this.eventHis = true;
    this.busHis = false;
  }

  showBusHis() {
    this.eventHis = false;
    this.busHis = true;
  }

}
