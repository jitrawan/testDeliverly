import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'bus-error',
  templateUrl: './bus-error.component.html',
  styleUrls: ['./bus-error.component.css']
})
export class BusErrorComponent implements OnInit {

  @Input() msgError: string;

  constructor() { }

  ngOnInit() {
  }

}
