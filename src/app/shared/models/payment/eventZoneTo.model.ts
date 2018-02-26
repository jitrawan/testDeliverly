import { ZoneTOModel } from './zoneTO.model';
export class EventZoneTOModel {
    id: string;
    name: string;
    fullname: string;
    icon: string;
    zones: ZoneTOModel[];

    infoFile: string;
    infoText: string;
    infoLayout: string;
    zoneLayout: string;
    mapLayout: string;
    contactLayout: string;
    cnAvailable: number;

    beginReserv: Date;
    endReserv: Date;

    layoutInternet: string;
    layoutfull: string;

    promoterId: string;
    promoterName: string;

    hallName: string;
    hallAddress: string;

    layoutWebInternet: string;
    pageInfoWebInternet: string;

    isfull: string = "N";

    maxReserve: number;
    maxSelectSeat: number;
    maxSelectSeatPerUser: number;
    expireChannel: number;
    unlimitedExpireChannel: string;

    transFee: number;
    csFee: number;
    issueFee: number;
    creditFee: number;
    sendTicketExpire: Date;
    sendTicketExpireDate: string;
    sendTicketExpireTime: string;
    urlRegister: string;
    urlReceiveTicket: string;
    receiveTicketType: string;
    chkReserveLimitType: string;
    chkPayCreditcard: string;
    compCode: string;
    vipflag: string;
    vipflagWeb: string;
    msgVipCode: string;

    /* 2015-04-28 : add column promo */
    isPromo: string;
    firstRound: Date;
    lastRound: Date;

    performType: string;
    showDescWeb: string;
    saleDesc: string;
    performRef: string;
    performRemark: string;
    performStatus: string;
    performStatusDesc: string;
    promotionCreditCard: string;

    //17052016 : for sport event
    performSubType: string;
    regisExpire: Date;
    canRegisRun: string;
    chkPayOutlet: string;

    flowDisplay: string;
    chkzonefee: string;

    clientCode: string;
    serviceCode: string;
    retryCount: number;

    performSize: string;
    //  isBreak;

    performCardName: string;
    performCardPic: string;
    performCardShow: string;
    masterPerform: string;
    performShow: string;
    performShowTime: string;
    performShowPrice: string;

    hallLatitude: string;
    hallLongitude: string;
    useQueue: string;
    checkNidNo: string;
    examFlag: string;
}