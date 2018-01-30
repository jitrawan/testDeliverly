import { ReserveParkModel } from './reservePark.model';
import { ReserveRouteModel } from './reserveRoute.model';
import { BusStdModel } from './busStd.model';
import { ReserveModel } from './reserve.model';
export class ReserveTripModel {
    id: string;
    code: string;
    date: string;
    time: string;
    route: ReserveRouteModel;
    busStd: BusStdModel;
    dptrPark: ReserveParkModel;
    arrvPark: ReserveParkModel;
    reserves: ReserveModel[];
}