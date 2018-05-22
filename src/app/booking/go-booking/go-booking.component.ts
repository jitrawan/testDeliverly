import { Component, OnInit, ViewEncapsulation, ElementRef, Input, ViewChild, Renderer2, AfterContentChecked } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../shared/services/shared-service.service';
import { AtkService } from '../../shared/services/atk.service';
import { Location , DatePipe } from '@angular/common';
import { trigger, state, style, animate, transition } from '@angular/animations';
import * as $ from 'jquery';
import * as underscore from 'underscore';

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
            transition('* => void', animate('400ms ease-out')),
            transition('void => *', animate('600ms ease-in'))
        ])
    ]
})
export class GoBookingComponent implements OnInit {
    @Input() data: any;
    @Input() test: any;

    event: Event = {} as any;
    isLoading: boolean = true;
    numbersOfCol: Array<any>;
    numbersOfRow: Array<any>;
    rowHeader: Array<any>;
    rentSeat : boolean = false;
    target: String;
    listSeat : any;
    nonSeatAmtSelected: number;
    showExecuteButton: boolean;
    defaulDate: string;
    private performId: string;
    selectedData: any = {};

    displayDate: string;
    displayType: string;
    showSelectTime: boolean = false;

    rounds: ListRound[] =[];

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
        this.listSeat = [];
        this.data = [];
        this.sharedService.receiveData.subscribe(data => {
            console.log(data);
            if(data == undefined || Object.keys(data).length == 0) {
                this.router.navigate(['/']);
            } else {
                this.performId = data;
            }
        });


        this.atkService.getRoundDetail(this.performId).subscribe(res =>{
            
            console.log(res);
            
            let data = res['data']['event_info'];

            this.event.displayType = data['selectRoundType'];
            this.event.listRound = data['list_round'];
            this.rounds = data['list_round'];
            this.event.zoneLayout = data['zoneLayout'];
            this.event.fullName = data['fullname'];

            if(this.event.displayType != undefined && this.event.displayType != null && this.event.displayType == 'CALENDAR') {
                this.event.event_calendar = [];
                data['duration_date'].forEach(element => {
                    let object = {
                        "title" : "EVENT",
                        "start" : this.datePipe.transform(element,"yyyy-MM-dd"),
                        "dateSelected" : element
                    };
                    this.event.event_calendar.push(object);
                });

                this.defaulDate = this.event.event_calendar[0]['start'];
            } else {
                this.showSelectTime = true;
            }

            this.isLoading = false;
        });

        
        // this.prepareFetch();
        // this.loopSeatNo();

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

        setTimeout(() => {
            this.scrollTo(this.avaDateTime.nativeElement);
        }, 200);
        
    }

    selectDateTime(roundId) {
        this.event.listRound.forEach(el => {
            if(roundId == el.roundId) {
                if(el.zoneLayoutWeb == null) {
                    this.event.displayZoneLayout = this.event.zoneLayout.replace('href="#',' ');
                } else {
                    this.event.displayZoneLayout = el.zoneLayoutWeb.replace('href="#',' ');
                }
                this.toggleElement(this.chooseZone,'show',true);
                this.scrollTo('#chooseZone');
                setTimeout(() => {
                    jMap('img[usemap]');
                    console.log("TRIGGER !")
                }, 600);
            }
        });
    }

    selectZone(zoneType?: string) {
        if(zoneType == "nonseat") {
            this.toggleElement(this.chooseNonSeat,'show',true);
            this.toggleElement(this.chooseSeat,'show',false);
            this.scrollTo('#chooseNonSeat');
        } else {
            this.toggleElement(this.chooseSeat,'show',true);
            this.toggleElement(this.chooseNonSeat,'show',false);
            this.scrollTo('#chooseSeat');
        }
        this.showExecuteButton = true;
    }

    chooseSeatAmt(seatAmount: number) {
        this.nonSeatAmtSelected = seatAmount;
        console.log(this.nonSeatAmtSelected)
    }

    loopSeatNo() {
        var i: number;
        var u: number;

        for (i = 1; i <= 3; i++) {
            for (u = 1; u <= 20; u++) {
                this.data.push({ x: u, y: i, z: '' + i + u, labelRow: String.fromCharCode(i + 64) })
            }
        }
    }

    groupObjByRow(row) {
        return this.data.filter(item => item.y === row);
    }

    prepareFetch() {
        if (this.data != null) {
            this.numbersOfRow = Array(5).fill('');
            this.numbersOfCol = Array(20).fill('');
            this.rowHeader = this.numbersOfRow;
        }
    }
    fatchRowData(row, pos) {
        var resultObject = this.data.filter(item => item.y === row);
        return resultObject.filter(item => item.x === pos);
    }

    goDiscountList() {
        console.log("Choose Seat : " + JSON.stringify(this.listSeat));
        // this.router.navigate(['/discount']);
        this.router.navigate(['/resultReserve']);
    }

    goEventInfo() {
        this.location.back();
    }

    onChangeSeat(seat: string, isChecked: boolean) {
        if (isChecked) {
            this.listSeat.push({ "seat": seat })
            console.log("Seat : " + JSON.stringify(this.listSeat));
        } else {
            this.listSeat.splice(seat, 1);
            console.log("Delete Seat : " + JSON.stringify(this.listSeat));
        }

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

    qtyBtnHandler(searchKey: string,triggerType: string){
        
        let _el = document.querySelectorAll('[data-input-seq="'+searchKey+'"]') as any;
        let otherFields = document.querySelectorAll('[data-input-seq]');
        let value = parseFloat(_el[0].value);
        if(isNaN(value) || value == undefined) {
            value = 0;
        }
        if(triggerType == 'plus') {
            value += 1;
        } else {
            if(value > 0) {
                value -= 1;
            }
        }

        this.showExecuteButton = value > 0 ? true: false;

        _el[0].value = value;
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