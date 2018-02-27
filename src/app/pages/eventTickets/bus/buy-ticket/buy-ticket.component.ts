import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CheckAllowService } from '../../../../shared/services/checkAllow.service';
import { SharedService } from '../../../../shared/services/shared-service.service';
import { AlertsService } from '@jaspero/ng2-alerts';;
import { ErrorMsgService } from '../../../../shared/services/errorMsg.service';
import { Constant } from '../../../../shared/constant/constant';


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
      sessionStorage.setItem('paymentChannel', receiveData.get('paymentChannel'));
      sessionStorage.setItem('ALLTICKET:authToken', receiveData.get('authToken'));
      // let token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwYXlsb2FkIjoie1wiZW1haWxcIjpcImJ1cmluc2FuQGdvc29mdC5jby50aFwiLFwicGF5bWVudENoYW5uZWxcIjpcIkMwN1wiLFwidGltZVN0ZW1wXCI6MTUxOTczMTc0MzcxOSxcImlzc3VlclwiOlwiY3NhdGsxOFwiLFwidXNlcklkXCI6XCJcIixcInRpY2tldFR5cGVcIjpcIjAxXCIsXCJsYW5nXCI6XCJUXCIsXCJ1cmxiYWNrXCI6XCJ3d3cuYWxsdGlja2V0LmNvbVwifSIsImlzcyI6ImNzYXRrMTgiLCJleHAiOjE1MTk3MzUzNDN9.bC1W9ZNUJEbfqotg1o22A0GC-3nGIqYSsqCmQ2SJBao'
      // sessionStorage.setItem('ALLTICKET:authToken', token);
    }
  }

  public checkTime() {
    this.checkAllowService.checkAllowReserve().subscribe((res) => {
      if (res.code == this.const.successCode) {
        this.isEnable = true;
        this.router.navigate(['/selectDestination'], { relativeTo: this.route });
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
