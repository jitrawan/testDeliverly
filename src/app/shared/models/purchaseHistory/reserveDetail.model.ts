import { UserModel } from '../result-reserve/result-reserve-transit/user.model';
import { TransReservToModel } from '../payment/transReservTo.model';
import { EventZoneTOModel } from '../payment/eventZoneTo.model';
export class ReserveDetailModel {
    creditFee: string;
    event:EventZoneTOModel;
    userDetail: UserModel;
    reserveTO: TransReservToModel;
    status: string;
    discount: string;
    discountLabel: string;
    statusDesc: string;
    hasDiscount: string;
    payOutlet: boolean;
    transDetail: string;
    slipDetail: string;
    slipDetailTurn: string;
    foodDetail: string;
    foodDetailTurn: string;
    barcodeCoupon: boolean;
    couponName: string;
    couponDesc: string;
    couponCode: string;
    transitCon: string;
}