import { Component, OnInit, ViewEncapsulation, ElementRef, Input, ViewChild, Renderer2, AfterContentChecked } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '@atk-service/shared-service.service';
import { AtkService } from '@atk-service/atk.service';
import { Location , DatePipe } from '@angular/common';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ReserveModel } from '@atk-shared/models/reserve.model';
import { RequestBooking } from '@atk-shared/models/booking/RequestBooking.model';
import * as $ from 'jquery';
import { SeatByZoneModel } from '@atk-shared/models/zoneSeat/seatByZone.model';
import { CustomerModel } from '@atk-shared/models/customer.model';

declare function jMap(element): any;

@Component({
    selector: 'app-booking',
    templateUrl: './go-booking.component.html',
    styleUrls: [ './go-booking.component.css',
        '../../../assets/css/standard/layout.css',
        '../../../assets/css/standard/utility.css', ],
    animations: [
        trigger('moveInOut', [
            state('*', style({
                opacity: 1
            })),
            state('void', style({
                opacity: 0
            })),
            transition('* => void', animate('0ms ease-out')),
            transition('void => *', animate('700ms ease-in'))
        ]),
        trigger('slideDown', [
            state('*', style({
                opacity: 1,
                transform: 'translateY(0) scale(1)',
            })),
            state('void', style({
                opacity: 0.5,
                transform: 'translateY(-50%) scale(0.1)'
            })),
            transition('* => void', animate('200ms ease-in-out')),
            transition('void => *', animate('500ms ease-in-out'))
        ])
    ]
})
export class GoBookingComponent implements OnInit {
    
    @Input() data: any;
    private performId: string;
    event: Event = {} as any;
    isLoading: boolean = true;
    isGetSeatLoading: boolean = false;
    loadingZoneAvailable: boolean = false;
    numbersOfCol: Array<any>;
    numbersOfRow: Array<any>;
    rowHeader: Array<any>;
    rentSeat : boolean = false;
    target: String;
    listSeat : any;
    nonSeatAmtSelected: number;
    showExecuteButton: boolean;
    defaulDate: string;
    selectedData: any = {};

    displayDate: string;
    displayType: string;
    showSelectTime: boolean = false;
    rounds: ListRound[] =[];
    reserve: ReserveModel = {} as any;
    showZoneType: string;
    seatList: SeatByZoneModel[];
    maxReserve: number;
    seatAvailable: SeatAvailable[] = [];
    reserveRequest: RequestBooking = {} as any;

    constructor(
        private renderer: Renderer2,
        private router: Router,
        private sharedService: SharedService,
        private atkService: AtkService,
        private location: Location,
        private datePipe: DatePipe
        ){
    }
    @ViewChild('avaDateTime') private avaDateTime: ElementRef;
    @ViewChild('chooseNonSeat') private chooseNonSeat: ElementRef;
    @ViewChild('chooseZone') private chooseZone: ElementRef;
    @ViewChild('chooseSeat') private chooseSeat: ElementRef;
    @ViewChild('nonSeatSelector') private nonSeatSelector: ElementRef;

    ngOnInit() {
        let custTo: CustomerModel = {
            idNo: '1103199293341',
            title: 'นาย',
            name: 'ฮาบอล',
            surName: 'ฮาฮาบอล',
            titleEn: 'Mr',
            nameEn: 'Haball',
            midNameEn: '',
            surNameEn: 'Hahaball',
            birthDay: 757616400000,
            gender: '1',
            cardDistrict: '',
            cardSubDistrict: '',
            cardProvince: '',
            cardEffectDate: 1527755083618,
            cardExpiredDate: 1685521483618,
            telephone: '0851992697',
            cardAddress: '1010/123',
            country: 'TH'
        };
        this.reserveRequest.custTo = custTo;

        this.reserve.performId = '17142';
        this.listSeat = [];
        this.data = [];
        this.sharedService.receiveData.subscribe(data => {
            console.log(data);
            if(data == undefined || Object.keys(data).length == 0) {
                // this.router.navigate(['/']);
            } else {
                this.reserve.performId = data;
            }
        });

        this.atkService.getRoundDetail(this.reserve.performId).subscribe(res =>{
            
            console.log("get round", res);

            if (res['success'] == true && res['code'] == 100 && Object.keys(res['data']).length > 0) {
                let data = res['data']['event_info'];

                this.event.displayType = data['selectRoundType'];
                this.event.listRound = data['list_round'];
                this.rounds = data['list_round'];
                this.event.zoneLayout = data['zoneLayout'];
                this.event.fullName = data['fullname'];
                this.maxReserve = data['maxSelectSeat'];

                if (this.event.displayType != undefined && this.event.displayType != null && this.event.displayType == 'CALENDAR') {
                    this.event.event_calendar = [];
                    data['duration_date'].forEach(element => {
                        let object = {
                            "title": "EVENT",
                            "start": this.datePipe.transform(element, "yyyy-MM-dd"),
                            "dateSelected": element
                        };
                        this.event.event_calendar.push(object);
                    });

                    this.defaulDate = this.event.event_calendar[0]['start'];
                } else {
                    this.showSelectTime = true;
                }
            } else {
                console.log("get round fail")
            }

            this.isLoading = false;
        });

    }
    
    ngAfterViewInit() {
        window.scrollTo(0, 0);    
    }

    scrollTo(target) {
        $('html,body').stop().delay(200).animate({
            scrollTop: $(target).offset().top
        }, 1000);
    }

    onSelectDate(e) {
        this.showSelectTime = true;
        this.rounds = this.event.listRound.filter(function(el){
            return el.roundDate == e.calEvent.dateSelected;
        });
        console.log(this.rounds);
        setTimeout(() => {
            this.scrollTo(this.avaDateTime.nativeElement);
        }, 200);
        
    }

    selectDateTime(round) {
        console.log("Round : ",round);
        this.reserve.roundId = round.roundId;
        this.reserve.roundDate = round.roundDate;

        this.event.listRound.forEach(el => {
            if(round.roundId == el.roundId) {
                var find = 'href="#"';
                var replace = new RegExp(find, 'g');
                if(el.zoneLayoutWeb == null) {
                    this.event.displayZoneLayout = this.event.zoneLayout.replace(replace,' ');
                } else {
                    this.event.displayZoneLayout = el.zoneLayoutWeb.replace(replace,' ');
                }
                this.toggleElement(this.chooseZone,'show',true);
                this.scrollTo('#chooseZone');
                setTimeout(() => {
                    let mapLayout:any = document.querySelector('img[usemap]');
                    mapLayout.style.setProperty('width','auto');
                    mapLayout.style.setProperty('height','auto');
                    jMap('img[usemap]');
                }, 600);
            }
        });
    }

    zoneLayoutClicked(event) {
        if (event.target && event.target.className.indexOf('p_') >= 0) {
            let zoneSelected = event.target.dataset.zone;
            this.reserve.zoneId = zoneSelected;
            this.reserve.totalPrice = 0;
            this.scrollTo('#reserveInfo');  
        } else {
            return false; // zone not found
        }
        console.time('getSeat')
        this.isGetSeatLoading = true;
        this.atkService.getSeat(this.reserve).subscribe(res =>{
            console.timeEnd('getSeat')
            this.isGetSeatLoading = false;
            if (res['success'] == true && res['code'] == 100 && Object.keys(res['data']).length > 0) {
                this.showZoneType = res['data']['zone_type'];
                this.showExecuteButton = true;
                if(this.showZoneType == 'STAND' || this.showZoneType == 'NONSEAT') {
                    this.reserve.priceAmount = res['data']['seats_available'][0]['priceAmt'];
                } else {
                    this.seatList = res['data']['seats_available'];
                    console.log(this.seatList)
                }
            } else {

            }
            console.log("get-seat",res)
        });
    }

    chooseSeatAmt(seatAmount: number) {
        this.nonSeatAmtSelected = seatAmount;
        console.log(this.nonSeatAmtSelected)
    }

    goEventInfo() {
        this.location.back();
    }

    showNonSeat() {
        this.toggleElement(this.nonSeatSelector,'show',true);
        this.scrollTo('.nonSeatSelector');
    }

    toggleElement(_element: ElementRef, _toggleClass: string, isAddClass: boolean) {
        if(isAddClass) {
            this.renderer.addClass(_element.nativeElement, _toggleClass);
        } else {
            this.renderer.removeClass(_element.nativeElement, _toggleClass);
        }
        
    }

    seatSelectedHandler(seats: any) {
        var seatNo = [];
        var seatColNo = [];
        this.reserve.totalPrice = 0;
        console.log(seats);
        
        for(let seat of seats) {
            this.reserve.priceAmount = seat.priceAmt;
            this.reserve.totalPrice += seat.priceAmt;
            this.reserve.seatNo = seat.seatNo+",";
            this.reserve.zoneId = seat.zoneId;
            seatNo.push(seat.rowName+''+seat.seatNo); // Use for show to user
            seatColNo.push(seat.rowName+'_'+seat.colNo); // Use for booking request
        }
        this.reserve.seatAmount = seats.length;
        this.reserve.seatNo = seatNo.toString();
        this.reserve.seatColNo = seatColNo;
        
        if(seats.length == 0) {
            this.reserve.zoneId = '';
        }

        console.log(this.reserve)
    }

    qtyBtnHandler(searchKey: string,triggerType: string) {
        
        let _el = document.querySelectorAll('[data-input-seq="'+searchKey+'"]') as any;
        // let otherFields = document.querySelectorAll('[data-input-seq]');
        let value = parseFloat(_el[0].value);
        if(isNaN(value) || value == undefined) {
            value = 0;
        }
        if(triggerType == 'plus') {
            
            if(value < this.maxReserve) {
                value += 1;
            }
            
        } else {
            if(value > 0) {
                value -= 1;
            }
        }

        this.showExecuteButton = true;
        this.reserve.seatAmount = value;
        this.reserve.totalPrice = this.reserve.seatAmount * this.reserve.priceAmount;
        _el[0].value = value;
    }

    getZoneAvailable() {

        if(!$('#seatAva').hasClass('order-last')) {
            $('#seatAva').addClass('d-none');
            $('#zone').addClass('col-lg-8')
            setTimeout(() => {
                $('#seatAva').removeClass('d-none').addClass('col-lg-4 order-last');
            }, 600);
        }

        console.time("getZoneAvailable");
        this.loadingZoneAvailable = true;

        this.atkService.getZoneAvailable(this.reserve).subscribe(res =>{
            
            this.seatAvailable = [];
            this.loadingZoneAvailable = false;
            if (res['success'] == true && res['code'] == 100 && Object.keys(res['data']).length > 0) {
                let data = res['data']['seat_available'];

                for(let zone of data) {
                    let seatLeft = '';

                    if(zone.type == 'STAND') {
                        seatLeft = '<span style="color:#1323f9">AVAILABLE</span>';
                    } else {
                        seatLeft = zone.amount;
                    }
                    this.seatAvailable.push( { zoneName: zone.id , seatLeft: seatLeft } );
                }

            } else {
                console.log("getZoneAvailable fail")
            }
            
            console.log(this.seatAvailable);
            console.log(this.loadingZoneAvailable)
        });
        
        console.timeEnd("getZoneAvailable");


    }

    getReserve() {
        this.reserveRequest.performId = this.reserve.performId;
        this.reserveRequest.roundId = this.reserve.roundId;
        this.reserveRequest.zoneId = this.reserve.zoneId;
        this.reserveRequest.seatTo = {} as any;
        this.reserveRequest.seatTo.seatType = this.showZoneType;
        if(this.showZoneType == 'SEAT') {
            this.reserveRequest.seatTo.seats = this.reserve.seatColNo;
        } else {
            this.reserveRequest.seatTo.seatAmount = this.reserve.seatAmount;
        }
        console.log(this.reserveRequest)

        this.atkService.getReserve(this.reserveRequest).subscribe(res =>{
            
            console.log("getReserve", res);

            if (res['success'] == true && res['code'] == 100 && Object.keys(res['data']).length > 0) {

            } else {
                console.log("get getReserve fail")
            }

            this.router.navigate(['/booking/check-booking']);

        });

        // this.router.navigate(['/discount']);
        // this.router.navigate(['/resultReserve']);
    }

}

interface Event {
    fullName: string,
    displayType: string,
    displayZoneLayout: string,
    zoneLayout: string,
    hallName: string,
    event_calendar: object[];
    listRound: ListRound[]
}

interface ListRound {
    beginDate: Date,
    endDate: Date,
    roundDate: Date,
    startTime: string,
    endTime: string,
    roundId: string,
    roundName: string,
    showdateCardLabel: string,
    showdateRoundLabel: string,
    zoneLayoutWeb: string
}

interface SeatAvailable {
    zoneName: string,
    seatLeft: string,
}