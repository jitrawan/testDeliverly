import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { HttpModule } from '@angular/http';

@Injectable()
export class ErrorMsgService {
    private staticURL = '//http://d11aliyfxni7iy.cloudfront.net/master/';
    private staticFile = '.txt';
    private getErrorFileAPI = this.staticURL + 'mst_error_iticket' + this.staticFile;

    constructor(private http: Http) { }

    getErrorFile() {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.get(this.getErrorFileAPI)
            .map((res: Response) => {
                // console.log(res);
                return res.json();
            })
            .catch((error: any) => { return Observable.throw(error.json || error || 'Server Error'); });
    }
}