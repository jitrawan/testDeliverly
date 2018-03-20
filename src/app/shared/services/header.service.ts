import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ConstMaster } from '../config/ConstMaster';
import { HeaderModel } from '../models/header.model';

@Injectable()
export class HeaderService {

  constructor(private http: HttpClient) { }

  private headerUrl = ConstMaster.header.jsonFileEndPoints;

  getHeaderMenu(): Observable<HeaderModel> {
    return this.http.get<HeaderModel>('../../assets/json/atknav.json');
    // return this.http.get<HeaderModel>(this.headerUrl);
  }



}
