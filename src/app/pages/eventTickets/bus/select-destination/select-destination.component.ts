import { Component, OnInit } from '@angular/core';
import { AvailableTrip } from '../../../../shared/models/availableTripSearch.model';
import { ErrorMessage } from '../../../../shared/constant/error-message';

import { BusService } from '../../../../shared/services/bus.service';
import { Province } from '../../../../shared/models/province.model';

@Component({
  selector: 'app-select-destination',
  templateUrl: './select-destination.component.html',
  styleUrls: ['./select-destination.component.css'],
  providers: [BusService]
})
export class SelectDestinationComponent implements OnInit {

  private masProvince: Province = new Province();

  constructor(
    private busService: BusService
  ) { }

  ngOnInit() {
    // this.dprtProvinceList = 

  }

  private availableTripSeach: AvailableTrip = new AvailableTrip;
  private errorMessage: ErrorMessage = new ErrorMessage;
  private dprtProvinceList: any[];
  private arrvProvinceList: any[];
  private dprtParkList: any[];
  private arrvParkList: any[];
  private returnDate: Date = new Date(Date.now());
  private departDate: Date = new Date(Date.now());
  private selectedDptrProvince: any;
  private selectedDptrPark: any;
  private selectedArrvProvince: any;
  private selectedArrvPark: any;
  private selectedTripType: string;
  private isReturnDate: boolean = true;
  private selectedNumOfPerson: any = 0;

  private getDprtProvinceList() {
    this.busService.getMasProvince().subscribe((res) => {
      this.dprtProvinceList = res.result.map((obj: any) => {
        console.log('obj-----', obj);
        return {
          id: obj.id,
          text: obj.code
        };
      });
    });
  }

  private getArrvProvinceList(){

  }

  private getDprtParkList(){

  }

  private getArrvParkList(){

  }

  private findDprtParkList(){

  }

  private findArrvParkList(){
    
  }

  private condition = [
    '- สามารถจองตั๋ว ก่อนเวลาเดินทางของเที่ยววิ่ง 3 ชม.',
    '- วันที่เดินทางไป และกลับ มีระยะเวลาห่างกันไม่เกิน 30 วัน',
    '- สามารถซื้อตั๋วล่วงหน้าได้ 90 วัน'
  ];

  private selectType(event) {
    if (event.target.value == "O") {
      this.isReturnDate = false;
      this.selectedTripType = "O";
    } else {
      this.isReturnDate = true;
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
      this.availableTripSeach.pickup = this.selectedDptrProvince.id;
      this.availableTripSeach.tripType = this.selectedTripType;
      console.log('------------>>> ', this.availableTripSeach);
    }
  }


  // private dprtProvinceList = [
  // { "id": 1, "PROVINCE_CODE": "10", "desc": "กรุงเทพมหานคร", "GEO_ID": 2 },
  // { "id": 2, "PROVINCE_CODE": "11", "desc": "สมุทรปราการ", "GEO_ID": 2 },
  // { "id": 3, "PROVINCE_CODE": "12", "desc": "นนทบุรี", "GEO_ID": 2 },
  // { "id": 4, "PROVINCE_CODE": "13", "desc": "ปทุมธานี", "GEO_ID": 2 },
  // { "id": 5, "PROVINCE_CODE": "14", "desc": "พระนครศรีอยุธยา", "GEO_ID": 2 },
  // { "id": 6, "PROVINCE_CODE": "15", "desc": "อ่างทอง", "GEO_ID": 2 },
  // { "id": 7, "PROVINCE_CODE": "16", "desc": "ลพบุรี", "GEO_ID": 2 },
  // { "id": 8, "PROVINCE_CODE": "17", "desc": "สิงห์บุรี", "GEO_ID": 2 },
  // { "id": 9, "PROVINCE_CODE": "18", "desc": "ชัยนาท", "GEO_ID": 2 },
  // { "id": 10, "PROVINCE_CODE": "19", "desc": "สระบุรี", "GEO_ID": 2 },
  // { "id": 11, "PROVINCE_CODE": "20", "desc": "ชลบุรี", "GEO_ID": 5 },
  // { "id": 12, "PROVINCE_CODE": "21", "desc": "ระยอง", "GEO_ID": 5 },
  // { "id": 13, "PROVINCE_CODE": "22", "desc": "จันทบุรี", "GEO_ID": 5 },
  // { "id": 14, "PROVINCE_CODE": "23", "desc": "ตราด", "GEO_ID": 5 },
  // { "id": 15, "PROVINCE_CODE": "24", "desc": "ฉะเชิงเทรา", "GEO_ID": 5 },
  // { "id": 16, "PROVINCE_CODE": "25", "desc": "ปราจีนบุรี", "GEO_ID": 5 },
  // { "id": 17, "PROVINCE_CODE": "26", "desc": "นครนายก", "GEO_ID": 2 },
  // { "id": 18, "PROVINCE_CODE": "27", "desc": "สระแก้ว", "GEO_ID": 5 },
  // { "id": 19, "PROVINCE_CODE": "30", "desc": "นครราชสีมา", "GEO_ID": 3 },
  // { "id": 20, "PROVINCE_CODE": "31", "desc": "บุรีรัมย์", "GEO_ID": 3 },
  // { "id": 21, "PROVINCE_CODE": "32", "desc": "สุรินทร์", "GEO_ID": 3 },
  // { "id": 22, "PROVINCE_CODE": "33", "desc": "ศรีสะเกษ", "GEO_ID": 3 },
  // { "id": 23, "PROVINCE_CODE": "34", "desc": "อุบลราชธานี", "GEO_ID": 3 },
  // { "id": 24, "PROVINCE_CODE": "35", "desc": "ยโสธร", "GEO_ID": 3 },
  // { "id": 25, "PROVINCE_CODE": "36", "desc": "ชัยภูมิ", "GEO_ID": 3 },
  // { "id": 26, "PROVINCE_CODE": "37", "desc": "อำนาจเจริญ", "GEO_ID": 3 },
  // { "id": 27, "PROVINCE_CODE": "39", "desc": "หนองบัวลำภู", "GEO_ID": 3 },
  // { "id": 28, "PROVINCE_CODE": "40", "desc": "ขอนแก่น", "GEO_ID": 3 },
  // { "id": 29, "PROVINCE_CODE": "41", "desc": "อุดรธานี", "GEO_ID": 3 },
  // { "id": 30, "PROVINCE_CODE": "42", "desc": "เลย", "GEO_ID": 3 },
  // { "id": 31, "PROVINCE_CODE": "43", "desc": "หนองคาย", "GEO_ID": 3 },
  // { "id": 32, "PROVINCE_CODE": "44", "desc": "มหาสารคาม", "GEO_ID": 3 },
  // { "id": 33, "PROVINCE_CODE": "45", "desc": "ร้อยเอ็ด", "GEO_ID": 3 },
  // { "id": 34, "PROVINCE_CODE": "46", "desc": "กาฬสินธุ์", "GEO_ID": 3 },
  // { "id": 35, "PROVINCE_CODE": "47", "desc": "สกลนคร", "GEO_ID": 3 },
  // { "id": 36, "PROVINCE_CODE": "48", "desc": "นครพนม", "GEO_ID": 3 },
  // { "id": 37, "PROVINCE_CODE": "49", "desc": "มุกดาหาร", "GEO_ID": 3 },
  // { "id": 38, "PROVINCE_CODE": "50", "desc": "เชียงใหม่", "GEO_ID": 1 },
  // { "id": 39, "PROVINCE_CODE": "51", "desc": "ลำพูน", "GEO_ID": 1 },
  // { "id": 40, "PROVINCE_CODE": "52", "desc": "ลำปาง", "GEO_ID": 1 },
  // { "id": 41, "PROVINCE_CODE": "53", "desc": "อุตรดิตถ์", "GEO_ID": 1 },
  // { "id": 42, "PROVINCE_CODE": "54", "desc": "แพร่", "GEO_ID": 1 },
  // { "id": 43, "PROVINCE_CODE": "55", "desc": "น่าน", "GEO_ID": 1 },
  // { "id": 44, "PROVINCE_CODE": "56", "desc": "พะเยา", "GEO_ID": 1 },
  // { "id": 45, "PROVINCE_CODE": "57", "desc": "เชียงราย", "GEO_ID": 1 },
  // { "id": 46, "PROVINCE_CODE": "58", "desc": "แม่ฮ่องสอน", "GEO_ID": 1 },
  // { "id": 47, "PROVINCE_CODE": "60", "desc": "นครสวรรค์", "GEO_ID": 2 },
  // { "id": 48, "PROVINCE_CODE": "61", "desc": "อุทัยธานี", "GEO_ID": 2 },
  // { "id": 49, "PROVINCE_CODE": "62", "desc": "กำแพงเพชร", "GEO_ID": 2 },
  // { "id": 50, "PROVINCE_CODE": "63", "desc": "ตาก", "GEO_ID": 4 },
  // { "id": 51, "PROVINCE_CODE": "64", "desc": "สุโขทัย", "GEO_ID": 2 },
  // { "id": 52, "PROVINCE_CODE": "65", "desc": "พิษณุโลก", "GEO_ID": 2 },
  // { "id": 53, "PROVINCE_CODE": "66", "desc": "พิจิตร", "GEO_ID": 2 },
  // { "id": 54, "PROVINCE_CODE": "67", "desc": "เพชรบูรณ์", "GEO_ID": 2 },
  // { "id": 55, "PROVINCE_CODE": "70", "desc": "ราชบุรี", "GEO_ID": 4 },
  // { "id": 56, "PROVINCE_CODE": "71", "desc": "กาญจนบุรี", "GEO_ID": 4 },
  // { "id": 57, "PROVINCE_CODE": "72", "desc": "สุพรรณบุรี", "GEO_ID": 2 },
  // { "id": 58, "PROVINCE_CODE": "73", "desc": "นครปฐม", "GEO_ID": 2 },
  // { "id": 59, "PROVINCE_CODE": "74", "desc": "สมุทรสาคร", "GEO_ID": 2 },
  // { "id": 60, "PROVINCE_CODE": "75", "desc": "สมุทรสงคราม", "GEO_ID": 2 },
  // { "id": 61, "PROVINCE_CODE": "76", "desc": "เพชรบุรี", "GEO_ID": 4 },
  // { "id": 62, "PROVINCE_CODE": "77", "desc": "ประจวบคีรีขันธ์", "GEO_ID": 4 },
  // { "id": 63, "PROVINCE_CODE": "80", "desc": "นครศรีธรรมราช", "GEO_ID": 6 },
  // { "id": 64, "PROVINCE_CODE": "81", "desc": "กระบี่", "GEO_ID": 6 },
  // { "id": 65, "PROVINCE_CODE": "82", "desc": "พังงา", "GEO_ID": 6 },
  // { "id": 66, "PROVINCE_CODE": "83", "desc": "ภูเก็ต", "GEO_ID": 6 },
  // { "id": 67, "PROVINCE_CODE": "84", "desc": "สุราษฎร์ธานี", "GEO_ID": 6 },
  // { "id": 68, "PROVINCE_CODE": "85", "desc": "ระนอง", "GEO_ID": 6 },
  // { "id": 69, "PROVINCE_CODE": "86", "desc": "ชุมพร", "GEO_ID": 6 },
  // { "id": 70, "PROVINCE_CODE": "90", "desc": "สงขลา", "GEO_ID": 6 },
  // { "id": 71, "PROVINCE_CODE": "91", "desc": "สตูล", "GEO_ID": 6 },
  // { "id": 72, "PROVINCE_CODE": "92", "desc": "ตรัง", "GEO_ID": 6 },
  // { "id": 73, "PROVINCE_CODE": "93", "desc": "พัทลุง", "GEO_ID": 6 },
  // { "id": 74, "PROVINCE_CODE": "94", "desc": "ปัตตานี", "GEO_ID": 6 },
  // { "id": 75, "PROVINCE_CODE": "95", "desc": "ยะลา", "GEO_ID": 6 },
  // { "id": 76, "PROVINCE_CODE": "96", "desc": "นราธิวาส", "GEO_ID": 6 },
  // { "id": 77, "PROVINCE_CODE": "97", "desc": "บึงกาฬ", "GEO_ID": 3 }
  // ];

}
