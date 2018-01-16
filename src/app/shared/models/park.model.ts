import { Province } from './province.model';
export class ParkModel {
    id: string;
    nameTh: string;
    nameEn: string;
    park: string;
    picking: string;
    updateDtm: Date;
    province: Province;
}