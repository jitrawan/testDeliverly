import { EventZoneTOModel } from './eventZoneTo.model';
import { RoundTOModel } from './roundTO.model';
import { ZoneTOModel } from './zoneTO.model';
import { SeatTOModel } from './seatTO.model';
import { DiscountRequestTo } from './discountRequestTo.model';
import { CustomerSportTo } from './customerSportTo.model';

export class TransReservToModel {
    public reserveId: string
    public csReserveId: string;
    public reservDate: Date;
    public expireDate: Date;
    public priceAmtTotal: number;
    public eventId: string;
    public roundNo: string;

    public eventZoneTO: EventZoneTOModel;
    public roundTO: RoundTOModel;
    public zoneTO: ZoneTOModel;
    public vseatTOs: SeatTOModel[];
    // seatToReserves: SeatToReserves[];
    public noOfSeat: string;
    public priceAmt: number;

    public confirmSuccess: boolean;
    public message: string;
    public maxreserve: string;
    public feeOfseat: string;
    public labelSeatReserve: string;
    public labelSeatRowNo: string;
    public labelSeatId: string;
    public totalOfSeat: number;
    public pricePerseat: number;
    public feePerseat: number;
    public disCountValue: number;
    public feeTotal: number;
    public endPrice: number;
    public vat: number;
    public transFee: number;
    public csFee: number;
    public discountId: string;
    public promotionCode: string;
    public detailConditions: string; //เพิ่มข้อความเงื่อนไขหลังจ่ายด้วยบัตรเครดิต 17/02/2017 Prach
    public PREDEFINE_ID //เพิ่มข้อความเงื่อนไขหลังจ่ายด้วยบัตรเครดิต 17/02/2017 Prach
    public creditFee: number;

    public clientCode: string;
    public serviceCode: string;
    public transId: string;
    public transDetail: string;
    public transSlip: string;

    public discountRequestTo:DiscountRequestTo;
    public customerSportTOs:CustomerSportTo[];
    
    // Map<String, ShirtSizeTO> shirtSizeTO;
    public data1: string;
    public data2: string;
    public data3: string;
    public data4: string;
    public busPayCode: string;
}