import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { HttpModule } from '@angular/http';

import { ErrorCodeModel } from '../models/error/error.model';
import { ErrorMessage } from '../constant/error-message'

@Injectable()
export class ErrorMsgService {
    private staticURL = '//d11aliyfxni7iy.cloudfront.net/master/';
    private staticFile = '.txt';
    private getErrorFileAPI = this.staticURL + 'mst_error_iticket' + this.staticFile;
    private errorCodeModel: ErrorCodeModel[];
    private errorMessage: ErrorMessage = new ErrorMessage;

    constructor(private http: Http) { }

    getErrorFile() {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.get(this.getErrorFileAPI)
            .map((res: Response) => {
                return res.json();
            })
            .catch((error: any) => { return Observable.throw(error.json || error || 'Server Error'); });
    }

    getErrorMsg(code) {
        this.errorCodeModel = JSON.parse(localStorage.getItem('errorCodeList'));
        if (this.errorCodeModel != null) {
            let error = this.errorCodeModel.filter(item => item.errorID === code);
            if (error.length > 0) {
                return error[0].descThai;
            } else {
                return this.errorMessage.unknowException;
            }
        }
    }
}