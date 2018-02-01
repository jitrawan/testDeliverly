// import { Injectable } from '@angular/core';
// import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { HttpModule } from '@angular/http';

import { AvailableTripModel } from '../models/bus/availableTripSearch.model';
import { ProvinceModel } from '../models/bus/province.model';
// import {} from '../../pages/eventTickets/bus/select-destination/'

@Injectable()
export class BusService {

    // private baseURL = 'https://s3-ap-southeast-1.amazonaws.com/';
    private baseURL = 'http://busticketreserve-env.ap-southeast-1.elasticbeanstalk.com/api/trs/';
    // private getMasProvinceAPI = this.baseURL + 'allticket-trs-masterinfo/ag_mas_province.txt';
    // private getMasParkAPI = this.baseURL + 'allticket-trs-masterinfo/ag_mas_park.txt';

    private getMasProvinceAPI = this.baseURL + 'ag_mas_province'
    private getMasParkAPI = this.baseURL + 'ag_mas_park';
    private getAvailableTripAPI = this.baseURL + 'ag_available_trip';
    private getBusLayoutAPI = this.baseURL + 'ag_get_bus_layout';
    constructor(private http: Http) { }

    getMasProvince() {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        //  let options = new RequestOptions({ headers: headers, withCredentials: true });
        let options = new RequestOptions({ headers: headers });
        let body = {};
        return this.http.post(this.getMasProvinceAPI, JSON.stringify(body), options)
            .map((res: Response) => {
                return res.json();
            })
        // .catch((error: any) => { return Observable.throw(error.json || error || 'Server Error'); });
    }

    getMasPark() {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        //  let options = new RequestOptions({ headers: headers, withCredentials: true });
        let options = new RequestOptions({ headers: headers });
        let body = {};
        return this.http.post(this.getMasParkAPI, JSON.stringify(body), options)
            .map((res: Response) => {
                return res.json();
            })
    }

    getAvailableTrip(availableTrip: AvailableTripModel) {
        console.log('availableTrip>>> ', availableTrip);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        //  let options = new RequestOptions({ headers: headers, withCredentials: true });
        let options = new RequestOptions({ headers: headers });
        let body = availableTrip;
        return this.http.post(this.getAvailableTripAPI, JSON.stringify(body), options)
            .map((res: Response) => {
                console.log('res>>', res);
                return res.json();
            })
        // .catch((error: any) => { return Observable.throw(error.json || error || 'Server Error'); });
    }

    getBusLayout(tripId, pickup, dropoff) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        //  let options = new RequestOptions({ headers: headers, withCredentials: true });
        let options = new RequestOptions({ headers: headers });
        let body = {
            tripId: tripId,
            pickup: pickup,
            dropoff: dropoff
        };
        return this.http.post(this.getBusLayoutAPI, JSON.stringify(body), options)
            .map((res: Response) => {
                console.log('res>>', res);
                return res.json();
            })
        // .catch((error: any) => { return Observable.throw(error.json || error || 'Server Error'); });
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


// $.ajax({
//     url: 'http://localhost:8080/BusTicketReserveWorker/api/trs/postApi' (http://localhost:8080/BusTicketReserveWorker/api/trs/postApi%27),
//     timeout: 0,
//     type: 'POST',
//     data: '{a:1}',
//     dataType: 'json',
//     contentType: "application/json; charset=utf-8",
//     cache : false,
//     crossDomain: true,
//     success: function (dat) {
//         console.log(dat);
//         $('p').html(dat);
//     }, 