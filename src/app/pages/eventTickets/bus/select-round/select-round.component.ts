import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-select-round',
  templateUrl: './select-round.component.html',
  styleUrls: ['./select-round.component.css', '../buy-ticket/buy-ticket.component.css']
})
export class SelectRoundComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {

  }

  goNextPage(){
    // parent.window.receiveMessage('checkAuthen');
    this.router.navigate(['../selectSeat'], { relativeTo: this.route });
  }
}
