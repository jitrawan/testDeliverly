import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SharedService } from '../../../../shared/services/shared-service.service';
import { PassengerInformationModel } from '../../../../shared/models/bus/passengerInformation.model';
import { ErrorMessage } from '../../../../shared/constant/error-message';

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
  displaySummary: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private sharedService: SharedService
  ) { }

  ngOnInit() {
    this.numOfPassengerBox = Array(this.totalPassenger).fill('');
    for (let index = 0; index < this.totalPassenger; index++) {
      let passengerInfoModel: PassengerInformationModel = new PassengerInformationModel;
      this.passengerInfoList.push(passengerInfoModel);
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

  nextPage() {
    var isFound = false;
    for (let index = 0; index < this.passengerInfoList.length && !isFound; index++) {
      if (this.passengerInfoList[index].gender == undefined) {
        alert(this.errorMessage.pleaseSelect + 'เพศ ' + 'ของผู้โดยสารคนที่ ' + (index + 1));
        isFound = true;
        // break;
      } else if (this.passengerInfoList[index].passengerName == undefined) {
        alert(this.errorMessage.pleaseSelect + 'ชื่อ ' + 'ของผู้โดยสารคนที่ ' + (index + 1));
        isFound = true;
      } else if (this.passengerInfoList[index].passengerSurname == undefined) {
        alert(this.errorMessage.pleaseSelect + 'นามสกุล ' + 'ของผู้โดยสารคนที่ ' + (index + 1));
        isFound = true;
      } else if (this.passengerInfoList[index].passengerTel == undefined) {
        alert(this.errorMessage.pleaseSelect + 'เบอร์มือถือ ' + 'ของผู้โดยสารคนที่ ' + (index + 1));
        isFound = true;
      }
    }
    if (!isFound) {
      this.displaySummary = true;
      // this.sendMessage('test');
      // this.router.navigate(['../summary'], { relativeTo: this.route });
    }
  }

  sendMessage(msg : string) {
    console.log(' sendMessage >>>');
    this.sharedService.sendData(this.passengerInfoList);
    // this.sharedService.subject.next('test');
    // this.sharedService.sendMessage(msg);
 }

}
