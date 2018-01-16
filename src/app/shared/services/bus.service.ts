// import { Injectable } from '@angular/core';
// import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { HttpModule } from '@angular/http';

import { AvailableTrip } from '../models/availableTripSearch.model';
import { Province } from '../models/province.model';
// import {} from '../../pages/eventTickets/bus/select-destination/'

@Injectable()
export class BusService {

    // private dataStream = new BehaviorSubject<any>(null);

    // currentData = this.dataStream.asObservable();


    // constructor() { }

    // setData(data: any) {
    //     this.dataStream.next(data);
    // }
    private baseURL = '';
    // private getMasProvinceAPI = '../../pages/eventTickets/bus/select-destination/province-thailand.json';
    private getMasProvinceAPI = '../shared/services/province-thailand.json';
    constructor(private http: Http) { }

    getMasProvince() {
        let headers = new Headers({ 'Content-Type': 'application/json', 'AuthorizationToken': localStorage.getItem("FACTOKEN") });
        let options = new RequestOptions({ headers: headers, withCredentials: true });
        let body = {
            // userName: '',
            // token: ''
        };

        // return this.http.get(this.getMasProvinceAPI)
        //     .map(res => res.json)
        return this.http.post(this.getMasProvinceAPI, JSON.stringify(body), options)
            .map((res: Response) => {
                return res.json();
            })
            .catch((error: any) => { return Observable.throw(error.json || error || 'Server Error'); });
    }

}