import { Component, OnInit, ViewEncapsulation, ElementRef, Input, ViewChild, Renderer2, AfterContentChecked } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../shared/services/shared-service.service';
import * as $ from 'jquery';

declare function jMap(element): any;

@Component({
    selector: 'app-booking',
    templateUrl: './booking.component.html',
    styleUrls: ['./booking.component.css',
        '../../../assets/css/standard/layout.css',
        '../../../assets/css/standard/utility.css',]
})
export class BookingComponent implements OnInit {
    event: any;
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
        private router: Router,
        private sharedService: SharedService
        ){
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

        let receiveData;
        this.sharedService.receiveData.subscribe(data => receiveData = data);

        if(receiveData == "18016") {
            this.event = {
                "onlyNonSeat" : "N",
                "event_calendar" : [
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
                    },
                ],
                "image_zone": "\n\t<img src=\"https://atkmedia.allticket.com/images/zoneInternet/SMT1801630101148Zoneplan.jpg\" style=\"border-width: 0px; border-style: solid; width: 625px; height: 419px;\" usemap=\"#Map18016\"><map name=\"Map18016\"><area class=\"p_AL\" coords=\"357,192,413,190,414,243,403,279,358,310\" data-zone=\"AL\" href=\"#\" shape=\"poly\" style=\"cursor: pointer;\"> <area class=\"p_AR\" coords=\"452,192,508,192,510,311,463,277,451,243\" data-zone=\"AR\" href=\"#\" shape=\"poly\" style=\"cursor: pointer;\"> <area class=\"p_AC\" coords=\"363,343,410,300,455,300,502,343,502,352,366,351\" data-zone=\"AC\" href=\"#\" shape=\"poly\" style=\"cursor: pointer;\"> <area class=\"p_C1\" coords=\"307,225,279,217,244,217,244,259,280,261,307,254\" data-zone=\"C\" href=\"#\" shape=\"poly\" style=\"cursor: pointer;\"> <area class=\"p_D1\" coords=\"306,273,279,265,244,265,244,309,277,307,306,299\" data-zone=\"D\" href=\"#\" shape=\"poly\" style=\"cursor: pointer;\"> <area class=\"p_E1\" coords=\"306,322,280,311,243,313,243,362,307,346\" data-zone=\"E\" href=\"#\" shape=\"poly\" style=\"cursor: pointer;\"> <area class=\"p_F1\" coords=\"307,350,239,369,239,388,251,411,296,385,311,358\" data-zone=\"F\" href=\"#\" shape=\"poly\" style=\"cursor: pointer;\"> <area class=\"p_G1\" coords=\"328,395,299,389,255,417,276,454,332,402\" data-zone=\"G\" href=\"#\" shape=\"poly\" style=\"cursor: pointer;\"> <area class=\"p_H1\" coords=\"335,406,342,409,347,436,321,480,281,458\" data-zone=\"H\" href=\"#\" shape=\"poly\" style=\"cursor: pointer;\"> <area class=\"p_I1\" coords=\"377,429,351,437,324,482,363,506,385,432\" data-zone=\"I\" href=\"#\" shape=\"poly\" style=\"cursor: pointer;\"> <area class=\"p_J1\" coords=\"395,435,417,450,418,484,399,507,369,507,388,435\" data-zone=\"J\" href=\"#\" shape=\"poly\" style=\"cursor: pointer;\"> <area class=\"p_K1\" coords=\"421,433,445,433,445,487,421,488\" data-zone=\"K\" href=\"#\" shape=\"poly\" style=\"cursor: pointer;\"> <area class=\"p_L1\" coords=\"469,435,450,448,450,487,466,508,499,508,477,435\" data-zone=\"L\" href=\"#\" shape=\"poly\" style=\"cursor: pointer;\"> <area class=\"p_M2\" coords=\"481,433,489,428,515,439,543,484,503,507\" data-zone=\"M\" href=\"#\" shape=\"poly\" style=\"cursor: pointer;\"> <area class=\"p_N1\" coords=\"526,409,519,437,545,480,586,459,530,403\" data-zone=\"N\" href=\"#\" shape=\"poly\" style=\"cursor: pointer;\"> <area class=\"p_O1\" coords=\"534,402,590,455,612,415,569,388,540,393\" data-zone=\"O\" href=\"#\" shape=\"poly\" style=\"cursor: pointer;\"> <area class=\"p_P1\" coords=\"556,357,570,384,615,413,629,391,627,369,559,348\" data-zone=\"P\" href=\"#\" shape=\"poly\" style=\"cursor: pointer;\"> <area class=\"p_Q1\" coords=\"560,346,560,321,588,313,623,313,623,363\" data-zone=\"Q\" href=\"#\" shape=\"poly\" style=\"cursor: pointer;\"> <area class=\"p_R1\" coords=\"560,273,586,264,622,265,623,309,589,307,560,299\" data-zone=\"R\" href=\"#\" shape=\"poly\" style=\"cursor: pointer;\"> <area class=\"p_S1\" coords=\"560,225,586,217,622,217,623,261,586,261,562,251\" data-zone=\"S\" href=\"#\" shape=\"poly\" style=\"cursor: pointer;\"> <area class=\"p_SC1\" coords=\"314,217,343,217,343,261,314,261\" data-zone=\"SC\" href=\"#\" shape=\"poly\" style=\"cursor: pointer;\"> <area class=\"p_SD1\" coords=\"314,264,340,264,342,307,314,306\" data-zone=\"SD\" href=\"#\" shape=\"poly\" style=\"cursor: pointer;\"> <area class=\"p_SE1\" coords=\"314,313,343,311,350,354,326,367,313,348\" data-zone=\"SE\" href=\"#\" shape=\"poly\" style=\"cursor: pointer;\"> <area class=\"p_SF1\" coords=\"354,358,377,381,363,406,340,396,329,373\" data-zone=\"SF\" href=\"#\" shape=\"poly\" style=\"cursor: pointer;\"> <area class=\"p_SG1\" coords=\"381,383,409,392,409,422,387,421,366,411\" data-zone=\"SG\" href=\"#\" shape=\"poly\" style=\"cursor: pointer;\"> <area class=\"p_SH1\" coords=\"414,392,452,393,452,421,414,422\" data-zone=\"SH\" href=\"#\" shape=\"poly\" style=\"cursor: pointer;\"> <area class=\"p_SI1\" coords=\"458,392,485,384,499,410,477,422,458,422\" data-zone=\"SI\" href=\"#\" shape=\"poly\" style=\"cursor: pointer;\"> <area class=\"p_SJ1\" coords=\"488,381,511,358,537,373,528,395,503,409\" data-zone=\"SJ\" href=\"#\" shape=\"poly\" style=\"cursor: pointer;\"> <area class=\"p_SK1\" coords=\"517,354,540,367,552,347,552,314,523,313\" data-zone=\"SK\" href=\"#\" shape=\"poly\" style=\"cursor: pointer;\"> <area class=\"p_SL1\" coords=\"523,264,551,264,551,307,522,309\" data-zone=\"SL\" href=\"#\" shape=\"poly\" style=\"cursor: pointer;\"> <area class=\"p_SM1\" coords=\"522,217,551,216,552,261,522,262\" data-zone=\"SM\" href=\"#\" shape=\"poly\" style=\"cursor: pointer;\"></map>",
            }
        } else if (receiveData == "18042") {
            this.event = {
                "onlyNonSeat" : "Y",
                "event_calendar" : [
                    {
                        "title": "Event",
                        "start": "2018-05-04",
                        "round": "R1"
                    },
                    {
                        "title": "Event",
                        "start": "2018-05-05",
                        "round": "R2"
                    },
                    {
                        "title": "Event",
                        "start": "2018-05-06",
                        "round": "R3"
                    }
                ]
            }
        }
        console.log(receiveData);

        this.event = {
            "onlyNonSeat" : "Y",
            "event_calendar" : [
                {
                    "title": "Event",
                    "start": "2018-05-04",
                    "round": "R1"
                },
                {
                    "title": "Event",
                    "start": "2018-05-05",
                    "round": "R2"
                },
                {
                    "title": "Event",
                    "start": "2018-05-06",
                    "round": "R3"
                }
            ]
        }
        this.renderer.addClass(this.nonSeatSelector.nativeElement, 'show');
    }

    scrollTo(target) {
        $('html,body').stop().delay(200).animate({
            scrollTop: $(target).offset().top
        }, 700);
    }

    onSelectDate(e) {
        console.log(e);
        let showSeat = e.calEvent.showSeat;

        if(this.event.onlyNonSeat == "Y") {
            this.displayDate = e.calEvent.start._i;
            this.showNonSeat();
        } else {
            this.selectDateTime();
        }
    }

    selectDateTime() {
        this.renderer.addClass(this.chooseZone.nativeElement, 'show');
        setTimeout(() => {
            jMap('img[usemap]');
            console.log("TRIGGER !")
        }, 1000);
        
        // this.scrollTo('#chooseZone');
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
        this.router.navigate(['/discount']);
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
