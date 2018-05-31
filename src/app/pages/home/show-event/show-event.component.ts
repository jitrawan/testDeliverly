import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AtkService } from '@atk-service/atk.service';
import { CardTicket } from '@atk-shared/models/cardTickets';
import { ConstMaster } from '@atk-shared/config/ConstMaster';
import { HeaderModel } from '@atk-shared/models/header.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-show-event',
  templateUrl: './show-event.component.html',
  styleUrls: ['./show-event.component.css']
})
export class ShowEventComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private service: AtkService
  ){}

  category: string;
  displayCategory: string;
  cardTickets: CardTicket[];
  isLoading: boolean = true;
  categoryImagePath: string;
  subscription: Subscription;
  header: object[];
  groupKey: string;

  ngOnInit() {
    this.header = JSON.parse(sessionStorage.getItem('headerMenu'));
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
    this.headerHandler();
    
    if(this.subscription != undefined) {
      this.subscription.unsubscribe();
    }
    
    var _self = this;


    for(let i =0; i < this.header.length; i++) {

      if(this.header[i]['dropdownList'] != undefined) {
        var dropdownFilter = this.header[i]['dropdownList'].filter(_el => {
          let split = _el.routeTo.split('/');
          if(split.length > 0 && split[split.length-1] == _self.category) {
            _self.groupKey = _el.groupKey
            return _el;
          }
        });
      }

      if(dropdownFilter != undefined && dropdownFilter.length > 0) {
        break;
      }

      let split = this.header[i]['routeTo'].split('/');
      if(split.length > 0 && split[split.length-1] == _self.category) {
        _self.groupKey = this.header[i]['groupKey'];
        break;
      }
    }

    this.subscription = this.service.getEventCardByType(this.groupKey).subscribe(response => {
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

  headerHandler(emit?) {
		let header = $('#header');

		if (emit) {
			$(header).find('.dropdown-menu.show').removeClass('show');
			if (!$(header).hasClass('sticky')) {
				$(header).addClass('sticky');
			}
		} else {
			if ($(header).hasClass('sticky')) {
				$(header).removeClass('sticky');
				$(header).find('.dropdown-menu.show').removeClass('show');
			}
		}
	}

}
