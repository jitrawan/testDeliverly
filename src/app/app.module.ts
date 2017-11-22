import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/header/header.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    NgbModule.forRoot(), BrowserModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


