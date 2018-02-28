export class InsertBookingInfoModel {
    transId: string;
    bookCode: string;
    bookID: string;
    passengerName: string;
    passengerTel: string;
    noOfSeat: string;
    totalAmt: string;
    dptrTrip?: departTripInsertBooking;
    rtrnTrip?: returnTripInsertBooking;
}

export class departTripInsertBooking {
    dptrProvinceDesc: string;
    dptrParkDesc: string;
    arrvProvinceDesc: string;
    arrvParkDesc: string;
    dptrTripDate: string;
    dptrTripTime: string;
    routeId: string;
    busStdDesc: string;
    stationDesc: string;
    platform: string;
    seatFloor: string;
    seatNo: string;
    contactName: string;
    telNo: string;
    fare: string;
    fee: string;
    disFare: string;
    disFee: string;
    coupon: string;
}

export class returnTripInsertBooking {
    dptrProvinceDesc: string;
    dptrParkDesc: string;
    arrvProvinceDesc: string;
    arrvParkDesc: string;
    dptrTripDate: string;
    dptrTripTime: string;
    routeId: string;
    busStdDesc: string;
    stationDesc: string;
    platform: string;
    seatFloor: string;
    seatNo: string;
    contactName: string;
    telNo: string;
    fare: string;
    fee: string;
    disFare: string;
    disFee: string;
    coupon: string;
}

export class listTripByReserve {

    constructor() {
        this.passengerName = [];
        this.passengerTel = [];
        this.seatFloor = [];
        this.seatNo = [];
        this.fare = [];
        this.fee = [];
        this.disFare = [];
        this.disFee = [];
    }
    
    passengerName: string[];
    passengerTel: string[];
    seatFloor: string[];
    seatNo: string[];
    fare: string[];
    fee: string[];
    disFare: string[];
    disFee: string[];
}