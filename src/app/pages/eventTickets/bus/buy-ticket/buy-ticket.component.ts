import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BusService } from '../../../../shared/services/bus.service';

@Component({
  selector: 'app-buy-ticket',
  templateUrl: './buy-ticket.component.html',
  styleUrls: ['./buy-ticket.component.css']
})
export class BuyTicketComponent implements OnInit {

  isEnable: boolean = true;
  msgError: string;
  // public static updateList: Subject<boolean> = new Subject();
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private busService: BusService
  ) { }

  ngOnInit() {
    this.checkTime();
  }

  public checkTime() {
    this.busService.checkAllowReserve().subscribe((res) => {
      if (res.code == 0) {
        this.isEnable = true;
        this.router.navigate(['/selectDestination'], { relativeTo: this.route });
      } else {
        this.isEnable = false;
        this.msgError = res.msg;
      }
    });
  }


}
