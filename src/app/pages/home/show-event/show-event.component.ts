import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HomeService } from '../../../shared/services/home.service';
import { CardTicket } from '../../../shared/models/cardTickets';

@Component({
  selector: 'app-show-event',
  templateUrl: './show-event.component.html',
  styleUrls: ['./show-event.component.css']
})
export class ShowEventComponent implements OnInit {

  constructor(private route: ActivatedRoute, private service: HomeService) { }

  genre: string;
  displayGenre: string;
  cardTickets: CardTicket[];

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.genre = params.get('genre');
    });

    this.service.getEventCardByType(this.genre).subscribe(response => {
      if(response['success'] == true && response['code'] == 100) {
        
        if(response['data']['event']['items'].length > 0) {
          this.cardTickets = response['data']['event']['items'];
          this.displayGenre = this.genre.toUpperCase();
        }
        
        console.log("response ", response)
        console.log(this.cardTickets)
      }
    });
  }

}
