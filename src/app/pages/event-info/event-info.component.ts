import { Component, OnInit, ViewChild, ViewEncapsulation, ElementRef } from '@angular/core';
import { AgmMap } from '@agm/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AtkService } from '../../shared/services/atk.service';
import { SharedService } from '../../shared/services/shared-service.service';
import * as Jquery from 'jquery';
import { resolveDefinition } from '@angular/core/src/view/util';
import { EventInfo } from '../../shared/models/eventInfo.model';

@Component({
  selector: 'app-event-info',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './event-info.component.html',
  styleUrls: ['./event-info.component.css',
    '../../../assets/css/standard/jquerysctipttop.css',
    '../../../assets/css/standard/utility.css',
    '../../../assets/css/standard/layout.css']
})
export class EventInfoComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private atkService: AtkService,
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
  isLoading: boolean = true;
  isEventStatusLoading = true;
  eventInfo: EventInfo;
  
  ngOnInit() {

    this.sharedService.receiveData.subscribe(data => this.performId = data);
    console.log(this.performId);
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

    // console.log((_.findIndex(eventIndex,this.performPath)));
    
    // let eventInfoContent = <HTMLDivElement> document.getElementById("eventInfoContent");
    // eventInfoContent.innerHTML = '<style>.seatmap img {width:100%;} div.ticketinfo {width: 100%; font-size: 1em;}h1.ticketinfoheader {font-weight: bold; font-size: 1.6em; color: #37bde0;}a {color: #37bde0; text-decoration:  none;}p.subtopic {font-weight: bold; font-size: 1.2em;}p.specialqoute {font-style: oblique;}p.eventdetails {line-height: 1.5em;}p.listtopic {font-weight: bold; font-size: 1.1em; margin: 20px 0 0 0; padding: 0;}p.cscallcenter {font-weight: bold; color:#223376;}remark {color: #cc0000;}span.txthighlight {font-weight: bold; color: #f4cc33;}table.ticketprice {width: 100%; text-align: center;}table.ticketprice tr th {padding: 10px; margin: 5px; color: #FFFFFF; background: #666666;}table.ticketprice tr td {padding: 10px; margin: 5px; background: #ededed;}ul.intkinfo {padding: 0; margin: 0; list-style-type: none;}ul.intkinfo li {padding: 0; margin: 0;}ul.intkinfo > li {text-indent: 0;}ul.intkinfo > li:before {content: "- ";  text-indent: -5px;}ol {margin: 10px 0; padding: 0 0 0 15px;}div.seatmap {border: 1px solid #ccc; padding: 20px; text-align:  center;}</style><h1 class="ticketinfoheader">ร่วมส่งท้ายปี กับงาน “สวนผึ้งไฮแลนด์เคาท์ดาวน์เฟสติวัล 2017”</h1>					<p class="subtopic">ระหว่างวันที่ 30-31 ธันวาคม นี้ พบกับคอนเสิร์ตจากศิลปินชื่อดังที่จะมาสร้างความสนุกและความประทับใจ</p>					<p>						<span class="txthighlight">วันที่ 30 ธันวาคม 2560</span> พบกับอะตอม ชนกันต์ และวงลิปตา						<br>						<span class="txthighlight">วันที่ 31 ธันวาคม 2560</span> พบกับ วงพอส และวงซีซั่นไฟว์</p>					<p>พร้อมทั้งกิจกรรมบอลลูนที่น่าตื่นตาตื่นใจรอให้ทุกท่านมาสัมผัสบรรยากาศสุดพิเศษ และ ร่วมเคาท์ดาวน์เข้าสู่ปี 2018 ไปด้วยกัน						<strong>ณ สวนผึ้งไฮแลนด์ อ.สวนผึ้ง จ.ราชบุรี</strong>					</p>					<p class="specialqoute">						<strong>พิเศษ!!!</strong> ก่อนใคร เปิดจำหน่ายบัตร Early Bird ราคาเพียง 400 บาท (ตั้งแต่ 1 - 7พฤศจิกายนนี้) และจำหน่ายบัตรราคาปกติ						500 บาท (ตั้งแต่ 8 พฤศจิกายน – 31 ธันวาคม)บัตรสามารถใช้เข้างานได้ทั้ง 2 วัน พร้อมรับเครื่องดื่มฟรี (บัตร 1 ใบ ต่อ 1						สิทธิ์ เท่านั้น) แล้วพบกัน!!!</p>					<p class="eventdetails">						<strong>สถานที่ :</strong> ณ สวนผึ้งไฮแลนด์ อ.สวนผึ้ง จ.ราชบุรี						<br>						<strong>เปิดจำหน่าย :</strong> วันพุธที่ 1 พฤศจิกายน พ.ศ. 2560 เวลา 10.00 น.						<br>						<strong>Public Sale :</strong> Wednesday 1 November 2017 at 10.00 am.						<br>						<strong>ราคาบัตร/Ticket Price :</strong>					</p>					<table class="ticketprice">						<tbody>							<tr>								<th>ประเภทบัตร</th>								<th>ราคา (บาท)</th>								<th>ระยะเวลาการจำหน่าย</th>							</tr>							<tr>								<td>Early Bird</td>								<td>400</td>								<td>1 - 7 พ.ย. 2560</td>							</tr>							<tr>								<td>Public Sale</td>								<td>500</td>								<td>8 พ.ย. - 31 ธ.ค. 2560</td>							</tr>						</tbody>					</table>					<p>						<span class="remark">หมายเหตุ: บัตร 1 ใบ สามารถเข้าได้ 2 วัน</span>					</p>					<p>						<strong>รอบการแสดง / Showtime :</strong>						<br> วันที่ 30 - 31 ธันวาคม 2560 เวลา 19.00 - 24.00 น.						<br> 30 - 31 December 2017 at 7.00 pm. - 12.00 am.					</p>					<p>						<strong>ประตูเปิด :</strong> 17.30 น.เป็นต้นไป						<br>						<strong>Gate Open :</strong> 5.30 pm. Onward					</p>					<ul class="intkinfo">						<span class="remark">หมายเหตุ:</span>						<li>จำกัดการซื้อทุกช่องทาง 1 บัตรประชาชน ต่อบัตร 10 ใบ (สามารถซื้อซ้ำได้)</li>						<li>ราคาบัตรดังกล่าวยังไม่รวมค่าธรรมเนียมการออกบัตรใบละ 20 บาท</li>					</ul>					</p>					<p class="listtopic">ช่องทางการจำหน่าย / Distribution Channels</p>					<ol>						<li>							<strong>เคาน์เตอร์เซอร์วิส ออลล์ทิคเก็ต ในร้าน 7-Eleven</strong> หรือร้านค้าที่มีสัญลักษณ์เคาน์เตอร์เซอร์วิสทั่วประเทศ (รับชำระเฉพาะเงินสด)							/							<strong>Purchase via Counter Service All Tickets in 7-Eleven</strong> or at any shops that have Counter Service Logos (Payment							by cash only)</li>						<li>							<a href="#">www.allticket.com</a> รับชำระผ่านบัตรเครดิต (คิดค่าธรรมเนียมบัตรเครดิตเพิ่ม 3%) หรือ นำ PAY CODE ไปชำระเงินสดที่เคาน์เตอร์เซอร์วิส							ทุกสาขา / Purchase via							<a href="#">www.allticket.com</a> Payment by credit cards (Service charge 3%) or take PAY CODE to pay at Counter Service all branches.</li>						<li>จุดจำหน่ายบัตร ALL Ticket หน้าประตูทางเข้างาน / Purchase via Counter Service All Ticket booth at the venue.</li>					</ol>					<p class="listtopic">ซื้อบัตรง่าย เพียง 3 ขั้นตอน / 3 Easy steps to buy a ticket</p>					<ol>						<li>เลือกรอบ,ราคา / Select zone, ticket price</li>						<li>รูด/เสียบบัตรประชาชน / Show your ID Card</li>						<li>กดหมายเลขโทรศัพท์ / Inform your mobile number จากนั้นเลือกช่องทางการรับบัตรแล้วชำระเงินพร้อมรับ “ใบรับฝากชำระ” และ							SMS เพื่อเป็นหลักฐานการซื้อตั๋ว / Keep the receipt and SMS to be confirmed that you have already paid for the tickets.</li>					</ol>					<p class="listtopic">ผังที่นั่ง :</p>					<div class="seatmap">						<img src="https://s17.postimg.org/ak7ocdspb/concert.png">					</div><p class="cscallcenter">สอบถามข้อมูลเพิ่มเติมได้ที่ Counter Service Call Center : 0-2826-7788</p>';
    // $('#concertIcon').attr("src","../assets/images/eventProfile/festival_profile.png");            
    // window.onscroll = function (e) {  
    //   var windowScroll = window.scrollY || document.getElementsByTagName("html")[0].scrollTop;
    //   if (windowScroll >= 750) {			
    //     //document.getElementById('headerSticky').style.width = document.getElementById('container-fluid').offsetWidth+'';	
    //     $(".headerSticky").fadeIn(500);
    //   } else {			
    //     $(".headerSticky").fadeOut();
    //   }
    // }     
    
    // window.addEventListener('scroll', this.adjustStickyHeader);
    // window.addEventListener('resize', this.adjustStickyHeader);


  }

  ngOnDestroy() {
    window.removeEventListener('resize', this.adjustStickyHeader);
    window.removeEventListener('scroll', this.adjustStickyHeader);
  }

  getEventStatus() {
    if(this.performId != undefined && this.isLoading == false) {
      this.atkService.getEventStatus(this.performId).subscribe(res => {
        if(res['code'] == 100 && res['success'] == true) {
          this.isEventStatusLoading = false;
          // this.buyTicketBtn.nativeElement.addClass('')
        }
        console.log(res);
      });
    } else {
      this.isEventStatusLoading = false;
    }
  }

  buyTicket(performId: string) {
    this.sharedService.sendData(this.performId);
    this.router.navigate(['/booking/get-seat']);
  }
  
  adjustStickyHeader(){    
    if(window.outerWidth <= 1100 && window.outerWidth > 450) {
      $("#stickyTitle .inline").addClass("display-block");
      $("#stickyTitle").addClass("no-padding");
      $("#stickyTitle").removeClass("col-5");				
      $("#stickyTitle").addClass("no-padding");
      $(".stickyTitle").addClass("m-l-10");		
      document.getElementById('sticky-image').style.display = 'none';    
      document.getElementById('concertIcon').style.visibility = 'hidden';  
      $(".sticky-btn-buy").addClass("text-align-center");
      $(".sticky-btn-buy button").parent().addClass("col-12");
      $("#locateBar").addClass("col-4 no-padding");
      $("#dateBar").addClass("col-4 no-padding");
      $("#timeBar").addClass("col-4 no-padding");
      document.getElementById('dateBar').style.display = 'block';
      document.getElementById('locateBar').style.display = 'block';
      document.getElementById('timeBar').style.display = 'block';
      $('#sticky-btn-buy').removeClass('col-5');
      $('#sticky-btn-buy').addClass('col-12');
    } else if(window.outerWidth <= 450) {
      $(".sticky-image").show();
      $(".stickyTitle .inline.display-block").removeClass("display-block");
      document.getElementById('sticky-image').style.display = 'none';    
      document.getElementById('concertIcon').style.visibility = 'visible';
      
      document.getElementById('dateBar').style.display = 'none';
      document.getElementById('locateBar').style.display = 'none';
      document.getElementById('timeBar').style.display = 'none';
      
      $('#sticky-btn-buy').removeClass('col-12');
      $('#sticky-btn-buy').addClass('col-5');			    
        
      $(".sticky-btn-buy").css("line-height","50px");
      $(".sticky-image").siblings().first().show();
    } else {				
      $(".sticky-image").show();
      $(".stickyTitle .inline.display-block").removeClass("display-block");
      document.getElementById('sticky-image').style.display = 'block';    
      document.getElementById('concertIcon').style.visibility = 'unset';
      $("#locateBar").removeClass("col-12");
      $("#dateBar").removeClass("col-12");
      $("#timeBar").removeClass("col-12");				
      $(".sticky-btn-buy").css("line-height","50px");
      $(".sticky-image").siblings().first().show();
      document.getElementById('dateBar').style.display = 'block';
      document.getElementById('locateBar').style.display = 'block';
      document.getElementById('timeBar').style.display = 'block';
      
      $('#sticky-btn-buy').removeClass('col-5');
      $('#sticky-btn-buy').addClass('col-12');
        
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

}