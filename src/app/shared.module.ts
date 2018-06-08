import { ModuleWithProviders , NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThaiDatePipe } from './shared/lib/date-format/thaidate.pipe';
import { SafeHtmlPipe } from './shared/lib/dom/safehtml.pipe';

import { JasperoConfirmationsModule } from '@jaspero/ng2-confirmations';
import { NgxBarcodeModule } from 'ngx-barcode';
import { LoadingComponent } from '@atk-pages/loading/loading.component';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { ScrollDirective } from '@atk-shared/directive/scroll.directive';

@NgModule({
  declarations: [
    ThaiDatePipe,
    SafeHtmlPipe,
    LoadingComponent,
    ScrollDirective
  ],
  imports: [
    JasperoConfirmationsModule,
    NgxBarcodeModule,
    SweetAlert2Module,
    CommonModule
  ],
  exports: [
    ThaiDatePipe,
    SafeHtmlPipe,
    JasperoConfirmationsModule,
    NgxBarcodeModule,
    LoadingComponent,
    CommonModule,
    ScrollDirective
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
    }
  }
}
