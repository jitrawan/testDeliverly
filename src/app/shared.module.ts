import { ModuleWithProviders , NgModule } from '@angular/core';
import { ThaiDatePipe } from './shared/lib/date-format/thaidate.pipe';
import { SafeHtmlPipe } from './shared/lib/dom/safehtml.pipe';


@NgModule({
  declarations: [
    ThaiDatePipe,
    SafeHtmlPipe
  ],
  imports: [
    
  ],
  exports: [
    ThaiDatePipe,
    SafeHtmlPipe
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
    }
  }
}
