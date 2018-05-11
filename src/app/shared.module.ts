import { ModuleWithProviders , NgModule } from '@angular/core';
import { ThaiDatePipe } from './shared/lib/date-format/thaidate.pipe';

@NgModule({
  declarations: [
    ThaiDatePipe
  ],
  imports: [
    
  ],
  exports: [
    ThaiDatePipe
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
    }
  }
}
