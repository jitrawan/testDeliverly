import { DiscountModel } from './discount.model';
import { TripModel } from './trip.model'

export class BookingResultModel {
    bookId: string;
    bookCode: string;
    bookDtm: string;
    bookTimeout: string;
    contactName: string;
    telNo: string;
    discount: DiscountModel;
    dptrTrip: TripModel;
    rtrnTrip: TripModel;

}