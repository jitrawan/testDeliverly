import {
    Component, Input, Output, DoCheck, KeyValueDiffers,
    ViewChild, ChangeDetectorRef, OnInit, EventEmitter
} from '@angular/core';

@Component({
    selector: 'go-datetimepicker',
    templateUrl: './datetimepicker.component.html',
    styleUrls: ['./datetimepicker.style.css']
})
export class DateTimePickerComponent implements OnInit {

    // @Input() label: string = '';
    // @Input() forId: string = '';
    // @Input() require: string = '';

    // input for primeng
    @Input() inputId: string;
    @Input() defaultDate: Date;
    @Input() style: string;
    @Input() styleClass: string;
    @Input() inputStyle: string;
    @Input() inputStyleClass: string;
    @Input() placeholder: string;
    @Input() disabled: boolean = false;
    @Input() dateFormat: string = 'dd/mm/yy';
    @Input() inline: boolean = false;
    // @Input() showOtherMonths: boolean;
    @Input() selectOtherMonths: boolean = false;
    @Input() showIcon: boolean = false;
    @Input() icon: string = "fa-calendar";
    @Input() readonlyInput: boolean;
    @Input() minDate: Date;
    @Input() maxDate: Date;
    @Input() disabledDates: Array<Date>;
    @Input() disabledDays: Array<number>;
    @Input() monthNavigator: boolean = false;
    @Input() yearNavigator: boolean = false;
    @Input() yearRange: string;
    @Input() showTime: boolean = false;
    @Input() hourFormat: string = "24";
    // @Input() locale: any;
    // @Input() timeOnly: boolean = false;
    @Input() dataType: string = "date";
    // @Input() required: boolean = false;
    @Input() showSeconds: boolean = false;
    @Input() stepHour: number = 1;
    @Input() stepMinute: number = 1;
    @Input() stepSecond	: number = 1;

    @Input() isBuddhistYear: boolean = false;
    @Input() calendarLanguage: string = 'en';
    @Input() firstDayOfWeek: number = 0;

    @Input() date: Date;
    @Output() dateChange: EventEmitter<any> = new EventEmitter<any>();

    // private requireForLabel: string = 'false';
    private locale: any;

    ngOnInit() {
        this.setLanguage();
        // if(this.required){
        //     this.requireForLabel = 'true';
        // } else {
        //     this.requireForLabel = 'false';
        // }
        this.dateChange.emit(this.date);
        // this.defaultDate_1 = this.date1;
    }

     setLanguage() {
        if (this.calendarLanguage.toLowerCase() === 'th') {
            this.locale = {
                firstDayOfWeek: this.firstDayOfWeek,
                dayNames: ["วันอาทิตย์", "วันจันทร์", "วันอังคาร", "วันพุธ", "วันพฤหัสบดี", "วันศุกร์", "วันเสาร์"],
                dayNamesShort: ["อาทิตย์", "จันทร์", "อังคาร", "พุธ", "พฤหัส", "ศุกร์", "เสาร์"],
                dayNamesMin: ["อา", "จ", "อ", "พ", "พฤ", "ศ", "ส"],
                monthNames: ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"],
                monthNamesShort: ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."]
            };
        }
        else {
            this.locale = {
                firstDayOfWeek: this.firstDayOfWeek,
                dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
                monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
            };
        }
    }

    select(event: any) {
        this.dateChange.emit(this.date); 
    }

    blur(event: any) {
        this.dateChange.emit(this.date); 
    }

    focus(event: any) {
        this.dateChange.emit(this.date); 
    }
}