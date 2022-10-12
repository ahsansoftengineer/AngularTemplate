import { NgModule } from '@angular/core';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
// import { NgxMatIntlTelInputComponent,  } from 'ngx-mat-intl-tel-input';
import { NgxSpinnerModule } from "ngx-spinner";

// import { NgxCurrencyModule } from "ngx-currency";
// import { UiSwitchModule } from 'ngx-toggle-switch';
// import { MatPasswordStrengthModule } from '@angular-material-extensions/password-strength';
// import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
// import { ShareIconsModule } from 'ngx-sharebuttons/icons';
// import { NgxViewerModule } from 'ngx-viewer';



const nGX_NGB_Other_Module = [
  // NgxMatIntlTelInputModule,
  NgxMatSelectSearchModule,
  // NgxCurrencyModule,
  NgxSpinnerModule,
  // NgxViewerModule,
  // UiSwitchModule,
  // ShareButtonsModule,
  // ShareIconsModule,
  // MatSelectInfiniteScrollModule,

];
@NgModule({
  declarations: [
    // NgxMatIntlTelInputComponent
  ],
  imports: nGX_NGB_Other_Module,
  exports: nGX_NGB_Other_Module,
})
export class NGX_NGB_Other_Module { }
