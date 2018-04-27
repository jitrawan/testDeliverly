import { ForgetPasswordModel } from './../models/forgetPassword.model';
import { UserProfile } from './../models/userProfile.model';
import { ChangePasswordModel } from './../models/changePassword.model';
import { checkLoginModel } from './../models/checkLogin.model';
import { checkEmailSocial } from './../models/checkEmail.model';
import { User } from './../models/user.model';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Headers, Http, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import * as Xml2js from 'xml2js';

var jsonResponse : any;

@Injectable()
export class ApiService {
  constructor(
    private http: Http
  ) {}

  private setHeaders(): Headers {
    const headersConfig = {
      'Content-Type': 'application/json'
    };

    return new Headers(headersConfig);
  }

  private formatErrors(error: any) {
     return Observable.throw(error.json());
  }

  get(path: string, params: URLSearchParams = new URLSearchParams()): Observable<any> {
    return this.http.get(`${environment.apiGateway}${path}`, { headers: this.setHeaders(), search: params })
    .catch(this.formatErrors)
    .map((res: Response) => res.json());
  }

  put(path: string, body: Object = {}): Observable<any> {
    return this.http.put(
      `${environment.apiGateway}${path}`,
      JSON.stringify(body),
      { headers: this.setHeaders() }
    )
    .catch(this.formatErrors)
    .map((res: Response) => res.json());
  }
//current use all post method json
post(path: string, body: Object = {}): Observable<any> {
    return this.http.post(
      `${environment.apiGateway}${path}`,JSON.stringify(body),
      { headers: this.setHeaders() }
    )
    .catch(
      this.formatErrors
    )
    .map((res: Response) => res.json);
  }

  postencode(path: string, body: string): Observable<any> {

    return this.http.post(`${environment.apiGateway}`,encodeURIComponent(JSON.stringify(body)),
    { headers: this.setHeaders() }
  ) .catch(
    this.formatErrors
  ).map((res: Response) => decodeURIComponent(res["_body"]));
  }


  delete(path): Observable<any> {
    return this.http.delete(
      `${environment.apiGateway}${path}`,
      { headers: this.setHeaders() }
    )
    .catch(this.formatErrors)
    .map((res: Response) => res.toString());
  }

  createUser(body : User): Observable<Response> {
    return this.http.post(`${environment.apiGatewayRegister}`, JSON.stringify(body)).map((res: Response) => (JSON.parse(res["_body"])));
  }
  checkAccessToken(accessToken : string){
    return this.http.post(`https://graph.facebook.com/me?access_token=${accessToken}`,{ headers: this.getHeaders() }).map((res: Response) => (res["_body"]));
  }

  checkEmail(body : checkEmailSocial): Observable<Response> {
    return this.http.post(`https://26ieslrird.execute-api.ap-southeast-1.amazonaws.com/latest/checkemail`, JSON.stringify(body)).map((res: Response) => (JSON.parse(res["_body"])));
  }

  checkLogin(body : checkLoginModel): Observable<Response> {
    return this.http.post(`https://26ieslrird.execute-api.ap-southeast-1.amazonaws.com/latest/login`, JSON.stringify(body)).map((res: Response) => (JSON.parse(res["_body"])));
  }

  checkUserHistory(email : string): Observable<Response> {
    return this.http.post(`https://26ieslrird.execute-api.ap-southeast-1.amazonaws.com/latest/login`, JSON.stringify(email)).map((res: Response) => (JSON.parse(res["_body"])));
  }

  checkSessionUserLogin(email : string): Observable<Response> {
    return this.http.post(`https://26ieslrird.execute-api.ap-southeast-1.amazonaws.com/latest/login`, JSON.stringify(email)).map((res: Response) => (JSON.parse(res["_body"])));
  }

  changePassword(body : ChangePasswordModel): Observable<Response> {
    return this.http.post(`https://26ieslrird.execute-api.ap-southeast-1.amazonaws.com/latest/changepassword`, JSON.stringify(body)).map((res: Response) => (JSON.parse(res["_body"])));
  }
  updateProfile(body : UserProfile): Observable<Response> {
    return this.http.post(`https://26ieslrird.execute-api.ap-southeast-1.amazonaws.com/latest/edit-profile`, JSON.stringify(body)).map((res: Response) => (JSON.parse(res["_body"])));
  }
  forgetPassword(body : ForgetPasswordModel): Observable<Response> {
    return this.http.post(`https://26ieslrird.execute-api.ap-southeast-1.amazonaws.com/latest/edit-profile`, JSON.stringify(body)).map((res: Response) => (JSON.parse(res["_body"])));
  }

  private getHeaders() {
    let headers = new Headers();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    return headers;
  }
}