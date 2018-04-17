import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-discount-detail',
  templateUrl: './discount-detail.component.html',
  styleUrls: ['./discount-detail.component.css',
    './../../../assets/css/standard/layout.css',
    './../../../assets/css/standard/utility.css']
})
export class DiscountDetailComponent implements OnInit {

  constructor(private router: Router, ) { }

  ngOnInit() {
  }

  goChangeDiscount() {
    this.router.navigate(['/discount']);
  }

  goResultReserve() {
    this.router.navigate(['/resultReserve']);
  }

}
