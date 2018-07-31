import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ConstMaster } from '../config/ConstMaster';
import { EventBanner } from '../models/eventBanner.model';

@Injectable()
export class HomeService {

  constructor(private http: HttpClient) { }

  private eventBannerUrl = ConstMaster.home.jsonFileEndPoints;

  getEventBanner(): Observable<EventBanner> {
    return this.http.get<EventBanner>(this.eventBannerUrl);
  }

}
