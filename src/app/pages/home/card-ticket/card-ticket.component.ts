import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CardTickets } from '@atk-shared/models/cardTickets';
import { ConstMaster } from '@atk-shared/config/ConstMaster';
import { CardTicket } from '@atk-shared/models/cardTickets';
import { SharedService } from '@atk-service/shared-service.service';

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
	
	constructor(private router: Router, private sharedService: SharedService) {

	}

	ngOnInit() {
		this.cardTickets = this.cardData;
	}

	goToEventInfo(cardTicket: CardTicket) {
		if(cardTicket == undefined || cardTicket.performUri == undefined) {
			return;
		}
		this.sharedService.sendData(cardTicket.id);
		this.router.navigate(['/event', cardTicket.performUri]);
	}

	goToEventInfoFromBanner(performUri: string, performId: string) {
		this.sharedService.sendData(performId);
		this.router.navigate(['/event', performUri]);
	}

}
