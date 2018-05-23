import { Component, OnInit, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import 'owl.carousel';
import { getParentRenderElement } from '@angular/core/src/view/util';
declare var $: any;
// import * as $ from 'jquery';

@Component({
  selector: 'app-discount',
  templateUrl: './discount.component.html',
  styleUrls: ['./discount.component.css',
    './../../../assets/css/standard/layout.css',
    './../../../assets/css/standard/utility.css']
})
export class DiscountComponent implements OnInit {

  @ViewChild('itemDiscount') private itemDiscount: ElementRef;
  @ViewChild('itemDiscount2') private itemDiscount2: ElementRef;
  isCheck: String
  // discountList = new Array();

  discountList = [
    { id: 1, title: 'S4P3', desc: 'ซื้อ 4 จ่าย 3' , imgUrl: '//atkmedia.allticket.com/images/discount/S4P3.jpg' },
    { id: 2, title: 'PTT Blue Card', desc: 'แสดงบัตร PTT BLUE CARD รับส่วนลด 25% (6 ใบต่อ 1 ครั้งลดซ้ำได้)', imgUrl: "//atkmedia.allticket.com/images/discount/GT_BlueCard.jpg " }
  ];

  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    private router: Router, ) {
  }

  ngOnInit() {
    this.generateDiscountSlide();
  }

  selectDiscount(id: String) {
    this.isCheck = id;
    if(id == "1"){
    this.renderer.addClass(this.itemDiscount2.nativeElement, 'blur');
    this.renderer.removeClass(this.itemDiscount.nativeElement, 'blur');
    }else{
      this.renderer.removeClass(this.itemDiscount2.nativeElement, 'blur');
      this.renderer.addClass(this.itemDiscount.nativeElement, 'blur');
    }
  }

  generateDiscountSlide() {
    $('.owl-carousel').owlCarousel({
      loop: false,
      items: 1,
      dots: false,
      nav: true,
      navText: ['<i class="fa fa-chevron-left mt-2 mr-1"></i>', '<i class="fa fa-chevron-right mt-2 ml-1"></i>'],
      responsive: {
        0: {
          items: 1
        },
        480: {
          items: 2
        }
      }
    });
  }

  goDiscountDetail() {
    this.router.navigate(['/discount-detail']);
  }

  goResultReserve() {
    this.router.navigate(['/resultReserve']);
  }
}

