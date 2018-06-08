import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'show-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {

  @Input() loadingText: string;
  
  constructor() { }

  ngOnInit() {
  }

}
