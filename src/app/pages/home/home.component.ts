import { Component, OnInit, AfterViewInit, HostListener, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { EventBanner } from '../../shared/models/eventBanner.model';
import { CardTicket } from '../../shared/models/cardTickets';
import { CardTickets } from '../../shared/models/cardTickets';
import { ConstMaster } from '../../shared/config/ConstMaster';
import { HomeService } from '../../shared/services/home.service';
import { CardTicketComponent } from './card-ticket/card-ticket.component';
import { Subscription } from 'rxjs';
import * as underscore from 'underscore';
declare var $: any;

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: [
			'./home.component.css',
			'../../../assets/css/standard/cardticket.css',
			'../../../assets/css/standard/utility.css',
			'../../../assets/css/standard/layout.css',
		]
})

export class HomeComponent implements OnInit {
	@ViewChild(CardTicketComponent) cardTicketComponent : CardTicketComponent;
	countImagesLoaded = 0;
	countCardImageLoaded = 0;
	screenWidth: number;
	screenType: string;
	slideBannerImages: EventBanner[];
	cardTicketSlide: CardTicket[] = [];
	cardTicketHot: CardTicket[];
	cardTicketRec: CardTicket[];
	cardTickets: CardTickets;
	isSlideLoaded: boolean = false;
	placeHolderImg: string = ConstMaster.DEFAULT_IMAGES.ticketCard;
	subscription: Subscription;

	constructor(private router: Router, private homeService: HomeService) {
		this.screenWidth = (window.innerWidth);
	}

	ngOnInit() {
		this.router.events.subscribe((evt) => {
			if (!(evt instanceof NavigationEnd)) {
				return;
			}
			window.scrollTo(0, 0);
		});

		this.subscription = this.homeService.fetchHomeData().subscribe(response => {

			// let response = {"success":true,"code":100,"message":"Success","data":{"all_":{"isNext":false,"curpage":1,"items":[{"id":"18042","isFull":true,"performStatus":null,"name":"What the Fest Music Festival","performStatusDesc":"","performCardPic":"https://atkmedia.allticket.com/assets/content/18042/WTF18042110420181548ticketCard.jpg","performType":"C","performCardShowDate":"16 - 17<br/>JUNE/2018","performCardName":"What the Fest Music Festival","skipInfo":"N","isPromo":false},{"id":"18043","isFull":true,"performStatus":null,"name":"NCT U (TAEYONGxTEN) FAN MEETING in BANGKOK","performStatusDesc":"","performCardPic":"https://atkmedia.allticket.com/assets/content/18043/NCT18043120420181031ticketCard.jpg","performType":"C","performCardShowDate":"03<br/>JUNE/2018","performCardName":"TAEYONGxTEN FANMEETINGinBKK","skipInfo":"N","isPromo":false},{"id":"18031","isFull":false,"performStatus":null,"name":"คาราบาว \"หากหัวใจยังรักควาย\"","performStatusDesc":"","performCardPic":"https://atkmedia.allticket.com/assets/content/18031/ITP18031080320180956ticketCard.jpg","performType":"C","performCardShowDate":"21<br/>JUL/2018","performCardName":"คาราบาว \"หากหัวใจยังรักควาย\"","skipInfo":"N","isPromo":false},{"id":"18041","isFull":false,"performStatus":null,"name":"CHANG SUPER GT RACE 2018 ROUND 4","performStatusDesc":"","performCardPic":"https://atkmedia.allticket.com/assets/content/18041/SGT18041020420181658ticketCard.jpg","performType":"S","performCardShowDate":"30 JUN - <br/> 01 JUL/2018 ","performCardName":"CHANG SUPER GT RACE 2018 ROUND 4","skipInfo":"N","isPromo":false},{"id":"18022","isFull":false,"performStatus":null,"name":"PTT THAILAND GRAND PRIX 2018 ","performStatusDesc":"","performCardPic":"https://atkmedia.allticket.com/assets/content/18022/PTT18022180120181735ticketCard.jpg","performType":"S","performCardShowDate":"5-7<br/>OCT/2018","performCardName":"PTT THAILAND GRAND PRIX 2018","skipInfo":"N","isPromo":false},{"id":"18038","isFull":false,"performStatus":null,"name":"BLANCPAIN GT SERIES ASIA 2018","performStatusDesc":"","performCardPic":"https://atkmedia.allticket.com/assets/content/18038/BPA18038290320181423ticketCard.jpg","performType":"S","performCardShowDate":"12-13<br/>MAY/2018","performCardName":"BLANCPIAN GT SERIES ASIA 2018","skipInfo":"N","isPromo":false},{"id":"18029","isFull":false,"performStatus":null,"name":"บัตรชมฟุตบอลสโมสรสุพรรณบุรี เอฟซี","performStatusDesc":"","performCardPic":"https://atkmedia.allticket.com/assets/content/18029/SMF18029130220181125ticketCard.jpg","performType":"S","performCardShowDate":"7<br/>APR/2018","performCardName":"บัตรชมฟุตบอลสโมสรสุพรรณบุรี เอฟซี","skipInfo":"N","isPromo":false},{"id":"18024","isFull":false,"performStatus":null,"name":"บัตรชมฟุตบอลสโมสรไทยฮอนด้า เอฟซี","performStatusDesc":"","performCardPic":"https://atkmedia.allticket.com/assets/content/18024/THD18024020220181106ticketCard.jpg","performType":"S","performCardShowDate":"6<br/>MAY/2018","performCardName":"บัตรชมฟุตบอลสโมสรไทยฮอนด้า เอฟซี ฤดูกาล 2018","skipInfo":"N","isPromo":true},{"id":"18027","isFull":false,"performStatus":null,"name":"บัตรชมฟุตบอลสโมสรบีจีเอฟซี","performStatusDesc":"","performCardPic":"https://atkmedia.allticket.com/assets/content/18027/BGF18027230220181405ticketCard.jpg","performType":"S","performCardShowDate":"13<br/>MAY/2018","performCardName":"บัตรชมฟุตบอลสโมสรบีจีเอฟซี","skipInfo":"N","isPromo":false},{"id":"18001","isFull":false,"performStatus":null,"name":"บัตรชมฟุตบอลสโมสรบุรีรัมย์ ยูไนเต็ด","performStatusDesc":"","performCardPic":"https://atkmedia.allticket.com/assets/content/18001/1800128012018logoweb.jpg","performType":"S","performCardShowDate":"26<br/>JUNE/2018","performCardName":"บัตรชมฟุตบอลสโมสรบุรีรัมย์ ยูไนเต็ด ฤดูกาล 2018","skipInfo":"N","isPromo":false},{"id":"18023","isFull":false,"performStatus":null,"name":"บัตรชมฟุตบอลสโมสรทรู แบงค็อก ยูไนเต็ด","performStatusDesc":"","performCardPic":"https://atkmedia.allticket.com/assets/content/18023/TBK18023060220181353ticketCard.jpg","performType":"S","performCardShowDate":"6<br/>MAY/2018","performCardName":"บัตรชมฟุตบอลสโมสรทรู แบงค็อก ยูไนเต็ด","skipInfo":"N","isPromo":true}],"cnall":11,"isBack":false,"allpage":1},"banner_":{"items":[{"id":"18042","value":"https://atkmedia.allticket.com/assets/content/18042/WTF18042110420181549Slidebanner.jpg"},{"id":"18043","value":"https://atkmedia.allticket.com/assets/content/18043/NCT060520182011SoldOut.jpg"},{"id":"18022","value":"https://atkmedia.allticket.com/assets/content/18022/PTT18022240420181107slidebanner.jpg"},{"id":"18031","value":"https://atkmedia.allticket.com/assets/content/18031/ITP18031080320180958slideBanner.jpg"}]},"hot_":{"isNext":false,"curpage":1,"items":[{"id":"18001","isFull":false,"performStatus":null,"name":"บัตรชมฟุตบอลสโมสรบุรีรัมย์ ยูไนเต็ด","performStatusDesc":"","performCardPic":"https://atkmedia.allticket.com/assets/content/18001/1800128012018logoweb.jpg","performType":"S","performCardShowDate":"26<br/>JUNE/2018","performCardName":"บัตรชมฟุตบอลสโมสรบุรีรัมย์ ยูไนเต็ด ฤดูกาล 2018","skipInfo":"N","isPromo":false},{"id":"18031","isFull":false,"performStatus":null,"name":"คาราบาว \"หากหัวใจยังรักควาย\"","performStatusDesc":"","performCardPic":"https://atkmedia.allticket.com/assets/content/18031/ITP18031080320180956ticketCard.jpg","performType":"C","performCardShowDate":"21<br/>JUL/2018","performCardName":"คาราบาว \"หากหัวใจยังรักควาย\"","skipInfo":"N","isPromo":false}],"cnall":2,"isBack":false,"allpage":0},"rec_":{"isNext":false,"curpage":1,"items":[{"id":"18022","isFull":false,"performStatus":null,"name":"PTT THAILAND GRAND PRIX 2018 ","performStatusDesc":"","performCardPic":"https://atkmedia.allticket.com/assets/content/18022/PTT18022180120181735ticketCard.jpg","performType":"S","performCardShowDate":"5-7<br/>OCT/2018","performCardName":"PTT THAILAND GRAND PRIX 2018","skipInfo":"N","isPromo":false},{"id":"18043","isFull":true,"performStatus":null,"name":"NCT U (TAEYONGxTEN) FAN MEETING in BANGKOK","performStatusDesc":"","performCardPic":"https://atkmedia.allticket.com/assets/content/18043/NCT18043120420181031ticketCard.jpg","performType":"C","performCardShowDate":"03<br/>JUNE/2018","performCardName":"TAEYONGxTEN FANMEETINGinBKK","skipInfo":"N","isPromo":false},{"id":"18042","isFull":true,"performStatus":null,"name":"What the Fest Music Festival","performStatusDesc":"","performCardPic":"https://atkmedia.allticket.com/assets/content/18042/WTF18042110420181548ticketCard.jpg","performType":"C","performCardShowDate":"16 - 17<br/>JUNE/2018","performCardName":"What the Fest Music Festival","skipInfo":"N","isPromo":false},{"id":"80434","isFull":false,"performStatus":null,"name":"ซื้อตั๋วรถโดยสาร บขส.","performStatusDesc":"","performCardPic":"https://atkmedia.allticket.com/assets/content/80434/card-80434.jpg","performType":"B","performCardShowDate":"<Br>All Time","performCardName":"รถโดยสาร บขส 999","skipInfo":"N","isPromo":false}],"cnall":4,"isBack":false,"allpage":1}}}
			console.log(response)
			if(response['success'] == true && response['code'] == 100) {

				if(Object.keys(response['data']).length > 0 ) {
					this.slideBannerImages = response['data']['banner_']['items'];
					this.cardTicketSlide = response['data']['all_']['items'];
					this.cardTicketHot = response['data']['hot_']['items'];
					this.cardTicketRec = response['data']['rec_']['items'];
					this.cardTickets = {
						rec: this.cardTicketRec,
						hot: this.cardTicketHot
					}
				}
			}

		});

		document.addEventListener("scroll",this.scrollHandler);
	}

	ngOnDestroy() {
		document.removeEventListener("scroll",this.scrollHandler);
		this.subscription.unsubscribe();
	}

	goToEventInfo(performUri: string){
		this.cardTicketComponent.goToEventInfo(performUri);
	}

	private slideLoaded() {
		this.countImagesLoaded++;

		if (this.countImagesLoaded == this.slideBannerImages.length) {

			this.isSlideLoaded = true;

			$('#slider .owl-carousel').owlCarousel({
				items: 1,
				animateOut: 'fadeOutLeft',
				animateIn: 'zoomInRight',
			});

		}
	}

	private slideCardLoaded() {
		this.countCardImageLoaded++;

		if(this.countCardImageLoaded == this.cardTicketSlide.length) {
			$('#sliderCard .owl-carousel').owlCarousel({
				loop: false,
				items: 1,
				dots: false,
				nav: true,
				navText: ['<i class="fa fa-chevron-left mt-2 mr-1"></i>', '<i class="fa fa-chevron-right mt-2 ml-1"></i>'],
				responsive: {
					0: {
						items: 1
					},
					480: {
						items: 2
					},
					768: {
						items: 3
					},
					992: {
						items: 4
					},
					1366: {
						items: 5
					}
				}
			});
		}
	}

	private scrollHandler() {
		let windowScroll = window.scrollY || document.getElementsByTagName("html")[0].scrollTop;
		let header = $('#header');
		let maxHeight = document.documentElement.scrollHeight;
		if (windowScroll >= 800) {

			if(maxHeight < 1500) return;

			$(header).find('.dropdown-menu.show').removeClass('show');
			if (!$(header).hasClass('sticky')) {
				$(header).addClass('sticky');
			}
		} else {
			if ($(header).hasClass('sticky')) {
				$(header).removeClass('sticky');
				$(header).find('.dropdown-menu.show').removeClass('show');
			}

		}
	}
}