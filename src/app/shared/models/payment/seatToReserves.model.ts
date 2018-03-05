export class SeatToReserves {
    seatNo: string;
    rowName: string;
    status: string;
    seatId: string;
    priceAmt: number;
    authenGroup: string;
    rowNo: string;
    colNo: string;
    discountId: string;
    discountCSId: string;
    zoneId: string;
    zoneType: string;

    /** Begin for lock for lock business **/
    oldReserveId: string;
    oldLockType: string;
    newLockType: string;

}