import { ReserveParkModel } from './reservePark.model';
import { RouteModel } from './route.model';
import { BusStdModel } from './busStd.model';
import { StationModel } from './station.model';

export class TripModel {
    id: string;
    dptrPark: ReserveParkModel;
    arrvPark: ReserveParkModel;
    date: string;
    time: string;
    arrvDate: string;
    arrvTime: string;
    route: RouteModel;
    busStd: BusStdModel;
    fare: string;
    fee: string;
    seats: number;
    emptySeats: number;
    coupon: string;
    station: StationModel;
    platform: string;
}