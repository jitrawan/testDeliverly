import { Component, OnInit, AfterViewInit, HostListener, AfterViewChecked, OnChanges, HostBinding } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { EventBanner } from '../../shared/models/eventBanner.model';
import { CardTicket } from '../../shared/models/cardTickets';
import { CardTickets } from '../../shared/models/cardTickets';
import { ConstMaster } from '../../shared/config/ConstMaster';
import { HomeService } from '../../shared/services/home.service';
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
	private countImagesLoaded = 0;
	screenWidth: number;
	screenType: string;
	slideBannerImages: EventBanner[];
	cardTicketSlide: CardTicket[];
	cardTicketHot: CardTicket[];
	cardTicketRec: CardTicket[];
	cardTickets: CardTickets;

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

		this.homeService.getEventBanner().subscribe(response => {

			if(response['success'] == true && response['code'] == 100) {
				console.log(response)
				this.slideBannerImages = response['data']['banner_']['items'];
				this.cardTicketSlide = response['data']['all_']['items'];
				this.cardTicketHot = response['data']['hot_']['items'];
				this.cardTicketRec = response['data']['rec_']['items'];
				this.cardTickets = {
					rec: this.cardTicketRec,
					hot: this.cardTicketHot
				}
			}
		});

		// window.onscroll = function (e) {
		// 	var windowScroll = window.scrollY || document.getElementsByTagName("html")[0].scrollTop;
		// 	var header = $('#header');
		// 	if (windowScroll >= 550) {
		// 		$(header).find('.dropdown-menu').removeClass('show');
		// 		if (!$(header).hasClass('sticky')) {
		// 			$(header).addClass('sticky');
		// 		}
		// 		$('.moveToTop').addClass('show');
		// 		$(".headerSticky").fadeIn(500);
		// 	} else {
		// 		if ($(header).hasClass('sticky')) {
		// 			$(header).removeClass('sticky');
		// 			$(header).find('.dropdown-menu').removeClass('show');
		// 		}
		// 		$('.moveToTop').removeClass('show');
		// 		$(".headerSticky").fadeOut();

		// 	}
		// }

	}

	private slideLoaded() {
		this.countImagesLoaded++;

		if (this.countImagesLoaded == this.slideBannerImages.length) {

			$('#slider .owl-carousel').owlCarousel({
				items: 1,
				animateOut: 'fadeOutLeft',
				animateIn: 'zoomInRight',
			});

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
}