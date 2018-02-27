import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { HttpModule } from '@angular/http';

import { AlertsService } from '@jaspero/ng2-alerts';
import { ErrorMsgService } from './errorMsg.service';

import { Constant } from '../../shared/constant/constant';

@Injectable()
export class CheckAllowService {

    private const = new Constant;
    alertSettings: any;

    private checkAllowReserveAPI = 'https://ad5xsmjzzj.execute-api.ap-southeast-1.amazonaws.com/v1/checkallowreserve';

    constructor(
        private http: Http,
        private _alert: AlertsService,
        private errorMsgService: ErrorMsgService
    ) { }


    checkAllowReserve() {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.get(this.checkAllowReserveAPI)
            .timeout(this.const.timeoutSec)
            .map((res: Response) => {
                return res.json();
            })
            .catch((error: Response) => { return Observable.throw(this.handleError(error)); });
    }

    handleError(error) {
        console.log('handleError >>>>', error);
        let err;
        if (error.name == 'TimeoutError') {
            err = { code: 40125 };
            this.openDialog(this.errorMsgService.getErrorMsg(err.code));
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