import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CardTickets } from '../../../shared/models/cardTickets';

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
	placeHolderImg: string = "https://atkmedia.allticket.com/assets/images/placeholder/place-holder-410x600.jpg";
	
	constructor(private router: Router) { }

	ngOnInit() {
		this.cardTickets = this.cardData;
	}

	goToEventInfo(performId: string) {
		this.router.navigate(['/event', performId]);
	}

}

interface CardTicket {
	performId: string;
	performName: string;
	performShowDate: string;
	performShowMonth: string;
	image_path: string;
}
