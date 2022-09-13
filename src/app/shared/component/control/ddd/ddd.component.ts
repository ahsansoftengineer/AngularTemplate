import { Component, Input, OnInit } from '@angular/core';
import { BaseControlDDComponent } from '../base-control-dd.component';
import { CONTROL_HOST_CSS_CLASS } from '../base-control-z.component';

@Component({
  selector: 'di-ddd',
  templateUrl: './ddd.component.html',
  styleUrls: ['./ddd.component.css'],
  host: { class: CONTROL_HOST_CSS_CLASS },
})
// Drop Down Dependent
export class DddComponent extends BaseControlDDComponent implements OnInit {
  @Input() parent: DddComponent;
  @Input() oneTimeLoad: boolean;
  @Input() retainState = true;
  ngOnInit(): void {
    super.ngOnInit();
    if(this.parent) this.childLoadingDataByParent();
    if (this.oneTimeLoad) {
      this.onceLoad(() => {
      if(!this.retainState){
        this._css.looseControlState.push(this.field)
      }
      // if(!this.disabled)
        this.control.patchValue(this.control.value)
    })
    }
  }
  childLoadingDataByParent(){
    // For DD Parent
    if (this.emptyCheck(this.parent?.control?.value) && !this.preobj) {
          this.loadData(this.parent.control.value);
    }
  }

}
