import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ConstMaster } from '@atk-shared/config/ConstMaster';
import { HeaderModel } from '@atk-shared/models/header.model';

@Injectable()
export class HeaderService {

  constructor(private http: HttpClient) { }

  private headerUrl = ConstMaster.HEADER_API.endpoint;

  getHeaderMenu(): Observable<HeaderModel> {
    return this.http.get<HeaderModel>(this.headerUrl);
  }



}
