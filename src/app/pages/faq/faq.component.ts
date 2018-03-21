import { Component, OnInit, ElementRef, ViewChild, Renderer2, AfterContentChecked } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css', '../../../assets/css/standard/layout.css']
})
export class FaqComponent implements OnInit {
  showHowToBuy: boolean;
  showHowToRefund: boolean;
  showHowToPickup: boolean;
  howto: string;

  zone: { id: number, name: string }[] = [
    { "id": 0, "name": "กรุงเทพฯ และปริมณฑล" },
    { "id": 1, "name": "ภาคกลาง" },
    { "id": 2, "name": "ภาคเหนือ" }
  ];

  @ViewChild('howbuy') private howbuy: ElementRef;
  @ViewChild('howrefund') private howrefund: ElementRef;
  @ViewChild('howpickup') private howpickup: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private el: ElementRef,
    private renderer: Renderer2, ) {
  }


  ngOnInit() {
    console.log("zone is" + this.zone);


  }

  ngAfterContentChecked() {
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



