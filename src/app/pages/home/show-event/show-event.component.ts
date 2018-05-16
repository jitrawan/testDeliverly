import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HomeService } from '../../../shared/services/home.service';
import { CardTicket } from '../../../shared/models/cardTickets';
import { ConstMaster } from '../../../shared/config/ConstMaster';
import { Subscription } from 'rxjs';

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
  subscription: Subscription;

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.category = params.get('category');
      this.reInitiateComponent();
    });
  }

  ngOnDestroy() {
		this.subscription.unsubscribe();
  }
  
  reInitiateComponent(){
    this.isLoading = true;
    this.cardTickets = undefined;
    this.displayCategory = undefined;
    
    if(this.subscription != undefined) {
      this.subscription.unsubscribe();
    }

    this.subscription = this.service.getEventCardByType(this.category).subscribe(response => {
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
