export class Constant{
    /* ---------------------- code ---------------------*/
    public successCode: number = 0;
    public markSeatDuplicateCode: number = 1004;

    /* ---------------------- timeout ------------------- */
    public timeoutSec: number = 10000;

    /* ----------------------- URL --------------------------*/
    public baseUrl: string = document.location.origin; 
    // public baseUrl: string = '//d11aliyfxni7iy.cloudfront.net';
    public apiTrsUrl: string = '/api/trs/';
    public apiBusUrl: string = '/api/bus/';
    public staticFileBusUrl: string = '/trs/master/';
    public apiCheckAllowUrl: string = 'https://ad5xsmjzzj.execute-api.ap-southeast-1.amazonaws.com/v1/checkallowreserve';
}