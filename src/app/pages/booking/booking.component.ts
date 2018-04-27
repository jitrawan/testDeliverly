import { Component, OnInit, ViewEncapsulation, ElementRef, Input, ViewChild, Renderer2, AfterContentChecked } from '@angular/core';
import { Router } from '@angular/router';

import * as $ from 'jquery';

declare function jMap(t): any;

@Component({
    selector: 'app-booking',
    templateUrl: './booking.component.html',
    styleUrls: ['./booking.component.css',
        '../../../assets/css/standard/layout.css',
        '../../../assets/css/standard/utility.css',]
})
export class BookingComponent implements OnInit {
    events: any[];
    @Input() data: any;
    @Input() test: any;
    numbersOfCol: Array<any>;
    numbersOfRow: Array<any>;
    rowHeader: Array<any>;
    rentSeat : boolean = false;
    target: String;
    listSeat : any;
    
    displayDate: string;

    constructor(
        private renderer: Renderer2,
        private router: Router) {
    }
    @ViewChild('avaDateTime') private avaDateTime: ElementRef;
    @ViewChild('chooseFestSeat') private chooseFestSeat: ElementRef;
    @ViewChild('chooseZone') private chooseZone: ElementRef;
    @ViewChild('chooseSeat') private chooseSeat: ElementRef;
    @ViewChild('nonSeatSelector') private nonSeatSelector: ElementRef;


    ngOnInit() {
        this.listSeat = [];
        this.data = [];
        this.prepareFetch();
        this.loopSeatNo();
        this.events = [
            {
                "title": "Event",
                "start": "2018-04-06",
                "round": "R1"
            },
            {
                "title": "Event",
                "start": "2018-04-07",
                "round": "R2"
            },
            {
                "title": "Event",
                "start": "2018-04-08",
                "round": "R3",
                "showSeat": "N"
            },
        ];
    }

    scrollTo(target) {
        $('html,body').stop().delay(200).animate({
            scrollTop: $(target).offset().top
        }, 700);
    }

    onSelectDate(e) {
        console.log(e);
        let showSeat = e.calEvent.showSeat;

        if(showSeat == "N") {
            this.displayDate = e.calEvent.start._i;
            this.showNonSeat();
        }
    }

    selectDateTime() {
        this.renderer.addClass(this.chooseZone.nativeElement, 'show');
        jMap('img[usemap]');
        this.scrollTo('#chooseZone');
    }

    selectZone() {
        this.renderer.addClass(this.chooseSeat.nativeElement, 'show');
        this.scrollTo('#chooseSeat');
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
    }

    goEventInfo() {
        this.router.navigate(['/eventInfo']);
    }
    onChangeSeat(seat:string, isChecked: boolean) {
        if(isChecked){
        this.listSeat.push({"seat" : seat})
            console.log("Seat : " + JSON.stringify(this.listSeat));
        }else{
            this.listSeat.splice(seat, 1);
            console.log("Delete Seat : " + JSON.stringify(this.listSeat));
        }
        
    }

    showNonSeat() {
        this.renderer.addClass(this.nonSeatSelector.nativeElement, 'show');
        this.scrollTo('.nonSeatSelector');
    }

}
