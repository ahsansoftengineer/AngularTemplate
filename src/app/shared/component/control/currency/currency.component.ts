import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { CurrencyMaskConfig, CurrencyMaskInputMode } from 'ngx-currency';
import { BaseControlComponent, CONTROL_HOST_CSS_CLASS } from '../base-control-z.component';

@Component({
  selector: 'di-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.css'],
  host: {class: CONTROL_HOST_CSS_CLASS}
})
export class CurrencyComponent extends BaseControlComponent  implements OnInit, OnChanges {
  @Input() options: Partial<CurrencyMaskConfig>;
  override ngOnInit(): void {
    super.ngOnInit();
    if (this.disabled) this.control.disable();
  }
  ngOnChanges(changes: SimpleChanges) {
    if (
      changes?.disabled?.currentValue == true ||
      changes?.disabled?.currentValue == false
    ) {
      if (this.control && changes?.disabled?.currentValue) {
        this.control.disable();
      } else if (this.control && !changes?.disabled?.currentValue) {
        this.control.enable();
      }
    }
  }
  mergeOptions(options:  Partial<CurrencyMaskConfig>){
    return {...this.defaultOptions, ...options}
  }
  defaultOptions:  Partial<CurrencyMaskConfig> = {
    // suffix: ' PKR',
    prefix: 'Rs',
    thousands: ',',
    decimal: '.',
    inputMode: CurrencyMaskInputMode.NATURAL,
    allowNegative: false,
    min: undefined,
    max: undefined,
    align: 'right'
  }
}
// export interface CurrencyMaskConfig {
//   align: string;
//   allowNegative: boolean;
//   allowZero: boolean;
//   decimal: string;
//   precision: number;
//   prefix: string;
//   suffix: string;
//   thousands: string;
//   nullable: boolean;
//   min?: number;
//   max?: number;
//   inputMode?: CurrencyMaskInputMode;
// }
