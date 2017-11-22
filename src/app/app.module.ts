import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/header/header.component';

import { FooterComponent } from './core/footer/footer.component';

import { EventInfoComponent } from './event-info/event-info.component';
import { AllEventComponent } from './eventTickets/all-event/all-event.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    EventInfoComponent,
    AllEventComponent,
  ],
  imports: [
    NgbModule.forRoot(), BrowserModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


