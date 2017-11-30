import { Component, OnInit , AfterViewInit } from '@angular/core';
import { Router , ActivatedRoute , NavigationEnd } from "@angular/router";
import * as underscore from 'underscore';
import 'owl.carousel';
declare var jQuery: any;


@Component({
	selector: 'app-payment',
	templateUrl: './payment.component.html',
	styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

	menuStep: RouteDetail = {
		routeTo: 'booking-review',  displayName: 'booking'
	};

	constMenu: ConstMenu = {
		booking: { routeTo: 'booking-review', displayName: 'booking' },
		payment: { routeTo: 'payment-channel', displayName: 'payment' },
		summary: { routeTo: 'summary-review', displayName: 'summary' }
	};

	constructor(private router: Router , private route: ActivatedRoute) {
		this.route.params.subscribe(params => {
			this.menuStep.routeTo = params.step;
			this.menuStep.displayName = this.getDisplayName(params.step);

			if(this.menuStep.routeTo == this.constMenu.payment.routeTo) {
				this.doPayment();
			}
		});
	}

	ngOnInit() {
		this.router.events.subscribe((evt) => {
			if (!(evt instanceof NavigationEnd)) {
				return;
			}
			window.scrollTo(0, 0);
		});
	}

	ngAfterViewInit() {
		console.log($('#discount'));
	}
	
	doPayment() {

		setTimeout(_ => {

			jQuery('#discount .owl-carousel').owlCarousel({
				items: 1,
				dots: false,
				nav: true,
				navText: ['<i class="fa fa-chevron-left mt-2 mr-1"></i>', '<i class="fa fa-chevron-right mt-2 ml-1"></i>'],
				responsive : {
					0 : {
						items : 1
					},
					480 : {
						items : 2
					},
					768 : {
						items : 3
					}
				}
			});
		});

	}

	getDisplayName(routeName: string) {
		let array = underscore.values(this.constMenu);
		for(let i = 0; i < array.length; i++){
			if(array[i].routeTo === routeName) {
				return array[i].displayName;
			}
		}
	}
	
	changeStep(stepName: string) {
		this.menuStep.routeTo = this.constMenu.payment.routeTo;
		this.menuStep.displayName = this.constMenu.payment.displayName;
		this.router.navigate(['payment/'+stepName]);
	}
}

interface ConstMenu {
	booking: RouteDetail;
	payment: RouteDetail;
	summary: RouteDetail;
}

interface RouteDetail {
	routeTo: string;
	displayName: string;
}