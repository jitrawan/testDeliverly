import { ParkModel } from './park.model';
import { RouteModel } from './route.model';
import { BusStdModel } from './busStd.model';
import { StationModel } from './station.model';

export class TripModel {
    id: string;
    dptrPark: ParkModel;
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