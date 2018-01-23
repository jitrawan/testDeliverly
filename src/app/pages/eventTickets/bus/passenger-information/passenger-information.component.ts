import { Component, OnInit, Input } from '@angular/core';
import { PassengerInformationModel } from '../../../../shared/models/bus/passengerInformation.model';
import { ErrorMessage } from '../../../../shared/constant/error-message';

@Component({
  selector: 'app-passenger-information',
  templateUrl: './passenger-information.component.html',
  styleUrls: ['./passenger-information.component.css']
})
export class PassengerInformationComponent implements OnInit {

  @Input() totalPassenger: number = 1;
  numOfPassengerBox: any[];
  passengerInfoList = new Array<PassengerInformationModel>();
  errorMessage = new ErrorMessage;

  constructor() { }

  ngOnInit() {
    this.numOfPassengerBox = Array(this.totalPassenger).fill('');
    for (let index = 0; index < this.totalPassenger; index++) {
      let passengerInfoModel: PassengerInformationModel = new PassengerInformationModel;
      this.passengerInfoList.push(passengerInfoModel);
    }
  }

  onClick() {
    for (let index = 0; index < this.passengerInfoList.length; index++) {
      if (this.passengerInfoList[index].gender == undefined) {
        alert(this.errorMessage.pleaseSelect + 'เพศ ' + 'ของผู้โดยสารคนที่ ' + (index + 1));
        break;
      } else if (this.passengerInfoList[index].passengerName == undefined) {
        alert(this.errorMessage.pleaseSelect + 'ชื่อ ' + 'ของผู้โดยสารคนที่ ' + (index + 1));
        break;
      } else if (this.passengerInfoList[index].passengerSurname == undefined) {
        alert(this.errorMessage.pleaseSelect + 'นามสกุล ' + 'ของผู้โดยสารคนที่ ' + (index + 1));
        break;
      } else if (this.passengerInfoList[index].passengerTel == undefined) {
        alert(this.errorMessage.pleaseSelect + 'เบอร์มือถือ ' + 'ของผู้โดยสารคนที่ ' + (index + 1));
        break;
      }
    }
  }

  onlyNumberKey(event) {
    let charCode = (event.which) ? event.which : event.keyCode;
    if (charCode != 46 && charCode > 31
      && (charCode < 48 || charCode > 57)) {
      alert(this.errorMessage.pleaseSelect + 'ตัวเลข');
      return false;
    }
    return true;
  }

}
