import { Component, Input } from '@angular/core';
import { throttleTime } from 'rxjs';
import { BaseControlSubscriptionComponent } from './base-control-x-subscription.component';

@Component({
  selector: 'di-base-control-bridge',
  template: '',
})
//Dropdown
export class BaseControlBridgeComponent extends BaseControlSubscriptionComponent {
  // TEMPLATE REF VARIALBLE (Parent / Child) CONTROLs
  @Input() child: BaseControlBridgeComponent; // Will be deleted in next version
  @Input() canLoadChild = true; // Stopping to Load Child in Edit Case of Transaction

  // For Template Reference Variable Child
  loadChildDD(
    id: string = this.parent_id,
    child: BaseControlBridgeComponent = this.child
  ) {
    if (child && this.emptyCheck(id) && this.canLoadChild) {
      child.param.query = {
        ...child.param.query,
      };
      child.param.query[this.key_parent_id] = id;
      const subs = this._http
        .select(child.mergeParam(child.param))
        .pipe(throttleTime(450))
        .subscribe((res) => {
          child.list = res.data.records;
          // Check for Initial Case
          if (child?.list?.length == 0) {
            child.control.patchValue('');
          } else if (child?.list?.length == 1) {
            child?.control?.patchValue(child?.list[0]?.id);
            child.setObjectInForm(child?.list[0]);
          } else if (child.list?.length > 1) {
            let hasCurrentValue = false;
            child.list.forEach((childlist) => {
              if (childlist?.id == child?.control?.value)
                hasCurrentValue = true;
            });
            if (!hasCurrentValue) this.setChildEmpty(child);
            if (hasCurrentValue)
              child?.control?.patchValue(child?.control?.value);
          }
        });
      this.subscriptionArray.push(subs);
    }
    // In Case Reseting Form
    else if (this.canLoadChild) {
      this.setChildEmpty(child);
      child.list = [];
    }
  }
  setChildEmpty(childz: BaseControlBridgeComponent) {
    if (childz?.child) {
      if (childz?.child?.list) childz.child.list = null;
      this.setChildEmpty(childz?.child);
    }
    childz?.control?.patchValue(null);
  }
}
