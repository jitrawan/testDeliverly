import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HomeService } from '../../../shared/services/home.service';
import { CardTicket } from '../../../shared/models/cardTickets';
import { ConstMaster } from '../../../shared/config/ConstMaster';

@Component({
  selector: 'app-show-event',
  templateUrl: './show-event.component.html',
  styleUrls: ['./show-event.component.css']
})
export class ShowEventComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private service: HomeService
  ){}

  category: string;
  displayCategory: string;
  cardTickets: CardTicket[];
  isLoading: boolean = true;
  categoryImagePath: string;

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.category = params.get('category');
      this.reInitiateComponent();
    });
  }

  reInitiateComponent(){
    this.isLoading = true;
    this.cardTickets = undefined;
    this.displayCategory = undefined;

    this.service.getEventCardByType(this.category).subscribe(response => {
      if(response['success'] == true && response['code'] == 100) {
        
        if(Object.keys(response['data']).length > 0 && response['data']['event']['items'].length > 0) {
          this.cardTickets = response['data']['event']['items'];
          this.displayCategory = this.category.toUpperCase();
          this.categoryImagePath = ConstMaster.S3_PATH+'/assets/images/'+this.category+'.png';
        }
        
        console.log("response ", response)
        console.log(this.cardTickets)
      }

      this.isLoading = false;
    });
  }

}
