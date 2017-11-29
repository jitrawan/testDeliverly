import { Component, OnInit, AfterViewInit } from '@angular/core';
<<<<<<< HEAD
import { Router, NavigationEnd } from '@angular/router';
=======
import { Router , NavigationEnd } from '@angular/router';
>>>>>>> e96048dc94ba14ceee7555de9d1fd9dac6369179
import 'owl.carousel';
declare var jQuery: any;

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
<<<<<<< HEAD
	styleUrls: ['./home.component.css',
		'../../../assets/css/standard/cardticket.css']
=======
	styleUrls: [ './home.component.css' ,
		'../../../assets/css/standard/cardticket.css' ]
>>>>>>> e96048dc94ba14ceee7555de9d1fd9dac6369179
})
export class HomeComponent implements OnInit {

	private countImagesLoaded = 0;
	private slideBannerImages: Image[] = [
		{ pathName: 'https://s3-ap-southeast-1.amazonaws.com/haball-assets/Slide+All+Ticket-01.png', imageName: 'alt' },
		{ pathName: 'https://s3-ap-southeast-1.amazonaws.com/haball-assets/Slide+All+Ticket-02.png', imageName: 'alt' },
		{ pathName: 'https://s3-ap-southeast-1.amazonaws.com/haball-assets/Slide+All+Ticket-03.png', imageName: 'alt' },
		{ pathName: 'https://s3-ap-southeast-1.amazonaws.com/haball-assets/Slide+All+Ticket-04.png', imageName: 'alt' },
		{ pathName: 'https://s3-ap-southeast-1.amazonaws.com/haball-assets/Slide+All+Ticket-05.png', imageName: 'alt' }
	];

	private cardTicketsRecommend: CardTicket[] = [
		{ performId: '17070', performName: 'Event 17070', performShowDate: '31 - 10', performShowMonth: 'Dec/2017', image_path: 'assets/images/bmmf.jpg' },
		{ performId: '17071', performName: 'Event 17071', performShowDate: '31 - 10', performShowMonth: 'Dec/2017', image_path: 'assets/images/bmmf.jpg' },
		{ performId: '17072', performName: 'Event 17072', performShowDate: '31 - 10', performShowMonth: 'Dec/2017', image_path: 'assets/images/bmmf.jpg' },
		{ performId: '17073', performName: 'Event 17073', performShowDate: '31 - 10', performShowMonth: 'Dec/2017', image_path: 'assets/images/bmmf.jpg' }
	];

	private cardTicketsHot: CardTicket[] = [
		{ performId: '17074', performName: 'Event 17074', performShowDate: '1 - 10', performShowMonth: 'Jan/2017', image_path: 'assets/images/bmmf.jpg' },
		{ performId: '17075', performName: 'Event 17075', performShowDate: '1 - 10', performShowMonth: 'Jan/2017', image_path: 'assets/images/bmmf.jpg' },
		{ performId: '17076', performName: 'Event 17076', performShowDate: '1 - 10', performShowMonth: 'Jan/2017', image_path: 'assets/images/bmmf.jpg' },
		{ performId: '17077', performName: 'Event 17077', performShowDate: '1 - 10', performShowMonth: 'Jan/2017', image_path: 'assets/images/bmmf.jpg' },
	];

	private cardShowAll: CardTicket[] = [
		{ performId: '17074', performName: 'Event 17074', performShowDate: '1 - 10', performShowMonth: 'Jan/2017', image_path: 'assets/images/bmmf.jpg' },
		{ performId: '17075', performName: 'Event 17075', performShowDate: '1 - 10', performShowMonth: 'Jan/2017', image_path: 'assets/images/bmmf.jpg' },
		{ performId: '17076', performName: 'Event 17076', performShowDate: '1 - 10', performShowMonth: 'Jan/2017', image_path: 'assets/images/bmmf.jpg' },
		{ performId: '17077', performName: 'Event 17077', performShowDate: '1 - 10', performShowMonth: 'Jan/2017', image_path: 'assets/images/bmmf.jpg' },
		{ performId: '17078', performName: 'Event 17078', performShowDate: '1 - 10', performShowMonth: 'Jan/2017', image_path: 'assets/images/bmmf.jpg' },
		{ performId: '17079', performName: 'Event 17079', performShowDate: '1 - 10', performShowMonth: 'Jan/2017', image_path: 'assets/images/bmmf.jpg' },
		{ performId: '17080', performName: 'Event 17080', performShowDate: '1 - 10', performShowMonth: 'Jan/2017', image_path: 'assets/images/bmmf.jpg' },
	];
<<<<<<< HEAD
	constructor(private router: Router) { }
=======
	constructor( private router: Router ) { }
>>>>>>> e96048dc94ba14ceee7555de9d1fd9dac6369179

	ngOnInit() {
		this.router.events.subscribe((evt) => {
			if (!(evt instanceof NavigationEnd)) {
				return;
			}
			window.scrollTo(0, 0);
		});
	}

	ngAfterViewInit() {
		// console.log(jQuery('#slider'));
	}

	slideLoaded() {
		this.countImagesLoaded++;

<<<<<<< HEAD
		if (this.countImagesLoaded == this.slideBannerImages.length) {
=======
		if(this.countImagesLoaded == this.slideBannerImages.length) {
>>>>>>> e96048dc94ba14ceee7555de9d1fd9dac6369179

			jQuery('#slider .owl-carousel').owlCarousel({
				items: 1,
				animateOut: 'fadeOutLeft',
				animateIn: 'zoomInRight',
			});
<<<<<<< HEAD

			jQuery('#sliderCard .owl-carousel').owlCarousel({
				items: 5,
				dots: false,
				nav: true,
				navText: ['<i class="fa fa-chevron-left"></i>', '<i class="fa fa-chevron-right"></i>'],
			});
		}

	}

	goEventInfo(performId: string) {
=======
			
			jQuery('#sliderCard .owl-carousel').owlCarousel({
				loop : true,
				items: 1,
				dots: false,
				nav: true,
				navText: ['<i class="fa fa-chevron-left"></i>', '<i class="fa fa-chevron-right"></i>'],
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
					1366 : {
						items : 5
					}
				}
			});
		}
		
	}

	goEventInfo(performId:string){
>>>>>>> e96048dc94ba14ceee7555de9d1fd9dac6369179
		this.router.navigate(['/eventInfo']);
	}
}


interface Image {
	pathName: string;
	imageName?: string;
	breakpoint?: string;
}

interface CardTicket {
	performId: string;
	performName: string;
	performShowDate: string;
	performShowMonth: string;
	image_path: string;
}
