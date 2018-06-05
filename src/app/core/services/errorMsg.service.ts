import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import "rxjs/add/operator/timeout";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";

import { HttpModule } from '@angular/http';

import { ErrorCodeModel } from '@atk-shared/models/error/error.model';
import { ErrorMessage } from '@atk-shared/constant/error-message';
import { Constant } from '@atk-shared/constant/constant';

import { AlertsService } from '@jaspero/ng2-alerts';

@Injectable()
export class ErrorMsgService {

    private const = new Constant;
    private staticURL = this.const.baseUrl + this.const.staticFileBusUrl;
    private staticFile = '.txt';
    private getErrorFileAPI = this.staticURL + 'mst_error_iticket' + this.staticFile;
    private errorCodeModel: ErrorCodeModel[];
    private errorMessage: ErrorMessage = new ErrorMessage;
    private alertSettings: any;
    private errorCode: number = 0;


    constructor(
        private http: Http,
        private _alert: AlertsService,
    ) { }

    getErrorFile() {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.get(this.getErrorFileAPI)
            .timeout(this.const.timeoutSec)
            .map((res: Response) => {
                return res.json();
            })
            .catch((error: Response) => {
                return Observable.throw(this.handleError(error));
            });
    }

    getErrorMsg(code) {
        let record = JSON.parse(localStorage.getItem('errorCodeList'));
        if (record != null) {
            this.errorCodeModel = record.value;
            let error = this.errorCodeModel.filter((item) => item.errorID === code + "" || item.vendor_error_id === code + "");
            if (error.length > 0) {
                return error[0].descThai;
            } else {
                return this.errorMessage.unknowException;
            }
        } else {
            this.errorCode = code;
            this.getErrorFileFromAPI();
        }
    }

    getErrorFileFromAPI() {
        if (this.checkExpireLocalStorage()) {
            this.getErrorFile().subscribe((res) => {
                if (res.code == this.const.successCode) {
                    var record = { value: res.data, timestamp: new Date().setHours(0, 0, 0, 0) }
                    localStorage.setItem('errorCodeList', JSON.stringify(record));
                } else {
                    // this.openDialog(this.getErrorMsg(res.code));
                }
            },
                (err) => {
                    // this.openDialog(this.getErrorMsg(err.code));
                }
            );
        }
    }

    checkExpireLocalStorage() {
        var record = JSON.parse(localStorage.getItem('errorCodeList'));
        if (!record) { return true; }
        var today = new Date().setHours(0, 0, 0, 0)
        return (new Date(record.timestamp) < new Date(today));
    }

    handleError(error) {
        let err;
        if (error.name == 'TimeoutError') {
            err = { code: 40125 };

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