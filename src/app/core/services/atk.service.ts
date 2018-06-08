import { Injectable , isDevMode } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ConstMaster } from '@atk-shared/config/ConstMaster';
import { EventBanner } from '@atk-shared/models/eventBanner.model';
import { EventInfo } from '@atk-shared/models/EventInfo.model';
import { ReserveModel } from '@atk-shared/models/reserve.model';
import { RequestBooking } from '@atk-shared/models/booking/RequestBooking.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class AtkService {
  
  constructor(private http: HttpClient) { }

  private homeDataUrl = ConstMaster.HOME_API.endpoint;
  private eventCardUrl = ConstMaster.EVENT_CARD_API.endpoint;
  
  
  fetchHomeData(): Observable<any> {
    let useCache = true;
    if(isDevMode()) {
      useCache = false;
    }

    return this.http.post<any>(this.homeDataUrl,{ cached : useCache },httpOptions);
    
  }

  getEventCardByType(type: string): Observable<any> {
    if(type == null || type == undefined) {
      type = '';
    }
    return this.http.post<any>(this.eventCardUrl,{ groupKey : type },httpOptions);
    
  }
  getEventInfo(performId: string) {
    return this.http.get<EventInfo>('https://s3-ap-southeast-1.amazonaws.com/static-file-demo/json/event_info/'+performId+'.json');
  }

  getEventStatus(performId: string) {
    let params = {
      performId: performId,
      cached: true
    };

    return this.http.post<any>(ConstMaster.EVENT_INFO_API.getEventStatus,params,httpOptions);
  }

  getRoundDetail(performId: string) {
    let params = {
      performId: performId
    };

    return this.http.post<any>(ConstMaster.BOOKING_API.getRound,params,httpOptions);
  }

  getZoneAvailable(reserveModel: ReserveModel) {
    let params = {
      performId: reserveModel.performId,
      roundId: reserveModel.roundId
    };

    return this.http.post<any>(ConstMaster.BOOKING_API.getZoneAvailable,params,httpOptions);
  }

  getSeat(reserveModel: ReserveModel) {
    let params = {
      performId: reserveModel.performId,
      roundId: reserveModel.roundId,
      zoneId: reserveModel.zoneId
    };

    return this.http.post<any>(ConstMaster.BOOKING_API.getSeat,params,httpOptions);
  }

  getReserve(reserveRequest: RequestBooking) {
    
    let params = {
      performId: reserveRequest.performId,
      roundId: reserveRequest.roundId,
      zoneId: reserveRequest.zoneId,
      seatTo: reserveRequest.seatTo,
      custTo: reserveRequest.custTo,
    };

    return this.http.post<any>(ConstMaster.BOOKING_API.getReserve,params,httpOptions);
  }
}
