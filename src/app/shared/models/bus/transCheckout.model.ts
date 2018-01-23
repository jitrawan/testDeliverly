import { ReserveTripModel } from './reserveTrip.model';
import { DiscountModel } from './discount.model';

export class TransCheckoutModel {
    dptrTrip: ReserveTripModel;
    rtrnTrip: ReserveTripModel;
    discount: DiscountModel;
}