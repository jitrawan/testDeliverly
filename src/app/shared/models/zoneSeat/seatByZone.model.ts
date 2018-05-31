import { SeatModel } from './seat.model';

export class SeatByZoneModel {
    zoneId: string;
    labelOfRow: string[];
    labelOfCol: string[];
    seat? : SeatModel[];
    color? : string;
    fontColor? : string;
    specialGenSeat? : string;
}