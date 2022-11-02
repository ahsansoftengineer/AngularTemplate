import { DatePipe } from '@angular/common';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import {
  BaseControlComponent,
  CONTROL_HOST_CSS_CLASS,
} from '../base-control-z.component';

@Component({
  selector: 'di-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.css'],
  host: { class: CONTROL_HOST_CSS_CLASS },
})
export class DateComponent
  extends BaseControlComponent
  implements OnInit, OnChanges
{
  @Input() startAt: Date | null = null;
  @Input() startView: 'month' | 'year' | 'multi-year' = 'month';
  @Input() max: Date | number | string = null;
  @Input() min: Date | number | string = null;
  @Input() fromDate: string;
  @Input() toDate: string;
  datePipe: DatePipe;
  // constructor(injector: Injector) {
  //   super(injector);
  // }
  override ngOnInit(): void {
    this.datePipe = this.injector.get(DatePipe);
    super.ngOnInit();
    if (this.disabled) this.control.disable();
    this.setDateInForm();
    this.subscribeRangeChange();
  }
  setDateInForm() {
    this.control.valueChanges.subscribe((data) => {
      this.control.patchValue(this.setFormThatDate(data), { emitEvent: false });
    });
  }
  subscribeRangeChange() {
    if (this.fromDate) {
      this.group?.get(this.fromDate)?.valueChanges?.subscribe((x) => {
        this.min = x;
      });
    } else if (this.toDate) {
      this.group?.get(this.toDate)?.valueChanges?.subscribe((x) => {
        this.max = x;
      });
    }
  }
  setFormThatDate(selectedDate) {
    return this.datePipe.transform(selectedDate, 'yyyy-MM-dd');
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes?.disabled?.currentValue != undefined) {
      if (this.control && changes?.disabled?.currentValue) {
        this.control.disable();
      } else if (this.control && !changes?.disabled?.currentValue) {
        this.control.enable();
      }
    }
  }
}
