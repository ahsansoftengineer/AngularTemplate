import { Component, Injector, OnDestroy } from '@angular/core';
import { PartialSubmit } from '../interface/common/partial-submit';
import { BaseJoinAction } from './base-join-actions';
@Component({ template: '' })
export abstract class BaseForm extends BaseJoinAction implements OnDestroy {
  // Services Injection
  constructor() {
    super();
    this.resetProperties();
  }
  /**
   * @deprecated USE _onSubmity(param: HttpServiceParam) Instead
   */
  _onSubmit() {
    return this._onSubmity({ param: this.param, id: 'id' });
  }
  // HTTPService (CREATE UPDATE)
  // # SOLID (Open-closed Principle)
  // Objects or entities should be open for extension, but closed for modification.
  /**
   * @see {@link PartialSubmit}
   * @param {param} HttpServiceParam @see {@link HttpServiceParam}
   * @returns boolean | void
   */
  _onSubmity(ps: PartialSubmit = this._fss.defaultBehaviour): boolean | void {
    ps.defaultHttpParam = this.param;
    ps._activeId = this._activeId;
    return this._fss._onSubmity(ps);
  }
  override ngOnDestroy(): void {
    super.ngOnDestroy();
    this._css.looseControlState.forEach((x) => {
      // this._css._ddOneTimeLoad[x] = undefined;
      this._css.loading = this._css.loading.slice(
        this._css.loading.indexOf(x),
        1
      );
    });
  }
}
