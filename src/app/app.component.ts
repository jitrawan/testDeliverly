import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AlertsService } from '@jaspero/ng2-alerts';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css',]
})


export class AppComponent implements OnInit {
  title = 'app';

  toggleTitle() {
    $('.title').slideToggle(); //
  }

  constructor(
    private _alert: AlertsService,
    private route: ActivatedRoute
  ) { }
  paymentChannel: string = 'mobile';
  sub: any;

  ngOnInit() {
    // alert(this.paymentChannel);
    this.sub = this.route.params.subscribe(params => {
      console.log('params >>', params);
    });
    console.log('window.location.href >>', window.location.href);
    console.log('document.location.href >>', document.location.href);
    console.log(this.route.snapshot);
    let url = new URL(document.location.href);

    let searchParams = new URLSearchParams(url.search);
    console.log('searchParams >>>', searchParams.getAll);
    console.log('searchParams >>>', searchParams.get('payment_channel'));
    console.log('searchParams >>>', searchParams.get('cust_email'));

    // var params = {},
    //   queryString = url.substring(1),
    //   regex = /([^&=]+)=([^&]*)/g,
    //   m;

    // while (m = regex.exec(queryString)) {
    //   params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
    // }

    // console.log('parammm >>> ', params);

    // let parser = document.createElement('a');
    // console.log('parser<<< ', parser);

  }


  isDisable: boolean = false;
  showDialog() {
    console.log('----');
    this.isDisable = !this.isDisable;
  }
  private alertSettings: any;


  open() {
    let type: any = "wearning";
    this.alertSettings = { overlay: true, overlayClickToClose: false, showCloseButton: true, duration: 100000 };
    this._alert.create(type, "This is a message", this.alertSettings);
  }

}


// export interface AlertSettings {
//   overlay?: boolean;
//   overlayClickToClose?: boolean;
//   showCloseButton?: boolean;
//   duration?: number;
// }
