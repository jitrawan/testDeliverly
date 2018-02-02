import { ReserveRouteModel } from './reserveRoute.model';
import { ParkModel } from './park.model';
import { ProvinceModel } from './province.model';

export class RoutePrvParkMapModel {
    route: ReserveRouteModel;
    trip: string;
    dptrPark: ParkModel;
    arrvPark: ParkModel;
    dptrProvince: ProvinceModel;
    arrvProvince: ProvinceModel;
    fee: string;
    fare: string;
}