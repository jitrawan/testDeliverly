// import { Injectable } from '@angular/core';
// import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { HttpModule } from '@angular/http';

import { AvailableTrip } from '../models/bus/availableTripSearch.model';
import { ProvinceModel } from '../models/bus/province.model';
// import {} from '../../pages/eventTickets/bus/select-destination/'

@Injectable()
export class BusService {

    private baseURL = '';
    // private getMasProvinceAPI = '../../pages/eventTickets/bus/select-destination/province-thailand.json';
    private getMasProvinceAPI = 'https://s3-ap-southeast-1.amazonaws.com/allticket-trs-masterinfo/ag_mas_province.txt';
    private getMasParkAPI = 'https://s3-ap-southeast-1.amazonaws.com/allticket-trs-masterinfo/ag_mas_park.txt';
    constructor(private http: Http) { }

    getMasProvince() {
        return this.http.get(this.getMasProvinceAPI)
            .map((res: Response) => {
                return res.json();
            })
            // .catch((error: any) => { 
            //     return Observable.throw(error.json || error || 'Server Error');
            //  });
    }

    getMasPark() {
        return this.http.get(this.getMasParkAPI)
            .map((res: Response) => {
                return res.json();
            })
            // .catch((error: any) => { 
            //     return Observable.throw(error.json || error || 'Server Error');
            //  });
    }
}

// let headers = new Headers({ 'Content-Type': 'application/json' });
// let options = new RequestOptions({ headers: headers });
// let body = {};
// return this.http.post(this.getMasProvinceAPI, JSON.stringify(body), options)
//     .map((res: Response) => {
//         return res.json();
//     })
//     .catch((error: any) => { return Observable.throw(error.json || error || 'Server Error'); });