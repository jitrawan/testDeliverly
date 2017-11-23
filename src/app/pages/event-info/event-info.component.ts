import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-event-info',
  templateUrl: './event-info.component.html',
  styleUrls: ['./event-info.component.css',
    '../../../assets/css/standard/jquerysctipttop.css']
})
export class EventInfoComponent implements OnInit {

  constructor() { }

  private showMap: boolean = false;

  private clickShowMap() {
    this.showMap = !this.showMap;
  }

  ngOnInit() {

  }
}
