import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseControlComponent, CONTROL_HOST_CSS_CLASS } from '../base-control-z.component';

@Component({
  selector: 'di-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.css'],
  host: { class: CONTROL_HOST_CSS_CLASS },
})
export class CellComponent extends BaseControlComponent implements OnInit {
  @ViewChild('phone') phone
  override ngOnInit(): void {
    super.ngOnInit();
    this.control?.valueChanges?.subscribe(x => {
      if(!this.emptyCheck(x) && this.control.pristine && this?.phone?.phoneNumber){
        this.phone.phoneNumber = ''
      }
    })
  }
}
