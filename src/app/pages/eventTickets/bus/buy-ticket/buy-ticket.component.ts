import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BusService } from '../../../../shared/services/bus.service';
import { SharedService } from '../../../../shared/services/shared-service.service';


@Component({
  selector: 'app-buy-ticket',
  templateUrl: './buy-ticket.component.html',
  styleUrls: ['./buy-ticket.component.css']
})
export class BuyTicketComponent implements OnInit {

  isEnable: boolean = true;
  msgError: string;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private busService: BusService,
    private sharedService: SharedService,
  ) { }

  ngOnInit() {
    this.receiveData();
    this.checkTime();
  }

  receiveData() {
    let receiveData;
    this.sharedService.receiveData.subscribe(data => receiveData = data);
    if (receiveData instanceof URLSearchParams) {
      sessionStorage.setItem('paymentChannel', receiveData.get('paymentChannel'));
      sessionStorage.setItem('ALLTICKET:authToken', receiveData.get('authToken'));
    }
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
