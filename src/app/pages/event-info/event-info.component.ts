import { Component, OnInit, ViewChild, ViewEncapsulation, ElementRef, Renderer2} from '@angular/core';
import { AgmMap } from '@agm/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { AtkService } from '../../shared/services/atk.service';
import { SharedService } from '../../shared/services/shared-service.service';
import { resolveDefinition } from '@angular/core/src/view/util';
import { EventInfo } from '../../shared/models/eventInfo.model';
import * as Jquery from 'jquery';

@Component({
  selector: 'app-event-info',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './event-info.component.html',
  styleUrls: ['./event-info.component.css',
    '../../../assets/css/standard/jquerysctipttop.css',
    '../../../assets/css/standard/utility.css',
    '../../../assets/css/standard/layout.css' ],
  animations: [
    trigger('UpNDown', [
      transition('void => *', [
        style({ transform: 'translateY(-100%)', opacity: 1 }),
        animate(600)
      ]),
      transition('* => void', [
        animate(600, style({ transform: 'translateY(-100%)', opacity: 0 }))
      ])
    ])
  ]
})
export class EventInfoComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private atkService: AtkService,
    private renderer: Renderer2,
    private sharedService: SharedService
  ) {}

  @ViewChild(AgmMap) agmMap: AgmMap
  @ViewChild('BUYTICKET') private buyTicketBtn: ElementRef;
  
  lat: number = 13.913260;
  lng: number = 100.546502;
  isMapShow:boolean = false;
  private showMap: boolean = false;
  private map: any;
  private marker: any;  
  private idOld: any;  
  private info: any;  
  private elements: any;
  private performUri: string;
  private performId: string;
  private eventStatus: EventStatus;
  private canBooking = false;
  
  isLoading: boolean = true;
  isEventStatusLoading = true;
  isShowStickyHeader: boolean;
  eventInfo: EventInfo;
  
  ngOnInit() {

    $('#header').removeClass('sticky');
    
    this.sharedService.receiveData.subscribe(data => this.performId = data);
    this.route.paramMap.subscribe(params => {
      this.performUri = params.get('performUri');
    });

    if(this.performUri != undefined && this.performUri != '') {
      this.atkService.getEventInfo(this.performUri).subscribe(res => {
        this.eventInfo = res['data'];
        this.performId = this.eventInfo.event_id;
        this.isLoading = false;
        this.getEventStatus();
      }, error => {
        this.isLoading = false;
      });
    } else {
      this.isLoading = false;
    }
    
  }

  ngOnDestroy() {
  }

  getEventStatus() {
    if(this.performId != undefined && this.isLoading == false) {
      this.atkService.getEventStatus(this.performId).subscribe(res => {
        if(res['code'] == 100 && res['success'] == true) {
          this.eventStatus = res['data']['event_info'];
          console.log("EVENT CHECK STATUS : ", this.eventStatus)
          this.validateBuyTicketBtn(this.eventStatus);
        }
      });
    } else {
      this.isEventStatusLoading = false;
    }
  }

  validateBuyTicketBtn(event: EventStatus) {
    console.log(event);
    if(event.masterPerform == 'Y' && event.isPromo != 'Y' && event.isfull != 'Y') {
      this.renderBuyTicketButton(this.buyTicketBtn,'canBook');
      this.canBooking = true;
    } else if(event.masterPerform == 'Y' && event.isPromo == 'Y') {
      this.renderBuyTicketButton(this.buyTicketBtn,'soon')
    } else if(event.masterPerform == 'Y' && event.isfull == 'Y') {
      this.renderBuyTicketButton(this.buyTicketBtn,'full')
    }
    
    this.isEventStatusLoading = false;
  }

  buyTicket(performId: string) {
    if (this.canBooking) {
      this.isEventStatusLoading = true;
      this.sharedService.sendData(this.performId);
      this.router.navigate(['/booking/get-seat']);
    }
  }
  
  renderBuyTicketButton(_element: ElementRef, _eventStatus: string, ) {
    let classListInput, displayText;
    if(_eventStatus == 'canBook') {
      classListInput = "btn btn-atk-primary";
      displayText = "BUY TICKETS";
    } else if(_eventStatus == "soon") {
      classListInput = "btn btn-atk-light";
      displayText = "COMING SOON";
    } else if(_eventStatus == "full") {
      classListInput = "btn btn-atk-danger";
      displayText = "SOLD OUT";
    }

    _element.nativeElement.className = "";

    let splitClass = classListInput.split(' ');
    for(let i = 0; i < splitClass.length; i++) {
      this.renderer.addClass(_element.nativeElement, splitClass[i]);
    }
    
    this.renderer.setProperty(_element.nativeElement, 'innerHTML', displayText);

  }

  stickyBarTrigger(isShow) {
    if(isShow) {
      this.isShowStickyHeader = true
      $('#buttonWrapper button').appendTo($('#stickyButtonWrapper'));
    } else {
      this.isShowStickyHeader = false;
      $('#stickyButtonWrapper button').appendTo($('#buttonWrapper'));
    }
  }
  
  getDirection(event: any): void {
    window.open('https://www.google.com/maps/dir/Current+Location/' + this.lat + ',' + this.lng);
  }

  private clickShowMap() {
    this.showMap = !this.showMap;
  }

  activeMap(): void {

    this.isMapShow = true;

    if ($('.showMap').is(':hidden')) {
      $('.showMap').show();
      this.agmMap.triggerResize()
        .then(() => (this.agmMap as any)._mapsWrapper.setCenter({ lat: this.lat, lng: this.lng }));
    } else {
      $('.showMap').hide();
      this.isMapShow = false;
    }

  }


  addElement(_element: ElementRef, _toggleClass: string) {
    let splitClass = _toggleClass.split(' ');
    for(let i = 0; i < splitClass.length; i++) {
      this.renderer.addClass(_element.nativeElement, splitClass[i]);
    }
  }

  removeElement(_element: ElementRef, _toggleClass: string) {
    if(_toggleClass == "*") {
      _element.nativeElement.className = "";
    } else {
      this.renderer.removeClass(_element.nativeElement, _toggleClass);
    }
  }

}


interface EventStatus {
  isPromo: string,
  isfull: string,
  masterPerform: string,
}