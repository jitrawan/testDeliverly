import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-payment',
	templateUrl: './payment.component.html',
	styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

	menuStep: string;

	constMenu: ConstMenu = {
		booking: 'booking',
		payment: 'payment',
		summary: 'summary'
	};

	constructor() { }

	ngOnInit() {
		this.menuStep = this.constMenu.booking;
	}

	nextStep(stepName: string) {
		
	}
}

interface ConstMenu {
	booking: string;
	payment: string;
	summary: string;
}