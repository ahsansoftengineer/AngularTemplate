import {
  Component,
  Injector,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { BaseControlComponent, CONTROL_HOST_CSS_CLASS } from '../base-control-z.component';

@Component({
  selector: 'di-txt',
  templateUrl: './txt.component.html',
  styleUrls: ['./txt.component.css'],
  host: { class: CONTROL_HOST_CSS_CLASS },
})
// Text Control
export class TxtComponent extends BaseControlComponent implements OnInit, OnChanges{
  @Input() type = 'text';
  constructor(injector: Injector) {
    super(injector);
  }
  override ngOnInit(): void {
    super.ngOnInit();
    if(this.disabled) this.control.disable();
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes?.disabled?.currentValue != undefined) {
      if (this.control && changes?.disabled?.currentValue) {
        this.control.disable();
      } else if(this.control && !changes?.disabled?.currentValue){
        this.control.enable();
      }
    }
  }

  FuncBlur($event){
      this.Blur.emit($event);
  }
}
