import { Component, OnInit } from '@angular/core';
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
  private availableTripSeach: AvailableTrip = new AvailableTrip;
  private errorMessage: ErrorMessage = new ErrorMessage;
  private provinceList: ProvinceModel[];
  private arrvProvinceList: ProvinceModel[];
  private parkList: ParkModel[];
  private dptrParkList: ParkModel[] = [];
  private arrvParkList: ParkModel[] = [];
  private returnDate: Date = new Date(Date.now());
  private departDate: Date = new Date(Date.now());
  private selectedDptrProvince: ProvinceModel;
  private selectedDptrPark: ParkModel;
  private selectedArrvProvince: ProvinceModel;
  private selectedArrvPark: ParkModel;
  private selectedTripType: string;
  private isReturnDate: boolean = true;
  private selectedNumOfPerson: number;

  constructor(
    private busService: BusService
  ) { }

  ngOnInit() {
    this.getProvinceList();
    this.getParkList();
    this.selectedTripType = "R";
    this.selectedNumOfPerson = 0;
  }


  private getProvinceList() {
    this.busService.getMasProvince().subscribe((res) => {
      this.provinceList = res.data.map((obj: any) => {
        return {
          id: obj.id,
          desc: obj.desc
        };
      });
    });
  }

  private getParkList() {
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

  private selectDprtProvince(event) {
    this.selectedDptrProvince = event;
    this.selectedDptrPark = undefined;
  }

  private selectArrvProvince(event) {
    this.selectedArrvProvince = event;
    this.selectedArrvPark = undefined;

  }
  private findDprtParkList() {
    if (this.selectedDptrProvince != undefined) {
      var listPark = this.parkList.filter(item =>
        item.province.id === this.selectedDptrProvince.id);
      if (listPark.length > 0) {
        this.dptrParkList = listPark;
      }
    }
  }

  private findArrvParkList() {
    if (this.selectedArrvProvince != undefined) {
      var listPark = this.parkList.filter(item =>
        item.province.id === this.selectedArrvProvince.id);
      if (listPark.length > 0) {
        this.arrvParkList = listPark;
      }
    }
  }

  private condition = [
    '- สามารถจองตั๋ว ก่อนเวลาเดินทางของเที่ยววิ่ง 3 ชม.',
    '- วันที่เดินทางไป และกลับ มีระยะเวลาห่างกันไม่เกิน 30 วัน',
    '- สามารถซื้อตั๋วล่วงหน้าได้ 90 วัน'
  ];

  private selectType(event) {
    if (event.target.value == "O") {
      // this.isReturnDate = false;
      this.selectedTripType = "O";
    } else {
      // this.isReturnDate = true;
      this.selectedTripType = "R";
    }
  }

  private onNextPage() {
    console.log('submit');
    this.validateDate();
  }

  private validateDate() {
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
    }
  }

}