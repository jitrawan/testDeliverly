import { SeatTOModel } from './seatTO.model';

export class DiscountRequestTo {
    discountId: string;
    reserveId: string;
    performId: string;
    roundId: string;
    zoneId: string;
    memberId: string;
    exchangeAmt: number;
    billAmt: number;
    roundNetAmt: number;
    seatType: string;
    seatTO : SeatTOModel[];
    noOfSeat: number;
    lockType: string;
    discountChannel: string;


}