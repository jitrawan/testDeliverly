import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { DatePipe } from '@angular/common';

/* Library */
import { DialogModule } from './shared/lib/dialog/dialog.component';
import { Ng2AutoCompleteModule } from 'ng2-auto-complete';
import { JasperoAlertsModule } from '@jaspero/ng2-alerts';
import { JasperoConfirmationsModule } from '@jaspero/ng2-confirmations'
import { CalendarModule } from './shared/lib/datetimepicker/primeng/calendar/calendar';

/* Service */
import { ApiService } from './shared/services/api.service';
import { HeaderService } from './shared/services/header.service';
import { AtkService } from './shared/services/atk.service';
import { SharedService } from './shared/services/shared-service.service';
import { ErrorMsgService } from './shared/services/errorMsg.service';

/* Page */
import { AppComponent } from './app.component';

import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';

import { EventInfoComponent } from './pages/event-info/event-info.component';
import { HomeComponent } from './pages/home/home.component';
import { FaqComponent } from './pages/faq/faq.component';
import { PolicyComponent } from './pages/policy/policy.component';
import { ResultReserveTransitComponent } from './pages/resultReserve-transit/resultReserve-transit.component';

import { ResultPaidTransitComponent } from './pages/resultPaid/result-paid-transit/result-paid-transit.component';
import { PopupResultPaidTransitComponent } from './pages/resultPaid-popup/result-paid-transit-popup/result-paid-transit-popup.component';
import { HistoryComponent } from './pages/history/history.component';

import { SocialLoginModule } from 'angularx-social-login';
import { AuthServiceConfig, GoogleLoginProvider, FacebookLoginProvider, LinkedInLoginProvider } from 'angularx-social-login';

import { DiscountComponent } from './pages/discount/discount.component';
import { DiscountDetailComponent } from './pages/discount-detail/discount-detail.component';
import {
  RECAPTCHA_SETTINGS,
  RecaptchaSettings,
  RecaptchaLoaderService,
  RecaptchaModule,
} from 'ng-recaptcha';
import { PushNotificationModule } from 'ng-push-notification';

import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { CardTicketComponent } from './pages/home/card-ticket/card-ticket.component';
import { ShowEventComponent } from './pages/home/show-event/show-event.component';

const globalSettings: RecaptchaSettings = {siteKey: '6LfUOlcUAAAAAPaRz8g50yRbhDqeEoogu2waIz9i'}

// Import module
import { SharedModule } from './shared.module';
const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('425750395938-52us01eev9lune9ltac5t2o0d1b1utdl.apps.googleusercontent.com')
    // 624796833023-clhjgupm0pu6vgga7k5i5bsfp6qp6egh.apps.googleusercontent.com
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider('391051151360464')
    //561602290896109
  }
]);

export function provideConfig() {
  return config;
}


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    EventInfoComponent,
    HomeComponent,
    FaqComponent,
    PolicyComponent,
    ResultReserveTransitComponent,
    ResultPaidTransitComponent,
    PopupResultPaidTransitComponent,
    HistoryComponent,
    DiscountComponent,
    DiscountDetailComponent,
    CardTicketComponent,
    ShowEventComponent
  ],
  imports: [
    NgbModule.forRoot(),
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAGx0n_0P-3W46Pf77PqB25XtjNv8MpJDk'
    }),
    AppRoutingModule,
    HttpClientModule,
    HttpModule,
    DialogModule,
    Ng2AutoCompleteModule,
    JasperoAlertsModule,
    JasperoConfirmationsModule,
    SocialLoginModule,
    CalendarModule,
    ReactiveFormsModule,
    RecaptchaModule.forRoot(),
    PushNotificationModule.forRoot(),
    SharedModule,
    environment.production ? ServiceWorkerModule.register('ngsw-worker.js') : []

  ],
  providers: [
    HeaderService,
    AtkService,
    SharedService,
    DatePipe,
    ErrorMsgService,
    ApiService,
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: globalSettings,
    },
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}