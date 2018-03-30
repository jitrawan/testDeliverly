import { Component, OnInit, ViewEncapsulation, ElementRef, Input, ViewChild, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { imageMaps } from './imagesMapsResize.js';
import * as $ from 'jquery';

// import jMap from '../../../assets/js/jquery.jmap.min.js';

@Component({
    selector: 'app-booking',
    templateUrl: './booking.component.html',
    styleUrls: ['./booking.component.css',
        '../../../assets/css/standard/layout.css',]
})
export class BookingComponent implements OnInit {
    events: any[];
    @Input() data: any;
    @Input() test: any;
    numbersOfCol: Array<any>;
    numbersOfRow: Array<any>;
    rowHeader: Array<any>;

    target: String;

    constructor(private renderer: Renderer2) { }
    @ViewChild('avaDateTime') private avaDateTime: ElementRef;
    @ViewChild('chooseFestSeat') private chooseFestSeat: ElementRef;
    @ViewChild('chooseZone') private chooseZone: ElementRef;
    @ViewChild('chooseSeat') private chooseSeat: ElementRef;

    ngOnInit() {
        this.data = [];
        this.prepareFetch();
        this.loopSeatNo();
        imageMaps();
        // $("img[usemap]").jMap();
        // $(window).on("load", function () {
        //     ($('img[usemap]') as any).jMap();
        // })

        this.events = [
            {
                "title": "1,500",
                "start": "2018-03-03"
            },
            {
                "title": "1,800",
                "start": "2018-03-31"
            },
        ];


    }



    scrollTo(target) {
        $('html,body').delay(500).animate({
            scrollTop: $(target).offset().top
        }, 700);
    }

    handleEventClick(e) {
        this.renderer.addClass(this.avaDateTime.nativeElement, 'show');
        this.scrollTo('#avaDateTime');
    }

    selectDateTime() {
        this.renderer.addClass(this.chooseZone.nativeElement, 'show');
        this.scrollTo('#chooseZone');
    }

    selectZone() {
        this.renderer.addClass(this.chooseSeat.nativeElement, 'show');
        this.scrollTo('#chooseSeat');
    }

    loopSeatNo() {
        var i: number;
        var u: number;

        for (i = 1; i <= 40; i++) {
            for (u = 1; u <= 40; u++) {
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
}

// interface JQuery {
//     jMap(): void;
// }