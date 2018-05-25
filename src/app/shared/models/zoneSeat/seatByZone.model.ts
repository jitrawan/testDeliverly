import { SeatModel } from './seat.model';

export class SeatByZoneModel {
    public zoneId: string;
    public labelOfRow: string[];
    public labelOfCol: string[];
    public seat? : SeatModel[];
    public color? : string;
    public fontColor? : string;
}