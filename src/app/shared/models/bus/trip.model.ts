import { ParkModel } from './park.model';

export class TripModel {
    id: string;
    dptrPark: ParkModel;
    date: string;
    time: string;
    arrvDate: string;
    arrvTime: string;
    // route
    // busStd: 
    fare: string;
    fee: string;
    seats: number;
    emptySeats: number;
    coupon: string;
    // station: string;
    platform: string;

}