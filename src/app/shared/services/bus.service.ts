import { Component, Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { HttpModule } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';

import { AvailableTripModel } from '../models/bus/availableTripSearch.model';
import { ProvinceModel } from '../models/bus/province.model';
import { MarkSeatModel } from '../models/bus/markSeat.model';
import { PassengerBookingModel } from '../models/bus/passengerBooking.model';
import { Constant } from '../../shared/constant/constant';
import { AlertsService } from '@jaspero/ng2-alerts';
import { ErrorMsgService } from './errorMsg.service';

import { BuyTicketComponent } from '../../pages/eventTickets/bus/buy-ticket/buy-ticket.component';

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/timeout'

import { InsertBookingInfoModel } from '../models/bus/insertBookingInfo.model';

@Injectable()
export class BusService {

    private const = new Constant;
    private apiTrsUrl = this.const.baseUrl + this.const.apiTrsUrl;
    private apiBusUrl = this.const.baseUrl + this.const.apiBusUrl;
    private staticURL = this.const.baseUrl + this.const.staticFileBusUrl;
    private staticFile = '.txt';

    private getMasProvinceAPI = this.staticURL + 'ag_mas_province' + this.staticFile;
    private getMasParkAPI = this.staticURL + 'ag_mas_park' + this.staticFile;
    private getAvailableTripAPI = this.apiTrsUrl + 'ag_available_trip';
    private getBusLayoutAPI = this.apiTrsUrl + 'ag_get_bus_layout';
    private getRoutePrvParkMapAPI = this.apiTrsUrl + 'ag_route_prv_park_map;';
    private markSeatAPI = this.apiTrsUrl + 'ag_mark_seat';
    private unMarkSeatAPI = this.apiTrsUrl + 'ag_unmark_seat';
    private getTransIdAPI = this.apiTrsUrl + 'ag_get_trans_id';
    private getTransCheckoutAPI = this.apiTrsUrl + 'ag_trans_checkout';
    private bookingAPI = this.apiTrsUrl + 'ag_booking';
    private cancelBookingAPI = this.apiTrsUrl + 'ag_cancel_booking';
    private insertBookingInfoAPI = this.apiBusUrl + 'insert_booking_info';
    private clearTransSeatmarkAPI = this.apiTrsUrl + 'ag_clear_trans_seatmark';
    // private checkAllowReserveAPI = 'https://ad5xsmjzzj.execute-api.ap-southeast-1.amazonaws.com/v1/checkallowreserve';
    alertSettings: any;
    // private buyTicketComponent = new BuyTicketComponent;

    constructor(
        private http: Http,
        private _alert: AlertsService,
        private errorMsgService: ErrorMsgService,
        private router: Router,
        private buyTicketComponent: BuyTicketComponent
    ) { }

    getMasProvince() {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.get(this.getMasProvinceAPI)
            .timeout(this.const.timeoutSec)
            .map((res: Response) => {
                return res.json();
            })
            .catch((error: Response) => { return Observable.throw(this.handleError(error)); });
    }

    getMasPark() {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.get(this.getMasParkAPI)
            .timeout(this.const.timeoutSec)
            .map((res: Response) => {
                return res.json();
            })
            .catch((error: Response) => {
                return Observable.throw(this.handleError(error));
            });
    }

    getRoutePrvParkMap(pickupId) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let body = {
            pickup: pickupId
        };
        return this.http.post(this.getRoutePrvParkMapAPI, JSON.stringify(body), options)
            .timeout(this.const.timeoutSec)
            .map((res: Response) => {
                return res.json();
            })
            .catch((error: Response) => {
                return Observable.throw(this.handleError(error));
            });
    }

    getAvailableTrip(availableTrip: AvailableTripModel) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let body = availableTrip;
        return this.http.post(this.getAvailableTripAPI, JSON.stringify(body), options)
            .timeout(this.const.timeoutSec)
            .map((res: Response) => {
                return res.json();
            })
            .catch((error: Response) => { return Observable.throw(this.handleError(error)); });
    }

    getBusLayout(tripId, pickupId, dropoffId) {
        let headers = new Headers({ 'Content-Type': 'application/json', 'authToken': sessionStorage.getItem("ALLTICKET:authToken"), 'paymentChannel': sessionStorage.getItem("paymentChannel") });
        let options = new RequestOptions({ headers: headers });
        let body = {
            tripId: tripId,
            pickup: pickupId,
            dropoff: dropoffId
        };
        return this.http.post(this.getBusLayoutAPI, JSON.stringify(body), options)
            .timeout(this.const.timeoutSec)
            .map((res: Response) => {
                return res.json();
            })
            .catch((error: Response) => { return Observable.throw(this.handleError(error)); });
    }

    getTransId(transType: string) {
        let headers = new Headers({ 'Content-Type': 'application/json', 'authToken': sessionStorage.getItem("ALLTICKET:authToken"), 'paymentChannel': sessionStorage.getItem("paymentChannel") });
        let options = new RequestOptions({ headers: headers });
        let body = {
            transType: transType
        };
        return this.http.post(this.getTransIdAPI, JSON.stringify(body), options)
            .timeout(this.const.timeoutSec)
            .map((res: Response) => {
                return res.json();
            })
            .catch((error: Response) => { return Observable.throw(this.handleError(error)); });
    }

    markSeat(markSeat: MarkSeatModel) {
        let headers = new Headers({ 'Content-Type': 'application/json', 'authToken': sessionStorage.getItem("ALLTICKET:authToken"), 'paymentChannel': sessionStorage.getItem("paymentChannel") });
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
        return this.http.post(this.markSeatAPI, JSON.stringify(body), options)
            .timeout(this.const.timeoutSec)
            .map((res: Response) => {
                return res.json();
            })
            .catch((error: any) => {
                return Observable.throw(this.handleMarkSeatError(error, markSeat.transId + ''))
            }
            );
    }

    unMarkSeat(markSeat: MarkSeatModel, reserveId) {
        let headers = new Headers({ 'Content-Type': 'application/json', 'authToken': sessionStorage.getItem("ALLTICKET:authToken"), 'paymentChannel': sessionStorage.getItem("paymentChannel") });
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
        return this.http.post(this.unMarkSeatAPI, JSON.stringify(body), options)
            .timeout(this.const.timeoutSec)
            .map((res: Response) => {
                return res.json();
            })
            .catch((error: Response) => { return Observable.throw(this.handleMarkSeatError(error, markSeat.transId + '')) });
    }

    getTransCheckout(transId: string) {
        let headers = new Headers({ 'Content-Type': 'application/json', 'authToken': sessionStorage.getItem("ALLTICKET:authToken"), 'paymentChannel': sessionStorage.getItem("paymentChannel") });
        let options = new RequestOptions({ headers: headers });
        let body = {
            transId: transId
        };
        return this.http.post(this.getTransCheckoutAPI, JSON.stringify(body), options)
            .timeout(this.const.timeoutSec)
            .map((res: Response) => {
                return res.json();
            })
            .catch((error: Response) => { return Observable.throw(this.handleError(error)); });
    }

    cancelBooking(transId, bookId, bookCode) {
        let headers = new Headers({ 'Content-Type': 'application/json', 'authToken': sessionStorage.getItem("ALLTICKET:authToken"), 'paymentChannel': sessionStorage.getItem("paymentChannel") });
        let options = new RequestOptions({ headers: headers });
        let body = {
            transId: transId + "",
            bookId: bookId + "",
            bookCode: bookCode + ""
        };

        return this.http.post(this.cancelBookingAPI, JSON.stringify(body), options)
            .timeout(this.const.timeoutSec)
            .map((res: Response) => {
                return res.json();
            })
            .catch((error: Response) => { return Observable.throw(this.handleError(error)); });

    }
    booking(passengerBooking: PassengerBookingModel) {
        let headers = new Headers({ 'Content-Type': 'application/json', 'authToken': sessionStorage.getItem("ALLTICKET:authToken"), 'paymentChannel': sessionStorage.getItem("paymentChannel") });
        let options = new RequestOptions({ headers: headers });
        let body = {
            transId: passengerBooking.transId,
            tripCnt: passengerBooking.tripCnt,
            contactName: passengerBooking.contactName,
            telNo: passengerBooking.telNo
        };
        body["seatCnt[0]"] = passengerBooking.seatCnt[0] + "";
        body["pickupPark[0]"] = passengerBooking.pickupPark[0] + "";
        for (let index = 0; index < Number(passengerBooking.seatCnt[0]); index++) {
            body["gender[0][" + index + "]"] = passengerBooking.gender[index] + "";
            body["passengerName[0][" + index + "]"] = passengerBooking.passengerName[index] + "";
            body["passengerTel[0][" + index + "]"] = passengerBooking.passengerTel[index] + "";
            body["reserveId[0][" + index + "]"] = passengerBooking.reserveId[index] + "";
        }
        if (passengerBooking.seatCnt.length > 0) {
            body["seatCnt[1]"] = passengerBooking.seatCnt[1] + "";
            body["pickupPark[1]"] = passengerBooking.pickupPark[1] + "";
            let indexInBody = 0;
            for (let index = Number(passengerBooking.seatCnt[1]); index < passengerBooking.reserveId.length; index++) {
                body["gender[1][" + indexInBody + "]"] = passengerBooking.gender[index] + "";
                body["passengerName[1][" + indexInBody + "]"] = passengerBooking.passengerName[index] + "";
                body["passengerTel[1][" + indexInBody + "]"] = passengerBooking.passengerTel[index] + "";
                body["reserveId[1][" + indexInBody + "]"] = passengerBooking.reserveId[index] + "";
                indexInBody = indexInBody + 1;
            }
        }

        return this.http.post(this.bookingAPI, JSON.stringify(body), options)
            .timeout(this.const.timeoutSec)
            .map((res: Response) => {
                return res.json();
            })
            .catch((error: Response) => {
                return Observable.throw(this.handleBookingError(error, passengerBooking.transId));
            });
    }

    clearTransSeatMark(transId: string) {
        let headers = new Headers({ 'Content-Type': 'application/json', 'authToken': sessionStorage.getItem("ALLTICKET:authToken"), 'paymentChannel': sessionStorage.getItem("paymentChannel") });
        let options = new RequestOptions({ headers: headers });
        let body = {
            transId: transId
        };
        return this.http.post(this.clearTransSeatmarkAPI, JSON.stringify(body), options)
            .timeout(this.const.timeoutSec)
            .map((res: Response) => {
                return res.json();
            })
            .catch((error: Response) => { return Observable.throw(this.handleError(error)); });
    }

    insertBookingInfo(insertBooking: InsertBookingInfoModel) {
        let headers = new Headers({ 'Content-Type': 'application/json', 'authToken': sessionStorage.getItem("ALLTICKET:authToken"), 'paymentChannel': sessionStorage.getItem("paymentChannel") });
        let options = new RequestOptions({ headers: headers });
        let body = insertBooking;
        return this.http.post(this.insertBookingInfoAPI, JSON.stringify(body), options)
            .timeout(this.const.timeoutSec)
            .map((res: Response) => {
                return res.json();
            })
            .catch((error: any) => {
                return Observable.throw(this.handleInsertBookingError(error, insertBooking.bookId, insertBooking.bookCode));
            }
            );
    }

    checkAuthen(currentUrl) {
        let checkAuthAPI = '//' + currentUrl + '/fcheckauthen.html';
        return this.http.get(checkAuthAPI)
            .timeout(this.const.timeoutSec)
            .map((res: Response) => {
                return res.json();
            })
            .catch((error: Response) => { return Observable.throw(this.handleError(error)); });
    }

    openDialog(msg) {
        let type: any = "warning";
        this.alertSettings = { overlay: true, overlayClickToClose: false, showCloseButton: true, duration: 100000 };
        this._alert.create(type, msg, this.alertSettings);
        jQuery('html,body', window.parent.document).animate({
            scrollTop: jQuery("#alert-box .jaspero__dialog").offset().top - 100
        }, 300);
    }

    handleError(error) {
        let err;
        if (error.name == 'TimeoutError') {
            err = { code: 40125 };
            this.openDialog(this.errorMsgService.getErrorMsg(err.code));
            this.buyTicketComponent.checkTime();
            this.router.navigate(['']);
        } else {
            err = { code: 99999 };
        }
        return err;
    }

    handleMarkSeatError(error, transId) {
        let err;
        if (error.name == 'TimeoutError') {
            this.clearTransSeatMark(transId).subscribe((res) => {

            });
            err = { code: 40125 };
            this.openDialog(this.errorMsgService.getErrorMsg(err.code));
            this.buyTicketComponent.checkTime();
            this.router.navigate(['']);
        } else {
            err = { code: 99999 };
        }
        return err;
    }

    handleBookingError(error, transId) {
        let err;
        if (error.name == 'TimeoutError') {
            err = { code: 40125 };
            this.cancelBooking(transId, '', '').subscribe((res) => {

            });
            this.openDialog(this.errorMsgService.getErrorMsg(err.code));
            this.buyTicketComponent.checkTime();
            this.router.navigate(['']);
        } else {
            err = { code: 99999 };
        }
        return err;
    }

    handleInsertBookingError(error, bookId, bookCode) {
        let err;
        if (error.name == 'TimeoutError') {
            err = { code: 40125 };
            let transId;
            this.getTransId('C').subscribe((res) => {
                transId = res.data;
                this.cancelBooking(transId.transId, bookId, bookCode).subscribe((res) => {

                });
            });

            this.openDialog(this.errorMsgService.getErrorMsg(err.code));
            this.buyTicketComponent.checkTime();
            this.router.navigate(['']);
        } else {
            err = { code: 99999 };
        }
        return err;
    }
}