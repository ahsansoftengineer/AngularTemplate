import { Directive, Input, TemplateRef, ViewContainerRef } from "@angular/core"
import { ACTION } from "src/app/core/enums/action.enum"
import { StateService } from "src/app/core/service/state.service"

@Directive({
  selector: '[permission]'
})
// This is an Oposite Example of *ngIf Directive

export class PermissionDirective {
  constructor(
    private tr: TemplateRef<any>,
    private vcr: ViewContainerRef,
    private _ss: StateService

  ) { }
  @Input() set permission(action: ACTION | ACTION[]) {
    if (!(action instanceof Array) && this._ss.checkPermission(action)) {
      this.vcr.createEmbeddedView(this.tr)
    } else if ((action instanceof Array)) {
      let hasItem = false
      action.forEach(x => {
        if (this._ss.checkPermission(x)) { hasItem = true }
      })
      if (hasItem) {
        this.vcr.createEmbeddedView(this.tr)
      }
    } else {
      this.vcr.clear()
    }
  }
}
