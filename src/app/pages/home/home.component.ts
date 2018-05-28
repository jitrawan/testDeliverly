import { Component, OnInit, AfterViewInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { EventBanner } from '@atk-shared/models/eventBanner.model';
import { CardTicket } from '@atk-shared/models/cardTickets';
import { CardTickets } from '@atk-shared/models/cardTickets';
import { ConstMaster } from '@atk-shared/config/ConstMaster';
import { AtkService } from '@atk-service/atk.service';
import { CardTicketComponent } from './card-ticket/card-ticket.component';
import { Subscription } from 'rxjs';
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
	slideBannerImages: EventBanner[];
	cardTicketSlide: CardTicket[] = [];
	cardTicketHot: CardTicket[];
	cardTicketRec: CardTicket[];
	cardTickets: CardTickets;
	isSlideLoaded: boolean = false;
	placeHolderImg: string = ConstMaster.DEFAULT_IMAGES.ticketCard;
	subscription: Subscription;

	constructor(private router: Router, private atkService: AtkService, private el: ElementRef) {}

	ngOnInit() {
		this.router.events.subscribe((evt) => {
			if (!(evt instanceof NavigationEnd)) {
				return;
			}
			window.scrollTo(0, 0);
		});

		this.subscription = this.atkService.fetchHomeData().subscribe(response => {

			if (response['success'] == true && response['code'] == 100 && Object.keys(response['data']).length > 0) {
				this.mappingHomePage(response['data'],false);
				sessionStorage.setItem(ConstMaster.STORAGE_KEY.HOMEPAGE,JSON.stringify(response['data']));
			} else {
				
				if(this.mappingHomePage('',true) === false) {
					console.log('No data in storage');
				}
			}

		},error => {
			if(this.mappingHomePage('',true) === false) {
				console.log('No data in storage');
			}
		});

	}

	mappingHomePage(data: any, getFromStorage: boolean) {

		if (getFromStorage) {
			let homePage = sessionStorage.getItem(ConstMaster.STORAGE_KEY.HOMEPAGE);
			if (homePage != null || homePage != undefined) {
				data = JSON.parse(homePage);
			} else {
				return false;
			}
		}

		this.slideBannerImages = data['banner_']['items'];
		this.cardTicketSlide = data['all_']['items'];
		this.cardTicketHot = data['hot_']['items'];
		this.cardTicketRec = data['rec_']['items'];
		this.cardTickets = {
			rec: this.cardTicketRec,
			hot: this.cardTicketHot
		}

		return true;
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

	goToEventInfoFromBanner(performUri: string, performId: string){
		this.cardTicketComponent.goToEventInfoFromBanner(performUri,performId);
	}

	goToEventInfo(cardTicket: CardTicket) {
		this.cardTicketComponent.goToEventInfo(cardTicket);
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
				navText: ['<i class="fa fa-chevron-left mr-1"></i>', '<i class="fa fa-chevron-right"></i>'],
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

	headerHandler(emit) {

		let header = $('#header');
		if (emit) {
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