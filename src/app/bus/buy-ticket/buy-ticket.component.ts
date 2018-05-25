import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CheckAllowService } from '@atk-service/checkAllow.service';
import { SharedService } from '@atk-service/shared-service.service';
import { AlertsService } from '@jaspero/ng2-alerts';;
import { ErrorMsgService } from '@atk-service/errorMsg.service';
import { Constant } from '@atk-shared/constant/constant';


@Component({
  selector: 'app-buy-ticket',
  templateUrl: './buy-ticket.component.html',
  styleUrls: ['./buy-ticket.component.css'],
  providers: [CheckAllowService]
})
export class BuyTicketComponent implements OnInit {

  isEnable: boolean = true;
  private msgError: string;
  private alertSettings: any;
  private const = new Constant;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private checkAllowService: CheckAllowService,
    private sharedService: SharedService,
    private _alert: AlertsService,
    private errorMsgService: ErrorMsgService
  ) { }

  ngOnInit() {
    this.receiveData();
    this.checkTime();
  }

  receiveData() {
    let receiveData;
    this.sharedService.receiveData.subscribe(data => receiveData = data);
    if (receiveData instanceof URLSearchParams) {
      if (receiveData.get('paymentChannel') != null) {
        sessionStorage.setItem('paymentChannel', receiveData.get('paymentChannel'));
      }

      if(receiveData.get('authToken') != null){
        sessionStorage.setItem('ALLTICKET:authToken', receiveData.get('authToken'));
      }
    }
  }

  public checkTime() {
    this.checkAllowService.checkAllowReserve().subscribe((res) => {
      if (res.code == this.const.successCode) {
        this.isEnable = true;
        this.router.navigate(['/bus/select-destination'], { relativeTo: this.route });
      } else {
        this.isEnable = false;
        this.msgError = res.msg;
      }
    }
      , (err) => {
        setTimeout(() => { this.checkTime(); }, 3000);
      }
    );
  }

  openDialog(msg) {
    let type: any = "warning";
    this.alertSettings = { overlay: true, overlayClickToClose: false, showCloseButton: true, duration: 100000 };
    this._alert.create(type, msg, this.alertSettings);

    jQuery('html,body', window.parent.document).animate({
      scrollTop: jQuery("#alert-box .jaspero__dialog").offset().top - 100
    }, 300);

  }

}