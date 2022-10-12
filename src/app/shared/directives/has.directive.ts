import { Attribute, Directive, TemplateRef, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { FormService } from 'src/app/core/service/form.service';
import { BaseControlComponent } from '../component/control/base-control-z.component';

// This directive only works for forms
@Directive({
  selector: '[has]',
  providers: [BaseControlComponent]
})
export class HasDirective {
  control: FormControl;
  subscription;
  constructor(
    public _fs: FormService,
    private tr: TemplateRef<any>,
    private vcr: ViewContainerRef,
    @Attribute('field') public field: string,
    @Attribute('group') public group: FormGroup,
    @Attribute('groupName') public groupName: string,
  ) {
    this.set_Group(
      this.groupName,
      (groupz) => {
        this.control = groupz?.get(this.field) as FormControl;
    })
    this.subscription = this.group.statusChanges
      .pipe(debounceTime(100))
      .subscribe(() => {
      if(this.group && !this.control && this.group.get(this.field)){
        this.control = this.group.get(this.field) as FormControl;
        this.vcr.createEmbeddedView(this.tr);
      } else if(!this.group.get(this.field)) {
        this.control = null;
        this.vcr.clear();
      }
    })

  }
  set_Group(
    groupName: string,
    setControlAction: (group: FormGroup) => void
  ){
    if (groupName) {
      this.group = this._fs._form.get(this.groupName) as FormGroup;
    }
    if (!this.group) {
      this.group = this._fs._form as FormGroup;
    }
    if(this.group){ setControlAction(this.group)}
  }
  ngOnDestroy(){
    this.subscription?.unsubscribe()
  }
}
