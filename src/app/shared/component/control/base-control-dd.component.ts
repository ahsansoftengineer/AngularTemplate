import { Component, OnInit } from '@angular/core';
import { debounceTime, throttleTime } from 'rxjs';
import { URLz } from 'src/app/core/enums/url.enum';
import { BaseControlBridgeComponent } from './base-control-w-temp-ref-var.component';

@Component({
  selector: 'di-base-control-dd',
  template: '',
})
//Dropdown
export class BaseControlDDComponent extends BaseControlBridgeComponent implements OnInit {
  override ngOnInit(): void {
    super.ngOnInit();
    if (this.child) this.controlSubscription('DD');
    if (this.load && !this.prelist?.length && !this.preobj) {
      this.loadData(this.parent_id);
    }else if (!this.load && this.parentFC) {
      this.loadByParentFormControl()
    }else if(this.prelist?.length) {
      this.list = [...this.prelist];
    }
  }
  controlSubscription(childType: string) {
    const subs = this.control?.valueChanges?.pipe(
      throttleTime(450) // For Edit Case
      )
      .subscribe((val) => {
        // if (this.url === URLz.ORG) {
        //   this._http.org_id = val;
        // } else if (this.url === URLz.ORG_SYSTEM) {
        //   this._http.sys_id = val;
        // }
        if (childType === 'DD') this.loadChildDD(val);
      });
      this.subscriptionArray.push(subs)
  }
  // For Form Control Parent
  loadByParentFormControl() {
    const subscription = this.parentFC.valueChanges
    .pipe(
      debounceTime(50) // For Param Object to be Set
    )
    .subscribe(val => {
      if (val && !this.stopHit){
        this.loadData(val)
      }
      else {
        this.control?.patchValue('')
        this.list = [];
      }
    })
    this.subscriptionArray.push(subscription)
  }
}
