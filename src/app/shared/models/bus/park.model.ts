import { ProvinceModel } from './province.model';

export class ParkModel {
    id: string;
    nameTh: string;
    nameEn: string;
    park: string;
    picking: string;
    updateDtm: Date;
    province: ProvinceModel;
}