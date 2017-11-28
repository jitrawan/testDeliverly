import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class CommonService {
    
    private dataStream = new BehaviorSubject<any>(null);

    currentData = this.dataStream.asObservable();


    constructor() { }

    setData(data : any) {
        this.dataStream.next(data);
    }
}