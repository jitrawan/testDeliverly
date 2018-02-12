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
    private baseURL = 'http://d11aliyfxni7iy.cloudfront.net/api/trs/';
    private staticURL = 'http://d11aliyfxni7iy.cloudfront.net/master/';
    private staticFile = '.txt';

    private getMasProvinceAPI = this.staticURL + 'ag_mas_province' + this.staticFile;
    private getMasParkAPI = this.staticURL + 'ag_mas_park' + this.staticFile;
    private getAvailableTripAPI = this.baseURL + 'ag_available_trip';
    private getBusLayoutAPI = this.baseURL + 'ag_get_bus_layout';
    private getRoutePrvParkMapAPI = this.baseURL + 'ag_route_prv_park_map';
    private markSeatAPI = this.baseURL + 'ag_mark_seat';
    private unMarkSeatAPI = this.baseURL + 'ag_unmark_seat';
    private getTransIdAPI = this.baseURL + 'ag_get_trans_id';
    private getTransCheckoutAPI = this.baseURL + 'ag_trans_checkout';
    private bookingAPI = this.baseURL + 'ag_booking';

    constructor(private http: Http) { }

    getMasProvince() {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        //  let options = new RequestOptions({ headers: headers, withCredentials: true });
        let options = new RequestOptions({ headers: headers });
        // let body = {};
        return this.http.get(this.getMasProvinceAPI)
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
        return this.http.get(this.getMasParkAPI)
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
        let body = {
            transId: markSeat.transId + "",
            tripId: markSeat.tripId + "",
            pickup: markSeat.pickup + "",
            pickupDesc: markSeat.pickupDesc + "",
            dropoff: markSeat.dropoff + "",
            dropoffDesc: markSeat.dropoffDesc + "",
            seatCnt: markSeat.seatCnt + ""
        };
        for (let index = 0; index < markSeat.seatFloor.length; index++) {
            body["seatNo[" + index + "]"] = markSeat.seatNo[index] + "";
            body["gender[" + index + "]"] = markSeat.gender[index] + "";
            body["seatFloor[" + index + "]"] = markSeat.seatFloor[index] + "";
        }
        console.log('body>>', body);
        return this.http.post(this.markSeatAPI, JSON.stringify(body), options)
            .map((res: Response) => {
                return res.json();
            })
        // .catch((error: any) => { return Observable.throw(error.json || error || 'Server Error'); });
    }

    unMarkSeat(markSeat: MarkSeatModel, reserveId) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        //  let options = new RequestOptions({ headers: headers, withCredentials: true });
        let options = new RequestOptions({ headers: headers });
        let body = {
            transId: markSeat.transId + "",
            tripId: markSeat.tripId + "",
            pickup: markSeat.pickup + "",
            dropoff: markSeat.dropoff + "",
            seatCnt: markSeat.seatCnt + "",
        };
        for (let index = 0; index < markSeat.seatFloor.length; index++) {
            body["seatNo[" + index + "]"] = markSeat.seatNo[index] + "";
            body["seatFloor[" + index + "]"] = markSeat.seatFloor[index] + "";
        }
        body["reserveId[" + 0 + "]"] = reserveId.reserveId + "";
        console.log('body>>', body);
        return this.http.post(this.unMarkSeatAPI, JSON.stringify(body), options)
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

    booking(passengerBooking) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        //  let options = new RequestOptions({ headers: headers, withCredentials: true });
        let options = new RequestOptions({ headers: headers });
        let body = {

        };
        return this.http.post(this.bookingAPI, JSON.stringify(body), options)
            .map((res: Response) => {
                return res.json();
            })
        // .catch((error: any) => { return Observable.throw(error.json || error || 'Server Error'); });
    }
}