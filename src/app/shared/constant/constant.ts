import { environment } from '../../../environments/environment';
export class Constant{
    /* ---------------------- code ---------------------*/
    public successCode: number = 0;
    public markSeatDuplicateCode: number = 1004;

    /* ---------------------- timeout ------------------- */
    public timeoutSec: number = 10000;
    public timeoutSecBooking: number = 15000;

    /* ----------------------- URL --------------------------*/
    public baseUrl: string = environment.baseUrl;
    public apiTrsUrl: string = '/api/trs/';
    public apiBusUrl: string = '/api/bus/';
    public apiCSPayUrl: string = '/api/cspay/';
    public staticFileBusUrl: string = '/trs/master/';
    public apiCheckAllowUrl: string = environment.apiGateway + 'checkallowreserve';

    /* ----------------------- WORD --------------------------*/
    public foodDetail: string = 'มีบัตรอาหาร';

    /* ----------------------- Payment Channel --------------------------*/
    public WEB_PAYMENT_CHANNEL: string = 'C07';
    public MOBILE_PAYMENT_CHANNEL: string = 'C08';
    
}