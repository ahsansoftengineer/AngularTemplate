import { Injectable, Injector } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ValidatorService } from './base.validator.service';
import { FormService } from './form.service';
import {
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Custom } from '../static/custom';
import { AngularServiceInjector } from '../class/angular-service-injector';
@Injectable({
  providedIn: 'root',
})
export class FormHelperService extends AngularServiceInjector {
  _fs: FormService;
  _vs: ValidatorService;
  _pathLocation: string;
  _prepath: string;

  date: Date;
  constructor(public override injector: Injector) {
    // Service Injection
    super(injector);
    this._fs = injector.get(FormService);
    this._vs = injector.get(ValidatorService);
  }

  // GET CURRENT DATE AND TIME
  _getCurrentdatenadTime() {
    this.date = new Date();
    return this._datePipe.transform(new Date(), 'dd-MMM-yyyy h:mm a');
  }

  // DATE CONVERTER
  _dateConverter(date: string) {
    return this._datePipe.transform(date, 'dd-MMM-yyyy h:mm a');
  }

  // DATE ONLY
  _dateOnly(date = new Date()) {
    return this._datePipe.transform(date, 'yyyy-MM-dd');
  }

  _LastSixMonthDate(lastMonths) {
    this.date = new Date();
    return this._datePipe.transform(
      this.date.setMonth(this.date.getMonth() - lastMonths, 1),
      'yyyy-MM-dd'
    );
  }

  // DATE WITH MONTH
  _dateOnlyWithMonth(date) {
    return this._datePipe.transform(date, 'yyyy-MMM-dd');
  }

  openSnackBar(message, action, horizontal, vertical) {
    const InSec = 3;
    const horizon: MatSnackBarHorizontalPosition = horizontal;
    const vert: MatSnackBarVerticalPosition = vertical;
    this._snackBar.open(message, action, {
      horizontalPosition: horizon,
      verticalPosition: vert,
      duration: InSec * 1000,
    });
  }
  // SWITCH TO ANOTHER COMPONENT
  _switch(pathLocation: string = this._pathLocation) {
    this._fs._form.reset();
    this._router.navigate([pathLocation]);
  }

  removeEmpty(obj) {
    return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v != ''));
  }

  // RELOAD COMPONENT WITHOUT REFRESH
  reloadComponent() {
    const currentUrl = this._router.url;
    this._router.routeReuseStrategy.shouldReuseRoute = () => false;
    this._router.onSameUrlNavigation = 'reload';
    this._router.navigate([currentUrl]);
  }

  reloadCmpNew() {
    let currentUrl = this._router.url;
    this._router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this._router.navigate([currentUrl]);
      console.log(currentUrl);
    });
  }

  _getCurrentModule() {
    return this._cookie.get('current_module');
  }
  // DROP DOWN SELECT VALUE
  _dd_selected(
    control: string,
    value: string,
    form: FormGroup = this._fs._form
  ) {
    return form.value[control] === value;
  }

  // CHECK FILED EXIST
  _has(fieldName: string, fg: FormGroup = this._fs._form) {
    return fg?.contains(fieldName);
  }

  _hasVal(fieldName: string, fg: FormGroup = this._fs._form) {
    return Custom.emptyCheck(this._getVal(fieldName, fg));
  }

  _hasGroup(groupName: string, fieldName: string) {
    const group = this._fs._form?.get(groupName) as FormGroup;
    return group?.contains(fieldName);
  }

  _getVal(control: string, group: FormGroup = this._fs._form) {
    return group?.get(control)?.value;
  }

  _checkBoxChecked(val, fieldname) {
    const selectedArray: FormArray = this._fs._form.get(fieldname) as FormArray;
    if (val.target.checked) {
      selectedArray.push(new FormControl(val.target.value));
    } else {
      let i = 0;
      selectedArray.controls.forEach((ctrl: FormControl) => {
        if (ctrl.value == val.target.value) {
          selectedArray.removeAt(i);
          return;
        }
        i++;
      });
    }
    console.log(selectedArray);
  }

  _disableBtn(fieldname) {
    const formArr: FormArray = this._fs._form.get(fieldname) as FormArray;
    return formArr?.value?.length > 0;
  }

  _getURLParam(queryParam: string) {
    return this._activeRoute.snapshot.paramMap.get(queryParam);
  }

  _disable(fieldName: string, fg: FormGroup = this._fs._form) {
    return fg?.get(fieldName)?.disabled;
  }
  _hasRoute(_path) {
    const _url = window.location.pathname;
    return _url.includes(_path);
  }
}
