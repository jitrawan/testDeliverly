import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
	selector: 'app-all-event',
	templateUrl: './all-event.component.html',
	styleUrls: ['./all-event.component.css',
		'../../../../assets/css/standard/cardticket.css']
})
export class AllEventComponent implements OnInit {
	subscription: Subscription;
	constructor(
		private route: ActivatedRoute,
		private router: Router) { }

	ngOnInit() {
		this.subscription = this.route.queryParams.subscribe((params: Params) => {
			let type = params['type'];
			console.log(type);
			console.log(params);
		});
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

}
