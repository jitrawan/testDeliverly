import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './core/header/header.component';

import { FooterComponent } from './core/footer/footer.component';

import { EventInfoComponent } from './event-info/event-info.component';
import { AllEventComponent } from './eventTickets/all-event/all-event.component';
import { HomeComponent } from './pages/home/home.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    EventInfoComponent,
    AllEventComponent,
    HomeComponent,
  ],
  imports: [
    NgbModule.forRoot(), BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


