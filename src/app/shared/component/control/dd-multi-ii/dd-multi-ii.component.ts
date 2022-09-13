import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl } from '@angular/forms';
import { ChangeEvent } from 'src/app/interface/common/change-event';
import { BaseControlDDComponent } from '../base-control-dd.component';
import { CONTROL_HOST_CSS_CLASS } from '../base-control-z.component';

@Component({
  selector: 'di-dd-multi-ii',
  templateUrl: './dd-multi-ii.component.html',
  styleUrls: ['./dd-multi-ii.component.css'],
  host: { class: CONTROL_HOST_CSS_CLASS },
})
export class DdMultiIiComponent extends BaseControlDDComponent implements OnInit {
  changeEvent(itm, event) {
    super.changeEvent(itm, event)
    if (event?.event?.isUserInput) {
      if(this.control instanceof FormArray){
        if (event.event.source.selected) {
          this.control?.push(new FormControl(event.event.source.value));
        } else {
          this.control.removeAt(
            this.control?.value?.findIndex((Id) => Id === event.event.source.value)
          );
        }
      }

    }
  }
}
