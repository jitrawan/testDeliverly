import { MenuTOModel } from './menuTO.model';
import { AddressTOModel } from './addressTO.model';

export class UserTOModel {
    id: string;
    username: string;
    password: string;
    confirmpassword: string;
    role: string;
    email: string;
    prefix: string;
    firstname: string;
    lastname: string;
    prefixEn: string;
    firstnameEn: string;
    midnameEn: string;
    lastnameEn: string;
    menus: MenuTOModel[];

    regisTime: string;
    authenTime: string;

    cardType: string;
    cardNumber: string;
    birthDay: Date;
    birthDaytxt: string;
    gender: string;
    address: string;
    country: string;
    province: string;
    provincetxt: string;
    amphur: string;
    amphurtxt: string;
    tambol: string;
    tamboltxt: string;
    postCode: string;
    telephone: string;
    infoFlag: string;
    status: string;
    bookArea: string = "3";
    groupId: string;
    groupName: string;
    maxreserv: number;
    level: string = "INTERNET";
    contextPath: string;

    cardEffectDate: Date;
    cardExpireDate: Date;
    activateKey: string;

    activeflag: string;

    updateBy: string;
    createBy: string;

    urlHostUrl: string;
    urlWsConfirm: string;
    urlWsPaid: string;
    urlWsCancel: string;
    urlPayataallConfirm: string;
    urlPaid: string;
    urlChangeAddress: string;
    urlCheckStatusTransfer: string;
    payAtAllMid: string;
    payAtAllServiceid: string;
    payAtAllCurrtype: string;
    payAtAllLanguage: string;
    pdfFontPath: string;
    smtpHost: string;
    smtpUser: string;
    smtpPass: string;
    smtpPort: string;
    smtpFrom: string;
    smtpStarttls: string;
    smtpAuthen: string;
    loginCount: number;

    countryCodeTel: string;
    timeout: number;
    addressTORegis: AddressTOModel;
    addressTOChange: AddressTOModel;

    sportFlag: string;
    emerContName: string;
    emerCountryCode: string;
    emerContTel: string;
    nationality: string;

    authToken: string;
}