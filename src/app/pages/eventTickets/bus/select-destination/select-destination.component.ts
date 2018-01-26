import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AvailableTrip } from '../../../../shared/models/bus/availableTripSearch.model';
import { ErrorMessage } from '../../../../shared/constant/error-message';
import { BusService } from '../../../../shared/services/bus.service';
import { ProvinceModel } from '../../../../shared/models/bus/province.model';
import { ParkModel } from '../../../../shared/models/bus/park.model';

@Component({
  selector: 'app-select-destination',
  templateUrl: './select-destination.component.html',
  styleUrls: ['./select-destination.component.css'],
  providers: [BusService]
})
export class SelectDestinationComponent implements OnInit {
   availableTripSeach: AvailableTrip = new AvailableTrip;
   errorMessage: ErrorMessage = new ErrorMessage;
   provinceList: ProvinceModel[];
   arrvProvinceList: ProvinceModel[];
   parkList: ParkModel[];
   dptrParkList: ParkModel[] = [];
   arrvParkList: ParkModel[] = [];
   returnDate: Date = new Date(Date.now());
   departDate: Date = new Date(Date.now());
   selectedDptrProvince: ProvinceModel;
   selectedDptrPark: ParkModel;
   selectedArrvProvince: ProvinceModel;
   selectedArrvPark: ParkModel;
   selectedTripType: string;
   isReturnDate: boolean = true;
   selectedNumOfPerson: number;

  constructor(
    private busService: BusService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    // document.domain = 'http://localhost:8080/';
    this.getProvinceList();
    this.getParkList();
    this.selectedTripType = "R";
    this.selectedNumOfPerson = 0;
    console.log('>>> load')
    window.addEventListener('message', function (event) {
      console.log('event >>>', event)
    });

    
  }


   getProvinceList() {
    this.busService.getMasProvince().subscribe((res) => {
      this.provinceList = res.data.map((obj: any) => {
        return {
          id: obj.id,
          desc: obj.desc
        };
      });
    });
  }

   getParkList() {
    this.busService.getMasPark().subscribe((res) => {
      this.parkList = res.data.map((obj: any) => {
        return {
          id: obj.id,
          nameTh: obj.nameTh,
          nameEn: obj.nameEn,
          park: obj.park,
          picking: obj.picking,
          updateDtm: obj.updateDtm,
          province: obj.province
        };
      });
    });
  }

   selectDprtProvince(event) {
    this.selectedDptrProvince = event;
    this.selectedDptrPark = undefined;
  }

   selectArrvProvince(event) {
    this.selectedArrvProvince = event;
    this.selectedArrvPark = undefined;

  }
   findDprtParkList() {
    if (this.selectedDptrProvince != undefined) {
      var listPark = this.parkList.filter(item =>
        item.province.id === this.selectedDptrProvince.id);
      if (listPark.length > 0) {
        this.dptrParkList = listPark;
      }
    }
  }

   findArrvParkList() {
    if (this.selectedArrvProvince != undefined) {
      var listPark = this.parkList.filter(item =>
        item.province.id === this.selectedArrvProvince.id);
      if (listPark.length > 0) {
        this.arrvParkList = listPark;
      }
    }
  }

   condition = [
    '- สามารถจองตั๋ว ก่อนเวลาเดินทางของเที่ยววิ่ง 3 ชม.',
    '- วันที่เดินทางไป และกลับ มีระยะเวลาห่างกันไม่เกิน 30 วัน',
    '- สามารถซื้อตั๋วล่วงหน้าได้ 90 วัน'
  ];

   selectType(event) {
    if (event.target.value == "O") {
      this.selectedTripType = "O";
    } else {
      this.selectedTripType = "R";
    }
  }

   onNextPage() {
    console.log('submit');
    this.validateDate();
  }

   validateDate() {
    if (this.selectedTripType == undefined) {
      alert(this.errorMessage.pleaseSelect + "ประเภทการเดินทาง เที่ยวเดียว หรือ ไปกลับ");
    } else if (this.selectedDptrProvince == undefined) {
      alert(this.errorMessage.pleaseSelect + "จังหวัดต้นทาง");
    } else if (this.selectedDptrPark == undefined) {
      alert(this.errorMessage.pleaseSelect + "จุดขึ้นรถ");
    } else if (this.selectedArrvProvince == undefined) {
      alert(this.errorMessage.pleaseSelect + "จังหวัดปลายทาง");
    } else if (this.selectedArrvPark == undefined) {
      alert(this.errorMessage.pleaseSelect + "จุดลงรถ");
    } else if (this.selectedTripType == "R" && this.returnDate < this.departDate) {
      alert(this.errorMessage.pleaseSelect + "วันที่เดินทางกลับมากกว่าวันที่ไป");
    } else if (this.selectedNumOfPerson == 0) {
      alert(this.errorMessage.pleaseSelect + "จำนวนผู้เดินทาง");
    } else {
      this.availableTripSeach.departDate = this.departDate;
      this.availableTripSeach.returnDate = this.returnDate;
      this.availableTripSeach.pickup = this.selectedDptrPark.id;
      this.availableTripSeach.pickupDesc = this.selectedDptrPark.nameTh;
      this.availableTripSeach.dropoff = this.selectedArrvPark.id;
      this.availableTripSeach.dropoffDesc = this.selectedArrvPark.nameTh;
      this.availableTripSeach.tripType = this.selectedTripType;
      console.log('------------>>> ', this.availableTripSeach);

      /* --------------------- call API ---------------------*/

      this.router.navigate(['selectRound'], { relativeTo: this.route });
    }
  }

  onClick() {
    console.log('>>> onClick <<<');
    parent.postMessage('som', '*'); 
    // window.addEventListener('message', function (event) {
    //   console.log('event >>>', event)
    // });
    // parent.window.HelloFromChild('somm');
    // window.addEventListener('message', function (event) {
    //   console.log('event >>>', event)
    //   // IMPORTANT: Check the origin of the data! 
    //   // if (~event.origin.indexOf('http://yoursite.com')) { 
    //   //     // The data has been sent from your site 

    //   //     // The data sent with postMessage is stored in event.data 
    //   //     console.log(event.data); 
    //   // } else { 
    //   //     // The data hasn't been sent from your site! 
    //   //     // Be careful! Do not use it. 
    //   //     return; 
    //   // } 
    // });

    // window.parent.HelloFromChild('TEST');
  }



}