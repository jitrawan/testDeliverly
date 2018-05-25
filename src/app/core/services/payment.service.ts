import { Component, Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { HttpModule } from '@angular/http';

import { Constant } from '../../shared/constant/constant';
import { AlertsService } from '@jaspero/ng2-alerts';
import { ErrorMsgService } from './errorMsg.service';

import { BuyTicketComponent } from '@atk-bus/buy-ticket/buy-ticket.component';

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/timeout';


@Injectable()
export class PaymentService {

    private const = new Constant;
    private apiTrsUrl = this.const.baseUrl + this.const.apiTrsUrl;
    private apiBusUrl = this.const.baseUrl + this.const.apiBusUrl;
    private apiCSPayUrl = this.const.baseUrl + this.const.apiCSPayUrl;

    private getPurchaseHistoryAPI = this.apiCSPayUrl + "get_purchase_history";

    alertSettings: any;

    constructor(
        private http: Http,
        private _alert: AlertsService,
        private errorMsgService: ErrorMsgService,
        private router: Router,
        private buyTicketComponent: BuyTicketComponent
    ) { }

    getPurchaseHistory() {
        let headers = new Headers({ 'Content-Type': 'application/json', 'authToken': sessionStorage.getItem("ALLTICKET:authToken"), 'paymentChannel': sessionStorage.getItem("paymentChannel") });
        let options = new RequestOptions({ headers: headers });
        let body = {};
        return this.http.post(this.getPurchaseHistoryAPI, JSON.stringify(body), options)
            .timeout(this.const.timeoutSec)
            .map((res: Response) => {
                return res.json();
            })
            .catch((error: Response) => { return Observable.throw(this.handleError(error)); });
    }

    handleError(error) {
        let err;
        if (error.name == 'TimeoutError') {
            err = { code: 40125 };
            this.openDialog(this.errorMsgService.getErrorMsg(err.code));
            // this.buyTicketComponent.checkTime();
            // this.router.navigate(['']);
        } else {
            err = { code: 99999 };
        }
        return err;
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