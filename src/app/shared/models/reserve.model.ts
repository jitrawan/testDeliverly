import { CustomerModel } from '@atk-shared/models/customer.model';

export interface ReserveModel {
    performId: string,
    roundId: string,
    zoneId: string,
    seatNo: string,
    seatColNo?: string[],
    seatAmount: number,
    roundDate: string,
    priceAmount: number,
    totalPrice: number,
}