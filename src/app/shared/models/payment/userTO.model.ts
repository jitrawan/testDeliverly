import { MenuTOModel } from './menuTO.model';
import { AddressTOModel } from './addressTO.model';

export class UserTOModel {
    public id: string;
    public username: string;
    public password: string;
    public confirmpassword: string;
    public role: string;
    public email: string;
    public prefix: string;
    public firstname: string;
    public lastname: string;
    public prefixEn: string;
    public firstnameEn: string;
    public midnameEn: string;
    public lastnameEn: string;
    public menus: MenuTOModel[];

    public regisTime: string;
    public authenTime: string;

    public cardType: string;
    public cardNumber: string;
    public birthDay: Date;
    public birthDaytxt: string;
    public gender: string;
    public address: string;
    public country: string;
    public province: string;
    public provincetxt: string;
    public amphur: string;
    public amphurtxt: string;
    public tambol: string;
    public tamboltxt: string;
    public postCode: string;
    public telephone: string;
    public infoFlag: string;
    public status: string;
    public bookArea: string = "3";
    public groupId: string;
    public groupName: string;
    public maxreserv: number;
    public level: string = "INTERNET";
    public contextPath: string;

    public cardEffectDate: Date;
    public cardExpireDate: Date;
    public activateKey: string;

    public activeflag: string;

    public updateBy: string;
    public createBy: string;

    public urlHostUrl: string;
    public urlWsConfirm: string;
    public urlWsPaid: string;
    public urlWsCancel: string;
    public urlPayataallConfirm: string;
    public urlPaid: string;
    public urlChangeAddress: string;
    public urlCheckStatusTransfer: string;
    public payAtAllMid: string;
    public payAtAllServiceid: string;
    public payAtAllCurrtype: string;
    public payAtAllLanguage: string;
    public pdfFontPath: string;
    public smtpHost: string;
    public smtpUser: string;
    public smtpPass: string;
    public smtpPort: string;
    public smtpFrom: string;
    public smtpStarttls: string;
    public smtpAuthen: string;
    public loginCount: number;

    public countryCodeTel: string;
    public timeout: number;
    public addressTORegis: AddressTOModel;
    public addressTOChange: AddressTOModel;

    public sportFlag: string;
    public emerContName: string;
    public emerCountryCode: string;
    public emerContTel: string;
    public nationality: string;

    public authToken: string;

    public getFullnameTxt() {
        return this.firstname + " " + this.lastname;
    }
}