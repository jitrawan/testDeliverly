import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-show-discount',
  templateUrl: './show-discount.component.html',
  styleUrls: [
    './show-discount.component.css',
    '../../../../assets/css/standard/utility.css'
  ]
})
export class ShowDiscountComponent implements OnInit {

  constructor() { }

  discountItems: discountItem[] = {} as any;
  ngOnInit() {
    this.discountItems = [
      {
        discountId: '1',
        title_name: 'name-1',
        description: 'desc-1',
        image_path: 'https://atkmedia.allticket.com/assets/images/allticket-logo.png'
      },
      {
        discountId: '2',
        title_name: 'name-2',
        description: 'desc-2',
        image_path: 'https://atkmedia.allticket.com/assets/images/allticket-logo.png'
      },
      {
        discountId: '3',
        title_name: 'name-3',
        description: 'desc-3',
        image_path: 'https://atkmedia.allticket.com/assets/images/allticket-logo.png'
      },
      {
        discountId: '4',
        title_name: 'name-4',
        description: 'desc-4',
        image_path: 'https://atkmedia.allticket.com/assets/images/allticket-logo.png'
      },
    ];
    let maxItems = 3;

    setTimeout(() => {
      $('#discount-wrapper .owl-carousel').owlCarousel({
        items: 1,
        loop: false,
        nav: true,
				navText: ['<i class="fa fa-chevron-left mr-1"></i>', '<i class="fa fa-chevron-right ml-1"></i>'],
        animateOut: 'fadeOutLeft',
        animateIn: 'fadeInRight',
        responsive : {
          0 : {items : 1}, 
          480 : {items : 1},
          992 : {items : this.discountItems.length >= maxItems ? maxItems : this.discountItems.length }
        }
      });
    }, 0);
  }
}

interface discountItem {
  discountId: string,
  title_name: string,
  description: string,
  image_path: string,
}
