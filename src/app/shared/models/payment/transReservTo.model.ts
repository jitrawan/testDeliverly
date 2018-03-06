import { EventZoneTOModel } from './eventZoneTo.model';
import { RoundTOModel } from './roundTO.model';
import { ZoneTOModel } from './zoneTO.model';
import { SeatTOModel } from './seatTO.model';
import { DiscountRequestTo } from './discountRequestTo.model';
import { CustomerSportTo } from './customerSportTo.model';

export class transReservToModel {
    reserveId: string
    csReserveId: string;
    reservDate: Date;
    expireDate: Date;
    priceAmtTotal: number;
    eventId: string;
    roundNo: string;

    eventZoneTO: EventZoneTOModel;
    roundTO: RoundTOModel;
    zoneTO: ZoneTOModel;
    seatTOs: SeatTOModel[];
    // seatToReserves: SeatToReserves[];

    noOfSeat: string;
    priceAmt: number;

    confirmSuccess: boolean;
    message: string;
    maxreserve: string;
    feeOfseat: string;
    labelSeatReserve: string;
    labelSeatRowNo: string;
    labelSeatId: string;
    totalOfSeat: number;
    pricePerseat: number;
    feePerseat: number;
    disCountValue: number;
    feeTotal: number;
    endPrice: number;
    vat: number;
    transFee: number;
    csFee: number;
    discountId: string;
    promotionCode: string;
    detailConditions: string; //เพิ่มข้อความเงื่อนไขหลังจ่ายด้วยบัตรเครดิต 17/02/2017 Prach
    PREDEFINE_ID //เพิ่มข้อความเงื่อนไขหลังจ่ายด้วยบัตรเครดิต 17/02/2017 Prach

    creditFee: number;

    clientCode: string;
    serviceCode: string;
    transId: string;
    transDetail: string;
    transSlip: string;

    discountRequestTo:DiscountRequestTo;
    customerSportTOs:CustomerSportTo[];
    
    // Map<String, ShirtSizeTO> shirtSizeTO;

    data1: string;
    data2: string;
    data3: string;
    data4: string;
}