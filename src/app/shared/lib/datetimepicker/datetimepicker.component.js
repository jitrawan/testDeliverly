"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var DateTimePickerComponent = (function () {
    function DateTimePickerComponent() {
        // @Input() label: string = '';
        // @Input() forId: string = '';
        // @Input() require: string = '';
        this.disabled = false;
        this.dateFormat = 'dd/mm/yy';
        this.inline = false;
        // @Input() showOtherMonths: boolean;
        this.selectOtherMonths = false;
        this.showIcon = false;
        this.icon = "fa-calendar";
        this.monthNavigator = false;
        this.yearNavigator = false;
        this.showTime = false;
        this.hourFormat = "24";
        // @Input() locale: any;
        // @Input() timeOnly: boolean = false;
        this.dataType = "date";
        // @Input() required: boolean = false;
        this.showSeconds = false;
        this.stepHour = 1;
        this.stepMinute = 1;
        this.stepSecond = 1;
        this.isBuddhistYear = false;
        this.calendarLanguage = 'en';
        this.firstDayOfWeek = 0;
        this.dateChange = new core_1.EventEmitter();
    }
    DateTimePickerComponent.prototype.ngOnInit = function () {
        this.setLanguage();
        // if(this.required){
        //     this.requireForLabel = 'true';
        // } else {
        //     this.requireForLabel = 'false';
        // }
        this.dateChange.emit(this.date);
        // this.defaultDate_1 = this.date1;
    };
    DateTimePickerComponent.prototype.setLanguage = function () {
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
    };
    DateTimePickerComponent.prototype.select = function (event) {
        this.dateChange.emit(this.date);
    };
    DateTimePickerComponent.prototype.blur = function (event) {
        this.dateChange.emit(this.date);
    };
    DateTimePickerComponent.prototype.focus = function (event) {
        this.dateChange.emit(this.date);
    };
    return DateTimePickerComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], DateTimePickerComponent.prototype, "inputId", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Date)
], DateTimePickerComponent.prototype, "defaultDate", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], DateTimePickerComponent.prototype, "style", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], DateTimePickerComponent.prototype, "styleClass", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], DateTimePickerComponent.prototype, "inputStyle", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], DateTimePickerComponent.prototype, "inputStyleClass", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], DateTimePickerComponent.prototype, "placeholder", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], DateTimePickerComponent.prototype, "disabled", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], DateTimePickerComponent.prototype, "dateFormat", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], DateTimePickerComponent.prototype, "inline", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], DateTimePickerComponent.prototype, "selectOtherMonths", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], DateTimePickerComponent.prototype, "showIcon", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], DateTimePickerComponent.prototype, "icon", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], DateTimePickerComponent.prototype, "readonlyInput", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Date)
], DateTimePickerComponent.prototype, "minDate", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Date)
], DateTimePickerComponent.prototype, "maxDate", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], DateTimePickerComponent.prototype, "disabledDates", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], DateTimePickerComponent.prototype, "disabledDays", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], DateTimePickerComponent.prototype, "monthNavigator", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], DateTimePickerComponent.prototype, "yearNavigator", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], DateTimePickerComponent.prototype, "yearRange", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], DateTimePickerComponent.prototype, "showTime", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], DateTimePickerComponent.prototype, "hourFormat", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], DateTimePickerComponent.prototype, "dataType", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], DateTimePickerComponent.prototype, "showSeconds", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], DateTimePickerComponent.prototype, "stepHour", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], DateTimePickerComponent.prototype, "stepMinute", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], DateTimePickerComponent.prototype, "stepSecond", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], DateTimePickerComponent.prototype, "isBuddhistYear", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], DateTimePickerComponent.prototype, "calendarLanguage", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], DateTimePickerComponent.prototype, "firstDayOfWeek", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Date)
], DateTimePickerComponent.prototype, "date", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], DateTimePickerComponent.prototype, "dateChange", void 0);
DateTimePickerComponent = __decorate([
    core_1.Component({
        selector: 'go-datetimepicker',
        templateUrl: './datetimepicker.component.html',
        styleUrls: ['./datetimepicker.style.css']
    })
], DateTimePickerComponent);
exports.DateTimePickerComponent = DateTimePickerComponent;
//# sourceMappingURL=datetimepicker.component.js.map