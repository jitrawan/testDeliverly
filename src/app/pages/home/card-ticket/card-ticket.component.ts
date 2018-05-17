import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CardTickets } from '../../../shared/models/cardTickets';
import { ConstMaster } from '../../../shared/config/ConstMaster';
import { CardTicket } from '../../../shared/models/cardTickets';

@Component({
	selector: 'card-ticket',
	templateUrl: './card-ticket.component.html',
	styleUrls: [ 
		'./card-ticket.component.css',
		'../../../../assets/css/standard/cardticket.css'
	]
})
export class CardTicketComponent implements OnInit {

	@Input() cardData;
	cardTickets: CardTicket;
	placeHolderImg: string = ConstMaster.DEFAULT_IMAGES.ticketCard;
	
	constructor(private router: Router) { }

	ngOnInit() {
		this.cardTickets = this.cardData;
	}

	goToEventInfo(performUri: string, performId?: string) {
		console.log(performUri)
		console.log(performId)
		if(performUri != undefined && performUri != '') {
			this.router.navigate(['/event', performUri]);
		}
	}

}
