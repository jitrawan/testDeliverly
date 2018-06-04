import { ModuleWithProviders , NgModule } from '@angular/core';
import { ThaiDatePipe } from './shared/lib/date-format/thaidate.pipe';
import { SafeHtmlPipe } from './shared/lib/dom/safehtml.pipe';

import { JasperoConfirmationsModule } from '@jaspero/ng2-confirmations';
import { NgxBarcodeModule } from 'ngx-barcode';
import { LoadingComponent } from '@atk-pages/loading/loading.component';


@NgModule({
  declarations: [
    ThaiDatePipe,
    SafeHtmlPipe,
    LoadingComponent
  ],
  imports: [
    JasperoConfirmationsModule,
    NgxBarcodeModule
  ],
  exports: [
    ThaiDatePipe,
    SafeHtmlPipe,
    JasperoConfirmationsModule,
    NgxBarcodeModule,
    LoadingComponent
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
    }
  }
}
