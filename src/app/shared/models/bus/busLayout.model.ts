import { BusObjectModel } from './busObject.model';

export class BusLayoutModel {
    id: number;
    code: string;
    desc: string;
    // std
    totalFloor: number;
    totalSeat: number;
    platform: string;
    cols: number;
    rows: number;
    objects: BusObjectModel;

}