// import { Injectable } from '@angular/core';
// import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { HttpModule } from '@angular/http';

import { AvailableTripModel } from '../models/bus/availableTripSearch.model';
import { ProvinceModel } from '../models/bus/province.model';
import { MarkSeatModel } from '../models/bus/markSeat.model';

@Injectable()
export class BusService {

    // private baseURL = 'https://s3-ap-southeast-1.amazonaws.com/';
    private baseURL = 'http://d11aliyfxni7iy.cloudfront.net/api/trs/'
    // private baseURL = 'http://busticketreserve-env.ap-southeast-1.elasticbeanstalk.com/api/trs/';
    // private getMasProvinceAPI = this.baseURL + 'allticket-trs-masterinfo/ag_mas_province.txt';
    // private getMasParkAPI = this.baseURL + 'allticket-trs-masterinfo/ag_mas_park.txt';

    private getMasProvinceAPI = this.baseURL + 'ag_mas_province'
    private getMasParkAPI = this.baseURL + 'ag_mas_park';
    private getAvailableTripAPI = this.baseURL + 'ag_available_trip';
    private getBusLayoutAPI = this.baseURL + 'ag_get_bus_layout';
    private getRoutePrvParkMapAPI = this.baseURL + 'ag_route_prv_park_map';
    private markSeatAPI = this.baseURL + 'ag_mark_seat';
    private getTransIdAPI = this.baseURL + 'ag_get_trans_id';
    private getTransCheckoutAPI = this.baseURL + 'ag_trans_checkout';

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
                return res.json();
            })
        // .catch((error: any) => { return Observable.throw(error.json || error || 'Server Error'); });
    }

    getRoutePrvParkMap(pickupId) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        //  let options = new RequestOptions({ headers: headers, withCredentials: true });
        let options = new RequestOptions({ headers: headers });
        let body = {
            pickup: pickupId
        };
        return this.http.post(this.getRoutePrvParkMapAPI, JSON.stringify(body), options)
            .map((res: Response) => {
                console.log('res>>', res);
                return res.json();
            })
        // .catch((error: any) => { return Observable.throw(error.json || error || 'Server Error'); });
    }

    getBusLayout(tripId, pickupId, dropoffId) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        //  let options = new RequestOptions({ headers: headers, withCredentials: true });
        let options = new RequestOptions({ headers: headers });
        let body = {
            tripId: tripId,
            pickup: pickupId,
            dropoff: dropoffId
        };
        return this.http.post(this.getBusLayoutAPI, JSON.stringify(body), options)
            .map((res: Response) => {
                return res.json();
            })
        // .catch((error: any) => { return Observable.throw(error.json || error || 'Server Error'); });
    }

    getTransId(transType: string) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        //  let options = new RequestOptions({ headers: headers, withCredentials: true });
        let options = new RequestOptions({ headers: headers });
        let body = {
            transType: transType
        };
        return this.http.post(this.getTransIdAPI, JSON.stringify(body), options)
            .map((res: Response) => {
                return res.json();
            })
        // .catch((error: any) => { return Observable.throw(error.json || error || 'Server Error'); });
    }

    markSeat(markSeat: MarkSeatModel) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        //  let options = new RequestOptions({ headers: headers, withCredentials: true });
        let options = new RequestOptions({ headers: headers });
        // let body = markSeat;
        let body = {
            transId: markSeat.transId + "",
            tripId: markSeat.tripId + "",
            pickup: markSeat.pickup + "",
            pickupDesc: markSeat.pickupDesc + "",
            dropoff: markSeat.dropoff + "",
            dropoffDesc: markSeat.dropoffDesc + "",
            seatCnt: markSeat.seatCnt + ""
        };
        // let seatFloor;
        for (let index = 0; index < markSeat.seatFloor.length; index++) {
            body["seatNo[" + index + "]"] = markSeat.seatNo[index] + "";
            body["gender[" + index + "]"] = markSeat.gender[index] + "";
            body["seatFloor[" + index + "]"] = markSeat.seatFloor[index] + "";
        }
        console.log('body >>>>>> ', body);
        return this.http.post(this.markSeatAPI, JSON.stringify(body), options)
            .map((res: Response) => {
                return res.json();
            })
        // .catch((error: any) => { return Observable.throw(error.json || error || 'Server Error'); });
    }

    getTransCheckout(transId: string) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        //  let options = new RequestOptions({ headers: headers, withCredentials: true });
        let options = new RequestOptions({ headers: headers });
        let body = {
            transId: transId
        };
        return this.http.post(this.getTransCheckoutAPI, JSON.stringify(body), options)
            .map((res: Response) => {
                return res.json();
            })
        // .catch((error: any) => { return Observable.throw(error.json || error || 'Server Error'); });
    }
}