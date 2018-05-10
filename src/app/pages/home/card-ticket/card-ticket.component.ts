import { Component, OnInit , Input } from '@angular/core';
import { Router } from '@angular/router';
import { CardTickets } from '../../../shared/models/cardTickets';

@Component({
  selector: 'card-ticket',
  templateUrl: './card-ticket.component.html',
  styleUrls: ['./card-ticket.component.css' , '../../../../assets/css/standard/cardticket.css']
})
export class CardTicketComponent implements OnInit {

  cardTicketsRecommend: CardTicket[] = [
		{ performId: '18016', performName: 'EXO PLANET #4 - The ElyXiOn - in BANGKOK', performShowDate: '16 - 18', performShowMonth: 'MAR/2018', image_path: 'https://s3-ap-southeast-1.amazonaws.com/dev.allticketthailand.com/assets/content/18016/SMT18016160120181759ticketCard.jpg' },
		{ performId: '18042', performName: 'What the Fest Music Festival', performShowDate: '16 - 17', performShowMonth: 'JUNE/2018', image_path: 'https://s3-ap-southeast-1.amazonaws.com/dev.allticketthailand.com/assets/content/18042/WTF18042110420181548ticketCard.jpg' },
		{ performId: '18043', performName: 'NCT U (TAEYONGxTEN) FAN MEETING in BANGKOK', performShowDate: '3', performShowMonth: 'JUNE/2018', image_path: 'https://s3-ap-southeast-1.amazonaws.com/dev.allticketthailand.com/assets/content/18043/NCT18043120420181031ticketCard.jpg' },
		{ performId: '17073', performName: 'Event 17073', performShowDate: '31 - 10', performShowMonth: 'Dec/2017', image_path: 'assets/images/bmmf.jpg' }
	];

	cardTicketsHot: CardTicket[] = [
		{ performId: '17074', performName: 'Event 17074', performShowDate: '1 - 10', performShowMonth: 'Jan/2017', image_path: 'assets/images/bmmf.jpg' },
		{ performId: '17075', performName: 'Event 17075', performShowDate: '1 - 10', performShowMonth: 'Jan/2017', image_path: 'assets/images/bmmf.jpg' },
		{ performId: '17076', performName: 'Event 17076', performShowDate: '1 - 10', performShowMonth: 'Jan/2017', image_path: 'assets/images/bmmf.jpg' },
		{ performId: '17077', performName: 'Event 17077', performShowDate: '1 - 10', performShowMonth: 'Jan/2017', image_path: 'assets/images/bmmf.jpg' },
  ];
  
  @Input() cardData;
  @Input() showType;

  cardTickets: CardTickets;
  constructor(private router: Router) { }

  ngOnInit() {
    this.cardTickets = this.cardData;
    console.log(this.cardTickets.hot);
  }

  goEventInfo(performId: string) {
		console.log(performId);
		this.router.navigate(['/event',performId]);
	}
}

interface CardTicket {
	performId: string;
	performName: string;
	performShowDate: string;
	performShowMonth: string;
	image_path: string;
}
