import { Component } from '@angular/core';
import { AlertsService } from '@jaspero/ng2-alerts';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css',]
})


export class AppComponent {
  title = 'app';

  toggleTitle() {
    $('.title').slideToggle(); //
  }



  isDisable: boolean = false;
  showDialog() {
    console.log('----');
    this.isDisable = !this.isDisable;
  }
  private alertSettings: any;

  constructor(
    private _alert: AlertsService,
  ) { }
  
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
