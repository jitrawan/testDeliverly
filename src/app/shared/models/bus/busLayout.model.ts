import { BusObjectModel } from './busObject.model';
import { BusStdModel } from './busStd.model';

export class BusLayoutModel {
    id: string;
    code: string;
    desc: string;
    std: BusStdModel;
    totalFloor: number;
    totalSeat: number;
    platform: string;
    cols: number;
    rows: number;
    objects: BusObjectModel[];

}