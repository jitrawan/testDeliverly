import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ConstMaster } from '../config/ConstMaster';
import { EventBanner } from '../models/eventBanner.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class HomeService {
  
  constructor(private http: HttpClient) { }

  private eventBannerUrl = ConstMaster.home.jsonFileEndPoints;

  getEventBanner(): Observable<EventBanner> {
    return this.http.get<EventBanner>(this.eventBannerUrl);
  }

  getEventInfo(performId: string) {
    return this.http.get('https://s3-ap-southeast-1.amazonaws.com/static-file-demo/json/event_info/'+performId+'.json')
    .catch((error: any) => {
      console.log(error);
      return error;
    });
  }
}
