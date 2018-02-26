import { EventZoneTOModel } from './eventZoneTo.model';

export class ZoneTOModel {
    id: string;
    name: string;
    desc: string;
    amount: number;
    type: string;
    layout: string;
    hasSub: boolean;
    maxseat: number;
    countCol: number;
    countRow: number;
    status: string;
    authenGroup: string;
    // List<SeatTO> seats;
    color: string;
    labelRow: string;
    labelColumn: string;
    smallrowdimension: number;
    smallcolumndimension: number;
    floor: string;

    eventTo: EventZoneTOModel;
    // RoundTO roundTO;

    cnSeat: number;
    seatBalance: number;

    screenLabel: string;

    gateLabel: string;
    zoneRemark: string;

    roundId: string;

    relayRace: string;
    runnerAll: number;
    runnerM: number;
    runnerF: number;
    fontColor: string;

    csFee: number;
    issueFee: number;
    transFee: number;
    packageInfo: string;
    packageDesc: string;

    packExpireDay: string;
    packExpireDate: Date;

    specialGenSeat: string;
}