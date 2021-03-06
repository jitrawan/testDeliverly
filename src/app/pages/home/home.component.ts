import { Component, OnInit, AfterViewInit , HostListener } from '@angular/core';
import { Router , NavigationEnd } from '@angular/router';
import { EventBanner } from '../../shared/models/eventBanner.model';
import { ConstMaster } from '../../shared/config/ConstMaster';
import { HomeService } from '../../shared/services/home.service';
import * as underscore from 'underscore';
import 'owl.carousel';
declare var jQuery: any;

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: [ './home.component.css' ,
		'../../../assets/css/standard/cardticket.css' ]
})
export class HomeComponent implements OnInit {

	private countImagesLoaded = 0;
	S3_CONTEXT: string = ConstMaster.S3_ENDPOINT.url;
	screenWidth: number;
	screenType: string;
	slideBannerImages: EventBanner[];

	cardTicketsRecommend: CardTicket[] = [
		{ performId: '17070', performName: 'Event 17070', performShowDate: '31 - 10', performShowMonth: 'Dec/2017', image_path: 'assets/images/bmmf.jpg' },
		{ performId: '17071', performName: 'Event 17071', performShowDate: '31 - 10', performShowMonth: 'Dec/2017', image_path: 'assets/images/bmmf.jpg' },
		{ performId: '17072', performName: 'Event 17072', performShowDate: '31 - 10', performShowMonth: 'Dec/2017', image_path: 'assets/images/bmmf.jpg' },
		{ performId: '17073', performName: 'Event 17073', performShowDate: '31 - 10', performShowMonth: 'Dec/2017', image_path: 'assets/images/bmmf.jpg' }
	];

	cardTicketsHot: CardTicket[] = [
		{ performId: '17074', performName: 'Event 17074', performShowDate: '1 - 10', performShowMonth: 'Jan/2017', image_path: 'assets/images/bmmf.jpg' },
		{ performId: '17075', performName: 'Event 17075', performShowDate: '1 - 10', performShowMonth: 'Jan/2017', image_path: 'assets/images/bmmf.jpg' },
		{ performId: '17076', performName: 'Event 17076', performShowDate: '1 - 10', performShowMonth: 'Jan/2017', image_path: 'assets/images/bmmf.jpg' },
		{ performId: '17077', performName: 'Event 17077', performShowDate: '1 - 10', performShowMonth: 'Jan/2017', image_path: 'assets/images/bmmf.jpg' },
	];

	cardShowAll: CardTicket[] = [
		{ performId: '17074', performName: 'Event 17074', performShowDate: '1 - 10', performShowMonth: 'Jan/2017', image_path: 'assets/images/bmmf.jpg' },
		{ performId: '17075', performName: 'Event 17075', performShowDate: '1 - 10', performShowMonth: 'Jan/2017', image_path: 'assets/images/bmmf.jpg' },
		{ performId: '17076', performName: 'Event 17076', performShowDate: '1 - 10', performShowMonth: 'Jan/2017', image_path: 'assets/images/bmmf.jpg' },
		{ performId: '17077', performName: 'Event 17077', performShowDate: '1 - 10', performShowMonth: 'Jan/2017', image_path: 'assets/images/bmmf.jpg' },
		{ performId: '17078', performName: 'Event 17078', performShowDate: '1 - 10', performShowMonth: 'Jan/2017', image_path: 'assets/images/bmmf.jpg' },
		{ performId: '17079', performName: 'Event 17079', performShowDate: '1 - 10', performShowMonth: 'Jan/2017', image_path: 'assets/images/bmmf.jpg' },
		{ performId: '17080', performName: 'Event 17080', performShowDate: '1 - 10', performShowMonth: 'Jan/2017', image_path: 'assets/images/bmmf.jpg' },
	];
	constructor( private router: Router , private homeService: HomeService ) { 
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
			this.slideBannerImages = response['data'];
			this.getScreenType();
        });
		
	}

	ngAfterViewInit() {
		// console.log(jQuery('#slider'));
	}

	getScreenType() {

		for(let breakpoint of ConstMaster.imageBreakpoint) {
			if(this.screenWidth < breakpoint.breakpoint) {
				this.screenType = breakpoint.beakpointName+"/";
				break;
			}
		}
	}
	
	slideLoaded() {
		this.countImagesLoaded++;

		if(this.countImagesLoaded == this.slideBannerImages.length) {

			jQuery('#slider .owl-carousel').owlCarousel({
				items: 1,
				animateOut: 'fadeOutLeft',
				animateIn: 'zoomInRight',
			});
			
			jQuery('#sliderCard .owl-carousel').owlCarousel({
				loop : true,
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
					},
					992 : {
						items : 4
					},
					1366 : {
						items : 5
					}
				}
			});
		}
		
	}

	goEventInfo(performId:string){
		this.router.navigate(['/eventInfo']);
	}
}

interface CardTicket {
	performId: string;
	performName: string;
	performShowDate: string;
	performShowMonth: string;
	image_path: string;
}