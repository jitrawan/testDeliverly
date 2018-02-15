import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { AlertsService } from '@jaspero/ng2-alerts';
import { SharedService } from './shared/services/shared-service.service';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css',]
})


export class AppComponent implements OnInit {

  constructor(
    private sharedService: SharedService,
  ) { }
  paymentChannel: string = 'mobile';
  sub: any;

  ngOnInit() {
    let url = new URL(document.location.href);
    let searchParams = new URLSearchParams(url.search);
    this.sharedService.sendData(searchParams);
  }

}
