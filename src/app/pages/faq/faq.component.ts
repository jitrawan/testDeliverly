import { Component, OnInit, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {
  showHowToBuy: boolean;
  showHowToRefund: boolean;
  showHowToPickup: boolean;
  howto: string;

  @ViewChild('howbuy') private howbuy: ElementRef;
  @ViewChild('howrefund') private howrefund: ElementRef;
  @ViewChild('howpickup') private howpickup: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private el: ElementRef,
    private renderer: Renderer2, ) {
  }


  ngOnInit() {

    this.howto = this.route.snapshot.params.howto;

    if (this.howto === 'buy') {
      this.showBuy()
    } else if (this.howto === 'refund') {
      this.showRefund()
    } else if (this.howto === 'pickup') {
      this.showPickup()
    }

  }

  unActive() {
    this.renderer.removeClass(this.howbuy.nativeElement, 'menuActive');
    this.renderer.removeClass(this.howrefund.nativeElement, 'menuActive');
    this.renderer.removeClass(this.howpickup.nativeElement, 'menuActive');
  }

  showBuy() {
    this.showHowToRefund = false;
    this.showHowToPickup = false
    this.showHowToBuy = true
    this.unActive();
    this.renderer.addClass(this.howbuy.nativeElement, 'menuActive');
  }

  showRefund() {
    this.showHowToBuy = false
    this.showHowToPickup = false
    this.showHowToRefund = true;
    this.unActive();
    this.renderer.addClass(this.howrefund.nativeElement, 'menuActive');
  }

  showPickup() {
    this.showHowToPickup = true;
    this.showHowToBuy = false;
    this.showHowToRefund = false;
    this.unActive();
    this.renderer.addClass(this.howpickup.nativeElement, 'menuActive');
  }


}
