import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
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
import { ApiService } from '@atk-service/api.service';
import { HeaderService } from '@atk-service/header.service';
import { AtkService } from '@atk-service/atk.service';
import { SharedService } from '@atk-service/shared-service.service';
import { ErrorMsgService } from '@atk-service/errorMsg.service';

/* Page */
import { AppComponent } from './app.component';
import { HeaderComponent } from '@atk-pages/header/header.component';
import { FooterComponent } from '@atk-pages/footer/footer.component';
import { EventInfoComponent } from '@atk-pages/event-info/event-info.component';
import { HomeComponent } from '@atk-pages/home/home.component';
import { FaqComponent } from '@atk-pages/faq/faq.component';
import { PolicyComponent } from '@atk-pages/policy/policy.component';
import { HistoryComponent } from '@atk-pages/history/history.component';
import { SocialLoginModule } from 'angularx-social-login';
import { AuthServiceConfig, GoogleLoginProvider, FacebookLoginProvider, LinkedInLoginProvider } from 'angularx-social-login';
import { DiscountComponent } from '@atk-pages/discount/discount.component';
import { DiscountDetailComponent } from '@atk-pages/discount-detail/discount-detail.component';
import {
  RECAPTCHA_SETTINGS,
  RecaptchaSettings,
  RecaptchaLoaderService,
  RecaptchaModule,
} from 'ng-recaptcha';
import { PushNotificationModule } from 'ng-push-notification';

import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { CardTicketComponent } from '@atk-pages/home/card-ticket/card-ticket.component';
import { ShowEventComponent } from '@atk-pages/home/show-event/show-event.component';

const globalSettings: RecaptchaSettings = {siteKey: '6Lek2FoUAAAAAPQZEags-82eJwRwDdJFm_LHVpXF'}

// Import module
import { SharedModule } from './shared.module';
import { ScrollDirective } from './shared/directive/scroll.directive';
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
    HistoryComponent,
    DiscountComponent,
    DiscountDetailComponent,
    CardTicketComponent,
    ShowEventComponent,
    ScrollDirective
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
  schemas: [ 
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
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