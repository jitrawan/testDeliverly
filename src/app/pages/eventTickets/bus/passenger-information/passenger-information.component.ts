import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SharedService } from '../../../../shared/services/shared-service.service';
import { PassengerInformationModel } from '../../../../shared/models/bus/passengerInformation.model';
import { ErrorMessage } from '../../../../shared/constant/error-message';
import { AlertsService } from '@jaspero/ng2-alerts';
import { Location } from '@angular/common';

@Component({
  selector: 'app-passenger-information',
  templateUrl: './passenger-information.component.html',
  styleUrls: ['./passenger-information.component.css', '../buy-ticket/buy-ticket.component.css']
})
export class PassengerInformationComponent implements OnInit {

  @Input() totalPassenger: number = 1;
  numOfPassengerBox: any[];
  passengerInfoList = new Array<PassengerInformationModel>();
  errorMessage = new ErrorMessage;
  isDisplay: boolean = true;
  alertSettings: any;
  tripName: any;
  receiveData: any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private sharedService: SharedService,
    private _alert: AlertsService,
    private location: Location,
  ) { }

  ngOnInit() {
    this.sharedService.receiveData.subscribe(data => this.receiveData = data);
    this.totalPassenger = this.receiveData.totalPassenger;
    this.numOfPassengerBox = Array(Number(this.totalPassenger)).fill('');
    for (let index = 0; index < this.totalPassenger; index++) {
      let passengerInfoModel: PassengerInformationModel = new PassengerInformationModel;
      this.passengerInfoList.push(passengerInfoModel);
      let receiveData;
      this.sharedService.receiveData.subscribe(data => receiveData = data);
      this.receiveData = receiveData.forwardData;
    }
  }

  onlyNumberKey(event) {
    let charCode = (event.which) ? event.which : event.keyCode;
    if (charCode != 46 && charCode > 31
      && (charCode < 48 || charCode > 57)) {
      this.openDialog(this.errorMessage.pleaseSelect + 'ตัวเลข');
      return false;
    }
    return true;
  }

  openDialog(msg) {
    let type: any = "warning";
    this.alertSettings = { overlay: true, overlayClickToClose: false, showCloseButton: true, duration: 100000 };
    this._alert.create(type, msg, this.alertSettings);
  }

  nextPage() {
    var isFound = false;
    for (let index = 0; index < this.passengerInfoList.length && !isFound; index++) {
      if (this.passengerInfoList[index].gender == undefined) {
        this.openDialog(this.errorMessage.pleaseSelect + 'เพศ ' + 'ของผู้โดยสารคนที่ ' + (index + 1));
        isFound = true;
        // break;
      } else if (this.passengerInfoList[index].passengerName == undefined) {
        this.openDialog(this.errorMessage.pleaseSelect + 'ชื่อ ' + 'ของผู้โดยสารคนที่ ' + (index + 1));
        isFound = true;
      } else if (this.passengerInfoList[index].passengerSurname == undefined) {
        this.openDialog(this.errorMessage.pleaseSelect + 'นามสกุล ' + 'ของผู้โดยสารคนที่ ' + (index + 1));
        isFound = true;
      } else if (this.passengerInfoList[index].passengerTel == undefined) {
        this.openDialog(this.errorMessage.pleaseSelect + 'เบอร์มือถือ ' + 'ของผู้โดยสารคนที่ ' + (index + 1));
        isFound = true;
      }
    }
    if (!isFound) {
      this.isDisplay = false;
      // this.sendMessage('test');
      // this.router.navigate(['../summary'], { relativeTo: this.route });
    }
  }

  sendMessage(msg: string) {
    this.sharedService.sendData(this.passengerInfoList);
  }

  goPreviousPage() {
    this.location.back();
  }
}


