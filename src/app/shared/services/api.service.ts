import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Headers, Http, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
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

  createUser(user) {
    return this.http.post(`${environment.apiGateway}`, user);
  }
}
