import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { debounceTime, throttleTime } from 'rxjs';
import { URLz } from 'src/app/core/enums/url.enum';
import { ChangeEvent } from 'src/app/core/interface/common/change-event';
import { SelectOption } from 'src/app/core/interface/common/select';
import { BaseControlComponent } from './base-control-z.component';

@Component({
  template: '',
})
//Dropdown
export class BaseControlCommonComponent
  extends BaseControlComponent
  implements OnInit
{
  // Will be replace by param
  @Input() url: URLz;
  @Input() load = true;
  @Input() both = false; // Automatically Load and When Parent Changed then Load
  @Input() stopHit = false;
  @Input() prelist: SelectOption[] = [];
  @Input() preobj: SelectOption;
  @Input() key_id = 'id';
  @Input() key_title = 'title';
  @Input() key_code = 'code';
  @Input() key_parent_id = 'parent_id';
  // For Setting Select Objects in Form (Edit & Copied Purpose)
  @Input() key_select: string; // donation_type_id -> donation_type
  @Input() key_select_subscription: string;
  @Input() parent_id: string;

  @Input() retainState = false;
  // Variable and Function Hoisting in JavaScript
  // By doing that I can override this variable in Parent Component
  @Input() renderRow = (data) => {
    return data?.title;
  };
  // tslint:disable-next-line: no-output-rename
  @Output('changeEvent') changeEvents = new EventEmitter<ChangeEvent>();
  list: SelectOption[] = [];
  override ngOnInit(): void {
    super.ngOnInit();
    if (this.url) {
      this.defaultParam.endpoint = this.url;
    }
    if (this.parent_id) {
      if (!this.defaultParam?.query) this.defaultParam.query = {};
      this.defaultParam.query[this.key_parent_id] = this.parent_id;
    }

    this.setObjectInForm();
    // Subscribe to Object to Load Data
    if (this.key_select_subscription) this.loadByObject();
  }
  // Concern to DDD / AC Specific
  // Once Loaded Control cannot have Parent
  onceLoad(
    handleChild = () => {
      return;
    }
  ) {
    if (this._css.loading.indexOf(this.field) == -1) {
      this._css.loading.push(this.field);
      this._http.select(this.mergeParam(this.param)).subscribe((res) => {
        this.list = this._css._ddOneTimeLoad[this.field] = res.data.records;
        if (this.list?.length === 1) {
          // if(!this.disabled)
          this.control.patchValue(this.list[0].id);
        }
      });
    } else {
      this.list = this._css._ddOneTimeLoad[this.field];
      // Wait Until Stack to be Cleared
      setTimeout(() => {
        handleChild();
      });
    }
  }
  public changeEvent(itm, event) {
    const changeEvnt: ChangeEvent = {
      ...this.nullObject,
      event,
    };
    if (itm?.id) {
      changeEvnt.id = itm.id;
      changeEvnt.code = itm[this.key_id];
      changeEvnt.obj = itm;
    }
    this.changeEvents?.emit(changeEvnt);
    // PATCHING DROP DOWN OBJECT IN GROUP FOR COPY IN ARRAY
    if (changeEvnt?.event?.isUserInput) {
      const group = this.group?.get(this.key_select);
      if (group) {
        group.patchValue(changeEvnt.obj);
      }
    }
  }
  nullObject = {
    who: this.field,
    id: null,
    code: null,
    obj: {},
    event: null,
    response_length: this.list?.length,
  };
  // Merge Them loadChild & loadChildDD;
  loadData(parent_id = this.parent_id) {
    this.param.query = {
      ...this.param.query,
    };
    this.param.query[this.key_parent_id] = parent_id;
    this._http
      .select(this.mergeParam(this.param))
      .pipe(
        debounceTime(100), // Param Object needs to be set
        throttleTime(400)
      )
      .subscribe((res) => {
        this.list = res.data.records;
        // Condition Only of DD Multi Select Only
        // if(!(this instanceof DdMultiIithis)){
        if (this.list?.length == 0) {
          this.control?.patchValue('');
        } else if (this.list?.length == 1) {
          this.control?.patchValue(this?.list[0].id);
          this.setObjectInForm(this?.list[0]);
        } else if (this.list?.length > 1) {
          let hasCurrentValue = false;
          this.list.forEach((parentList) => {
            if (parentList.id == this.control?.value) {
              hasCurrentValue = true;
            }
          });
          if (hasCurrentValue) {
            this.control.patchValue(this.control?.value);
          }
        }
        // }
      });
  }
  // UNIQUE CASEs
  // Saving SelectOption Object in Form for Copy Purpose
  notIteminList = false;
  setObjectInForm(_select: SelectOption = null) {
    // Form Object Case
    if (!this.preobj && _select == null) {
      if (!this.key_select) {
        this.key_select = this.field.slice(0, this.field.lastIndexOf('_'));
      }
      // When Initially Set Object in Form
      if (this.emptyCheck(this.group?.get(this.key_select)?.value)) {
        this.preobj = this.group?.get(this.key_select).value;
      }
    }
    if (_select != null && this.group?.get(this.key_select)) {
      this.preobj = _select;
      this.group?.get(this.key_select)?.patchValue(_select);
    }
    // When Updating Exsisting Form
    if (this.group?.get(this.key_select)) {
      const subs = this.group
        ?.get(this.key_select)
        ?.valueChanges?.subscribe((x) => {
          this.notIteminList = false;
          if (x) {
            if (this.list.findIndex((y) => y.id == x.id) == -1) {
              this.preobj = x;
              this.notIteminList = true;
            }
          }
        });
      this.subscriptionArray.push(subs);
    }
  }
  // When Loading data by Id
  // For Subscribing the Object availaible in
  // e.g. mateiral_item_id -> material_item -> itm_buyunit
  loadByObject() {
    const subs = this.group
      .get(this.key_select_subscription)
      .valueChanges.subscribe((obj) => {
        if (obj) {
          this.loadData(obj[this.key_id]);
        } else {
          this.list = [];
          this.control.patchValue('');
        }
      });
    this.subscriptionArray.push(subs);
  }
}
