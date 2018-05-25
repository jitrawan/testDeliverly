import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params, NavigationEnd } from '@angular/router';

import { AlertsService } from '@jaspero/ng2-alerts';
import { SharedService } from '@atk-service/shared-service.service';
import { ErrorMsgService } from '@atk-service/errorMsg.service';
import { PushNotificationService } from 'ng-push-notification';
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {

  constructor(
    private sharedService: SharedService,
    private router: Router,
    private errorMsgService: ErrorMsgService,
    private pushNotification: PushNotificationService
  ) {
     pushNotification.requestPermission().then(function(value){
       console.log("Permisstion : " + value);
     });
  }
  paymentChannel: string = 'mobile';
  sub: any;

  ngOnInit() {
    let url = new URL(document.location.href);
    let searchParams = new URLSearchParams(url.search);
    this.sharedService.sendData(searchParams);

    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.parent.scroll(0, 0);
    });
    
    this.showPush();
    this.getErrorFile();
  }

  showPush() {
    this.pushNotification.show(
      'Hello Everyone !',
      {icon : "assets/images/allticket-logo.png"},
      6000, // close delay.
    );
  }
  
  getErrorFile() {
    this.errorMsgService.getErrorFileFromAPI();
  }
  
  async showAnotherPush() {
    const notification = await this.pushNotification.show('Returns promise with Notification object.');
    setTimeout(() => notification.close(), 1000);
  }
}
