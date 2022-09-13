import { Component, Input, OnInit} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BaseControlCommonComponent } from './base-control-y-common.component';

@Component({
  selector: 'di-base-control-bridge',
  template: '',
})
// FORM CONTROL SUBSCRIPTION (Parent / Child) CONTROLs
export class BaseControlSubscriptionComponent extends BaseControlCommonComponent implements OnInit {

  @Input() parentFC: FormControl;
  @Input() parentFCName: string; // Form Control
  @Input() parentGrpName: string; // Merge with ParentGrp
  @Input() parentGrp: FormGroup; // Merge with ParentGrpName

  ngOnInit(): void {
    super.ngOnInit();
    this.setParentForSubscription();
  }
  // For Form Control Parent Control Subscription in Different Structural Directives
  setParentForSubscription(){
    if(this.parentFCName && !this.parentFC){
      if(!this.parentGrpName && this.groupName){
        this.parentGrpName = this.groupName
      } else if(!this.parentGrp && !this.parentGrpName && this.group){
        this.parentGrp = this.group
      }
      this.set_Control(
        this.parentGrp,
        this.parentGrpName,
        (group) => {
        this.parentFC = group.get(this.parentFCName) as FormControl;
      })
    }
  }

}
