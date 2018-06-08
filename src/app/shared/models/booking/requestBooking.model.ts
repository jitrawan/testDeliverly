import { CustomerModel } from '@atk-shared/models/customer.model';
import { SeatTo } from '@atk-shared/models/booking/seatTo.model';

export interface RequestBooking {
    performId: string,
    roundId: string,
    zoneId: string,
    seatTo: SeatTo,
    custTo: CustomerModel
}