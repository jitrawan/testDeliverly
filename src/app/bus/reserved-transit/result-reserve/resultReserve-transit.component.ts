import { Component, OnInit, AfterViewInit, Renderer2 } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from "@angular/router";
import { AlertsService } from '@jaspero/ng2-alerts';

import { ErrorMsgService } from '@atk-service/errorMsg.service';
import { SharedService } from '@atk-service/shared-service.service'
import { BusService } from '@atk-service/bus.service';
import { ErrorMessage } from '@atk-shared/constant/error-message';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import 'owl.carousel';
declare var jQuery: any;

import { UserModel } from '@atk-shared/models/result-reserve/result-reserve-transit/user.model';
import { PaymentMethodModel } from '@atk-shared/models/result-reserve/result-reserve-transit/paymentMethod.model';
import { TransIdModel } from '@atk-shared/models/bus/transaction/transId.model';
import { TicketInvoice } from '@atk-shared/models/bus/transaction/ticketInvoice.model';
import { ResultReserveTransitModel } from '@atk-shared/models/result-reserve/result-reserve-transit/resultReserveTransit.model';
import { ReserveDetailModel } from '@atk-shared/models/purchaseHistory/reserveDetail.model';
import { TransReservToModel } from '@atk-shared/models/payment/transReservTo.model';
import { UserTOModel } from '@atk-shared/models/payment/userTO.model';
import { Constant } from '@atk-shared/constant/constant';
import { BuyTicketComponent } from '@atk-bus/buy-ticket/buy-ticket.component';

@Component({
	selector: 'app-payment',
	templateUrl: './resultReserve-transit.component.html',
	styleUrls: [
		'./resultReserve-transit.component.css',
		'../../../../assets/css/standard/utility.css'
	]
})
export class ResultReserveTransitComponent implements OnInit {

	CASH_DISCOUNT: string = "CASH_DISCOUNT";
	CREDIT_DISCOUNT: string = "CREDIT_DISCOUNT";

	cashDiscountSelectedIndex: number = -1;
	creditDiscountSelectedIndex: number = -1;
	paymentMethodSelected: number = 0;
	showDiscountInput: boolean = false;
	showCreditDiscount: boolean = false;
	displayDialog: boolean = false;

	paymentMethod: boolean = false;
	termCondition: any = [];
	userTo: UserModel;
	resultReserveTransitModel: ResultReserveTransitModel;
	paymentMethodDetail: PaymentMethodModel;
	defaultPaymentMethodDetail: PaymentMethodModel;

	creditFeeLabel: string;
	discountCredit: string;
	showExpireTimeEn: string;
	private alertSettings: any;
	errorMessage: ErrorMessage = new ErrorMessage;
	closeResult: string;
	receiveData: any;
	ticketInvoice: TicketInvoice;
	ticketInvoiceParam: string;
	urlRedirectCSPay: string;
	transId: TransIdModel;
	resultReserveData: ResultReserveTransitModel;
	isShowAllMethods: boolean;
	const = new Constant;
	reserveDetail: ReserveDetailModel;
	isShowLoading: boolean = false;

	constructor(
		private sharedService: SharedService,
		private router: Router,
		private route: ActivatedRoute,
		private renderer: Renderer2,
		private _alert: AlertsService,
		private errorMsgService: ErrorMsgService,
		private modalService: NgbModal,
		private busService: BusService,
		private buyTicketComponent: BuyTicketComponent
	) {
	}

	ngOnInit() {
		this.router.events.subscribe((evt) => {
			if (!(evt instanceof NavigationEnd)) {
				return;
			}
			window.scrollTo(0, 0);
		});

		this.prepareData();

		this.sharedService.receiveData.subscribe(data => this.receiveData = data);
		this.ticketInvoiceParam = this.receiveData.ticketInvoice;
		this.urlRedirectCSPay = this.receiveData.urlRedirect;
		this.transId = this.receiveData.transId;
		this.resultReserveData = this.receiveData.resultReserve;
		this.isShowAllMethods = this.initPaymentMethods();
		this.checkPaymentMethod();
	}

	checkPaymentMethod() {
		if (this.resultReserveData.payOutlet && this.resultReserveData.payCredit) {
			this.paymentMethodDetail = this.resultReserveData.paymentMethod.cashPayment;
			this.defaultPaymentMethodDetail = this.resultReserveData.paymentMethod.cashPayment;
		} else if (this.resultReserveData.payCredit) {
			this.defaultPaymentMethodDetail = this.resultReserveData.paymentMethod.creditPayment;
			this.choosePaymentMethod(1);
		} else {
			this.defaultPaymentMethodDetail = this.resultReserveData.paymentMethod.cashPayment;
			this.choosePaymentMethod(2);
		}
	}

	openModal(content) {
		const modalRef = this.modalService.open(content);
	}

	private getDismissReason(reason: any): string {
		if (reason === ModalDismissReasons.ESC) {
			return 'by pressing ESC';
		} else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
			return 'by clicking on a backdrop';
		} else {
			return `with: ${reason}`;
		}
	}

	prepareData() {
		this.termCondition = [
			`To prevent order cancellation, please make payment by time shown on the payment form.`,
			`Tickets can be collected at Counter Service outlets.`,
			`All goods and Service are non-refundable.`,
			`Please retain the payment receipt for your reference.`,
			`In some case a convenience fee charge, when you payment by credit card.`
		];
	}

	initPaymentMethods() {
		if (this.resultReserveData.payOutlet && this.resultReserveData.payCredit) {
			return true;
		} else {
			return false;
		}
	}

	choosePaymentMethod(paymentMethodIndex: number) {

		if (this.paymentMethodSelected == paymentMethodIndex) {
			this.paymentMethodSelected = 0;
			this.paymentMethodDetail = this.defaultPaymentMethodDetail;
		} else {
			this.paymentMethodSelected = paymentMethodIndex;
			if (paymentMethodIndex == 1) {
				this.paymentMethodDetail = this.resultReserveData.paymentMethod.creditPayment;
			} else if (paymentMethodIndex == 2) {
				this.paymentMethodDetail = this.resultReserveData.paymentMethod.cashPayment;
			}
		}
	}

	onClickPayment(content) {
		if (this.paymentMethodSelected == 0) {
			this.openDialog(this.errorMessage.pleaseSelect + "ช่องทางการชำระเงิน / Please select payment channel");
		} else if ((document.getElementById('checkAgree') as HTMLInputElement).checked == false) {
			this.openDialog('Please click "Terms of Service"');
		} else {
			this.isShowLoading = true;
			if (this.paymentMethodSelected == 1) {
				this.busService.confirmReserveTransit(this.transId.transId, this.receiveData.bookId, this.receiveData.bookCode, 'C').subscribe((res) => {

					if (res.code == this.const.successCode) {
						if (sessionStorage.getItem("paymentChannel") == this.const.WEB_PAYMENT_CHANNEL) {
							// redirect to pay@all
							console.log("--> Redirect to pay@all")
							parent.window.receiveMessage('callconfirm', res.redirectParam);
						} else {
							let urlRedirect = this.urlRedirectCSPay + "&param=" + res.redirectParam;
							window.location.href = urlRedirect;
						}
					} else {
						this.isShowLoading = false;
						this.openDialog(this.errorMsgService.getErrorMsg(res.code));
					}
				},
					(err) => {
						this.isShowLoading = false;
						this.openDialog(this.errorMsgService.getErrorMsg(err.code));
						setTimeout(() => {
							this.buyTicketComponent.checkTime(); 
							this.router.navigate([''], { relativeTo: this.route });
						}, 3000);
					});

			} else if (this.paymentMethodSelected == 2) {
				this.reserveDetail = new ReserveDetailModel();
				this.reserveDetail.userDetail = this.resultReserveData.userDetail;

				var reserveTo = new TransReservToModel();
				reserveTo.reserveId = this.resultReserveData.reserveId;
				reserveTo.transId = this.resultReserveData.transId;
				reserveTo.priceAmt = Number(this.resultReserveData.paymentMethod.cashPayment.billAmount);
				reserveTo.csFee = Number(this.resultReserveData.paymentMethod.cashPayment.csFee);
				reserveTo.endPrice = Number(this.resultReserveData.paymentMethod.cashPayment.totalAmount);
				reserveTo.busPayCode = this.resultReserveData.busPayCode;
				reserveTo.data3 = this.receiveData.bookCode;

				this.reserveDetail.reserveTO = reserveTo;
				this.reserveDetail.status = '1';
				this.reserveDetail.transDetail = this.resultReserveData.transDetail;
				this.reserveDetail.discount = this.resultReserveData.paymentMethod.cashPayment.discountValue;

				if (sessionStorage.getItem("paymentChannel") == this.const.WEB_PAYMENT_CHANNEL) {
					this.openModal(content);
					window.parent.scroll(0, 0);
					this.isShowLoading = false;
				} else {
					let urlRedirect = this.urlRedirectCSPay + "&param=" + this.ticketInvoiceParam;
					window.location.href = urlRedirect;
				}

			}
		}

	}

	onclickBack() {
		this.router.navigate([''], { relativeTo: this.route });
	}

	openDialog(msg) {
		let type: any = "warning";
		this.alertSettings = { overlay: true, overlayClickToClose: false, showCloseButton: true, duration: 100000 };
		this._alert.create(type, msg, this.alertSettings);

		jQuery('html,body', window.parent.document).animate({
			scrollTop: jQuery("#alert-box .jaspero__dialog").offset().top - 100
		}, 300);

	}

}