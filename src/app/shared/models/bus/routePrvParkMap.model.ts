import { ReserveRouteModel } from './reserveRoute.model';
import { ReserveParkModel } from './reservePark.model';
// import { ProvincModel } from './r';

export class RoutePrvParkMapModel {
    route: ReserveRouteModel;
    trip: string;
    dptrPark: ReserveParkModel;
    arrvPark: ReserveParkModel;
    dptrProvince: {
        id: string,
        desc: string
    };
    arrvProvince: {
        id: string,
        desc: string
    };
    fee: string;
    fare: string;
}