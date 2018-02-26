import { DiscountToModel } from './discountTo.model';
import { SeatTOModel } from './seatTO.model';

export class DiscountConfirmRequestToModel {
    discountId: string;
    performId: string;
    roundId: string;
    reserveId: string;
    memberId: string;
    exchangeAmt: number;
    seatType: string;
    zoneId: string;
    seatTO: SeatTOModel[];
    billAmt: number;
    roundNetAmt: number;
    noOfSeat: number;
    discountList: DiscountToModel[];
    data4: string;
    discountChannel: string;
}