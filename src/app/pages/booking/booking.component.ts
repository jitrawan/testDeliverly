<<<<<<< HEAD
import { Component, OnInit, ElementRef } from '@angular/core';
=======
import { Component, OnInit, ViewEncapsulation, ElementRef } from '@angular/core';
>>>>>>> e96048dc94ba14ceee7555de9d1fd9dac6369179
import { Router } from '@angular/router';

@Component({
    selector: 'app-booking',
    templateUrl: './booking.component.html',
    styleUrls: ['./booking.component.css',
        '../../../assets/css/standard/rwdImageMapsStyle.css',
        '../../../assets/css/standard/layout.css',
        '../../../assets/css/standard/fullcalendar.min.css',
        '../../../assets/css/standard/jquerysctipttop.css',
        './css/jquery.seat-charts.css',
        './css/orange.css',]
})
export class BookingComponent implements OnInit {

    ngOnInit() {

    }

}