import { Component, OnInit, AfterViewInit, Renderer2 } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from "@angular/router";
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import * as underscore from 'underscore';
declare var jQuery: any;


import { UserTOModel } from '../../shared/models/payment/userTO.model';


@Component({
	selector: 'app-payment',
	templateUrl: './resultReserve-transit.component.html',
	styleUrls: ['./resultReserve-transit.component.css', '../../../assets/css/standard/utility.css']
})
export class ResultReserveTransitComponent implements OnInit {

	CASH_DISCOUNT: string = "CASH_DISCOUNT";
	CREDIT_DISCOUNT: string = "CREDIT_DISCOUNT";

	allowPayOutlet: boolean = false;
	allowPayCredit: boolean = false;
	cashDiscountSelectedIndex: number = -1;
	creditDiscountSelectedIndex: number = -1;
	paymentMethodSelected: number = -1;
	showDiscountInput: boolean = false;
	showCreditDiscount: boolean = false;

	paymentMethod: boolean = false;
	userTo: UserTOModel;
	cashDiscount: DiscountList[] = [
		{
			discountNo: 'MCARD',
			img_path: '../../assets/images/discount/mcard.png',
			title_discount: 'M Card',
			desc_discount: 'รหัสส่วนลด สมาชิกบัตร M Card ของ The Mall รับส่วนลด 10%',
			discount_code: {
				discount_name: 'MCARD'
			}
		},
		{
			discountNo: 'DTAC',
			img_path: '../../assets/images/discount/dtac.png',
			title_discount: 'DTAC REWARD',
			desc_discount: 'กด *123*222# เพื่อรับส่วนลด 200 บาทสำหรับสมาชิก Dtac Silver ขึ้นไป'
		},
		{
			discountNo: 'TRUEH',
			img_path: '../../assets/images/discount/trueh.png',
			title_discount: 'TRUE MOVE H',
			desc_discount: 'กด *142*10# สำหรับสมาชิกรายเดือนรับส่วนลด 100 บาท'
		},
		{
			discountNo: 'AIS',
			img_path: '../../assets/images/discount/ais.png',
			title_discount: 'Senenade Privillage',
			desc_discount: 'สำหรับลูกค้า AIS SERENADE ตั้งแต่ GOLD ขึ้นไปรับส่วนลด 300 บาท',
			discount_code: {
				discount_name: 'AIS SERENADE'
			}
		}
	];

	creditDiscount: DiscountList[] = [
		{
			discountNo: 'KBANK',
			img_path: '../../assets/images/discount/kbank.png',
			title_discount: 'KBANK CARD',
			desc_discount: 'Cash Back สูงสุด 6% เมื่อชำระสินค้ามากกว่า 1000 บาท'
		},
		{
			discountNo: 'KS-2X',
			img_path: '../../assets/images/discount/krungsri.png',
			title_discount: '2X Points',
			desc_discount: 'รับแต้มสะสมเพิ่มขึ้น 2 เท่าจากปกติเมื่อชำระสินค้ามากกว่า 500 บาทขึ้นไป'
		},
		{
			discountNo: 'scb-3m',
			img_path: '../../assets/images/discount/scb.png',
			title_discount: 'แบ่งจ่าย 3 เดือน',
			desc_discount: 'แบ่งจ่ายชำระ 3 เดือน 0% เมื่อชำระสินค้ายอดรวมตั้งแต่ 6000 บาทขึ้นไป'
		},
		{
			discountNo: 'ktc-cb',
			img_path: '../../assets/images/discount/ktc.png',
			title_discount: 'KTC CASH BACK',
			desc_discount: 'รับเครดิตเงินคืนสูงสุด 3% เมื่อชำระสินค้ายอดรวม 800 บาทขึ้นไป'
		}
	];

	creditFeeLabel: string;
	discountCredit: string;
	priceAmt: number = 0;
	csFee: number = 0;
	creditFee: number = 15;
	endPrice: number = 0;
	showExpireTimeEn: string;
	reserveId: string = '810018043400168704';
	transDetail: string = 'เที่ยวไป : จุดจอด อ.คลองท่อม ไป กรุงเทพ(สายใต้ใหม่) วันที่ 15/03/2018 เวลา 16:00 น.';
	performType: string;

	constructor(
		private router: Router, 
		private route: ActivatedRoute, 
		private renderer: Renderer2,
		private modalService: NgbModal) {
	}

	ngOnInit() {
		this.router.events.subscribe((evt) => {
			if (!(evt instanceof NavigationEnd)) {
				return;
			}
			window.scrollTo(0, 0);
		});

		this.allowPayOutlet = true;
		this.allowPayCredit = true;

		this.prepareData();

		// this.renderer.addClass(this.navSideBar.nativeElement, 'show');
	}

	openModal(content) {
		this.modalService.open(content);
	}
	
	prepareData() {

		this.userTo = new UserTOModel;
		this.userTo.firstname = 'burin';
		this.userTo.lastname = 'sangwan';
		this.userTo.email = 'burinsan@gosoft.co.th';
		this.userTo.telephone = '0851992697';
		this.userTo.cardNumber = '1234567890987';


		this.performType = "concert";
	}

	ngAfterViewInit() {
		// var paymentSelection = document.querySelectorAll('.paymentWrapper');
		// if(paymentSelection.length <= 1) {
		// 	console.log(paymentSelection)
		// 	this.renderer.removeAttribute(paymentSelection[0],'class');
		// }
		// console.log(paymentSelection)
	}

	intitialPaymentStep() {
		setTimeout(_ => {
			if ($('#discountCashSlider').length > 0) {
				jQuery('#discountCashSlider').owlCarousel({
					items: 1,
					nav: true,
					mouseDrag: false,
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
						}
					}
				});
			}
		});
	}

	discountSelected(index: number, discountCode: string, discountType: string) {

		if (discountType === this.CASH_DISCOUNT) {
			if (this.cashDiscountSelectedIndex === index) {
				this.clearDiscountInput();
				return;
			} else {
				this.cashDiscountSelectedIndex = index;
			}

			if (this.cashDiscount[index].discount_code == null) {
				this.showDiscountInput = false;
			} else {
				this.showDiscountInput = true;
			}
		} else {
			this.creditDiscountSelectedIndex = index;
		}

	}

	clearDiscountInput() {
		this.cashDiscountSelectedIndex = -1;
		this.showDiscountInput = false;
	}

	useCashDiscount() {
		// Check discount code in this method...
		this.paymentMethod = true;
	}

	notUseDiscount() {
		this.paymentMethod = true;
		this.clearDiscountInput();
	}

	choosePaymentMethod(paymentMethodIndex: number) {

		if(this.paymentMethodSelected < 0) {
			this.scrollTo('#term-condition');
		}
		
		if (this.paymentMethodSelected === paymentMethodIndex) {
			this.paymentMethodSelected = 0;
		} else {
			this.paymentMethodSelected = paymentMethodIndex;
		}

		// if(paymentMethodIndex == 2) {
		// 	this.showCreditDiscount = true;

		// 	setTimeout(_ => {

		// 		jQuery('#creditDiscount .owl-carousel').owlCarousel({
		// 			items: 1,
		// 			nav: true,
		// 			mouseDrag: false,
		// 			navText: ['<i class="fa fa-chevron-left mt-2 mr-1"></i>', '<i class="fa fa-chevron-right mt-2 ml-1"></i>'],
		// 			responsive : {
		// 				0 : {
		// 					items : 1
		// 				},
		// 				480 : {
		// 					items : 2
		// 				},
		// 				768 : {
		// 					items : 3
		// 				}
		// 			}
		// 		});
		// 	});
		// } else {
		// 	this.showCreditDiscount = false;
		// }
	}

	onClickPayment(){
		
	}

	scrollTo(target) {
        jQuery('html,body').stop().delay(200).animate({
            scrollTop: jQuery(target).offset().top - 200
        }, 1000);
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

interface DiscountList {

	discountNo: string;
	img_path: string;
	title_discount: string;
	desc_discount: string;
	discount_code?: {
		discount_name: string,
	}
}