import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from "@angular/router";
import { TransReservToModel } from '@atk-shared/models/payment/transReservTo.model';
import { UserTOModel } from '@atk-shared/models/payment/userTO.model';
import { ReserveDetailModel } from '@atk-shared/models/purchaseHistory/reserveDetail.model';

import { Constant } from '@atk-shared/constant/constant';

import { AlertsService } from '@jaspero/ng2-alerts';
import { ConfirmationService } from '@jaspero/ng2-confirmations';
import { ErrorMsgService } from '@atk-service/errorMsg.service';
import { SharedService } from '@atk-service/shared-service.service';
import { PaymentService } from '@atk-service/payment.service';

@Component({
    selector: 'app-result-reserve-popup-transit',
    templateUrl: './popup-result-reserve-transit.component.html',
    styleUrls: ['../../../../assets/css/standard/utility.css',
        './popup-result-reserve-transit.component.css'

    ]
})
export class ResultReservePopupTransitComponent implements OnInit {

    @Input() reserveDetail: ReserveDetailModel;
    const = new Constant;
    alertSettings: any;
    isDisplayPrintSlip: boolean = true;
    events: any;

    constructor(
        private sharedService: SharedService,
        private route: ActivatedRoute,
        private router: Router,
        private paymentService: PaymentService,
        private errorMsgService: ErrorMsgService,
        private _alert: AlertsService,
        private _confirm: ConfirmationService
    ) {
    }

    ngOnInit() {
        let url = this.route.snapshot.queryParams;
        if (url.paymentChannel != undefined) {
            sessionStorage.setItem("ALLTICKET:authToken", url.authToken);
            sessionStorage.setItem("paymentChannel", url.paymentChannel);
            this.callGetPurchaseHistory();
            this.isDisplayPrintSlip = false;
        } else {
            this.isDisplayPrintSlip = true;
        }

    }

    callGetPurchaseHistory() {
        this.paymentService.getPurchaseHistory().subscribe((res) => {
            if (res.code == this.const.successCode) {
                this.reserveDetail = res.data;
            } else {
                this.openDialog(this.errorMsgService.getErrorMsg(res.code));
            }
        },
            (err) => {
                this.openDialog(this.errorMsgService.getErrorMsg(err.code));
            }
        );
    }

    print() {
        let printContents, popupWin;
        printContents = document.getElementById('print-section').innerHTML;
        popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
        popupWin.document.open();
        popupWin.document
            .write(`<html>
         ${$('head').clone().html()}
        <body onload="window.print();">${printContents}</body></html>`);
        popupWin.document.close();
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