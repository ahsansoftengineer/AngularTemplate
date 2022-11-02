import { Injectable, Injector } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { RegExps } from '../static/regex';
import { FormService } from './form.service';
import { Custom } from '../static/custom';
import { Validation } from '../interface/validators/validations';
import { ValidatorDate } from '../interface/validators/date';
import { ValidatorParam } from '../interface/validators/param';
import { HttpErrorResponse } from '@angular/common/http';
import { VAL } from '../static/validation-message';
import { AngularServiceInjector } from '../class/angular-service-injector';

@Injectable({
  providedIn: 'root',
})
export class ValidatorService extends AngularServiceInjector {
  _submitted = false;
  _fs: FormService;
  showWarning = false;
  constructor(injector: Injector) {
    super(injector);
    this._fs = injector.get(FormService);
    VAL._translate = this._translate;
  }
  // BELOW METHODS IS TO DISPLAY ERROR MESSAGES
  toTitleCase(str: string) {
    if (str) {
      const field: string = str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      });
      return field.replaceAll('_', ' ').replace('id', '');
    } else return 'No Property Provided';
  }

  /**
   * Retrieves a child control given the control's name or path.
   *
   * @param path A dot-delimited string or array of string/number values that define the path to the
   * control.
   * @param group An instance of a FormGroup default this._fs._form is set
   * @usageNotes
   * ### Retrieve a nested control
   * * `this.form.get('person.name');`
   * * `this.form.get(['person', 'name']);`
   * * `this.form.get('items.0.price');`
   * * `this.form.get(['items', 0, 'price']);`
   */
  errMsg(
    path: string | string[] | FormControl,
    group: FormGroup = this._fs._form
  ) {
    let control: FormControl;
    if (!(path instanceof FormControl)) {
      control = group?.get(path) as FormControl;
    }
    if (control! && control.touched) return this.handleRequired(control);
    return '';
  }
  _error_control(control: FormControl): UnionValidation {
    if (control?.errors) return control?.errors;
  }
  handleRequired(control: FormControl) {
    const errObj = this._error_control(control);
    if (errObj && errObj[this._translate.currentLang]) {
      if (errObj.key == 'ENTER') {
        errObj.en = 'Please enter ' + errObj.lbl;
        errObj.ur = ' براہ کرم'.concat(
          ' ',
          this._translate.instant(errObj.lbl),
          ' ',
          'درج کریں۔'
        );
      } else if (errObj.key == 'SELECT') {
        (errObj.en = 'Please select ' + errObj.lbl),
          (errObj.ur = ' براہ کرم'.concat(
            ' ',
            this._translate?.instant(errObj.lbl),
            ' ',
            'منتخب کریں۔'
          ));
      }
      return errObj[this._translate.currentLang];
    }
  }
  _error_server(httpErrorResponse: HttpErrorResponse) {
    const server_response = httpErrorResponse.error;
    server_response?.errors?.forEach((error) => {
      let msg = error.detail[0].message;
      if (msg.length < 1) msg = 'No Server Error Message Provided';
      this._toastr.error(msg, this.toTitleCase(error.field_name));
    });
  }
  _error_from_success(httpErrorResponse) {
    if (httpErrorResponse.data != undefined && httpErrorResponse.data != null) {
      const error_response = httpErrorResponse.data;
      let msg = error_response?.errors[0]?.fund_category[0]?.message;
      if (msg.length < 1) msg = 'No Server Error Message Provided';
      this._toastr.error(msg, error_response?.errors?.code);
    }
  }
  _toastr_error(heading: string, msg: string) {
    this._toastr.error(msg, heading);
  }
  // BELOW METHODS IS TO ADD VALIDATION TO CONTROLS
  _val(fn: Partial<string> = '', param: Partial<ValidatorParam>) {
    if (param?.maxChar == undefined) param.maxChar = 100;
    if (param?.specialChar == undefined) param.specialChar = 1;
    return (control: AbstractControl): UnionValidation => {
      if (!fn) fn = param?.fn;
      const a = control?.value;
      if (fn && (!a || a == 0)) {
        if (param.authorized != undefined && a == param.authorized) return null;
        if (param.isField == undefined) return VAL.ENTER(fn);
        else return VAL.SELECT(fn);
      } else if (Custom.emptyCheck(a) && a != '0') {
        if (param.maxChar && a.length > param.maxChar)
          return VAL.MAX_CHAR(param.maxChar);
        else if (param.minChar && a.length < param.minChar)
          return VAL.MIN_CHAR(param.minChar);
        else if (!RegExps.WHITE_SPACE.test(a)) return VAL.WHITE_SPACE;
        else if (param.num || param.max || param.min) {
          if (!RegExps.NUM.test(a)) return VAL.NUM;
          else if (a % 1 != 0 && !param.decimal) return VAL.DECIMAL;
          else if (param.min && Number(a) < param.min)
            return VAL.MIN(param.min);
          else if (param.max && Number(a) > param.max)
            return VAL.MAX(param.min);
          else if (!RegExps.POSITIVENUM.test(a)) return VAL.NUM_POS;
          else return null;
        } else if (param.alpha && !RegExps.ALPHA.test(a)) return VAL.ALPHA;
        else if (param.alphaNum && !RegExps.ALPHANUM.test(a))
          return VAL.ALPHANUM;
        else if (param.hypenreg && !RegExps.HYPHEN_REG.test(a))
          return VAL.HYPHEN;
        else if (param.specialChar && RegExps.SPECIALCHARS.test(a))
          return VAL.PATTERN;
        else if (param.email && !RegExps.EMAIL.test(a)) return VAL.EMAIL;
        else if (param.password && !RegExps.PASSWORD.test(a))
          return VAL.PASSWORD;
        else return null;
      }
    };
  }
  // FOR SELECTBOX / AUTOCOMPLETE / RADIOBUTTONS / CHECKBOX
  _vals(fn: string) {
    return (control: AbstractControl): UnionValidation => {
      const a = control?.value;
      if (!a || a == 0) {
        return VAL.SELECT(fn);
      }
    };
  }
  _val_Date(dat: Partial<ValidatorDate>) {
    return (control: AbstractControl): UnionValidation => {
      const b: Date = new Date(control?.value);
      let a;
      if (Custom.emptyCheck(b) && b instanceof Date) {
        a = b?.getTime() ?? '';
      }
      if (Custom.emptyCheck(b)) {
        if (dat?.currentDate != undefined && a != dat?.currentDate?.getTime()) {
          return VAL.DATE_EQUAL;
        } else if (
          b?.toDateString() == dat?.minDate?.toDateString() ||
          b?.toDateString() == dat?.maxDate?.toDateString()
        )
          return null; // when case is >= | <=
        else if (dat?.minDate != undefined && dat?.minDate?.getTime() > a) {
          return VAL.MIN_DATE;
        } else if (dat?.maxDate != undefined && dat?.maxDate?.getTime() < a) {
          return VAL.MAX_DATE;
        } else return null;
      }
    };
  }
  repeatOneField(field1: string) {
    return (array: FormArray): UnionValidation => {
      let repeat = 0;
      array?.controls?.forEach((group) => {
        const fieldA = group?.get(field1);
        array?.controls?.forEach((groups) => {
          const fielda = groups?.get(field1);
          if (
            fieldA?.value == fielda?.value &&
            (fieldA?.valid || fieldA?.errors?.key == 'DUPLICATE')
          ) {
            repeat++;
          }
          if (repeat > 1) {
            fieldA?.setErrors(VAL.DUPLICATE);
            // return VAL.DUPLICATE; // maybe it required
          } else {
            if (fieldA?.errors?.key == 'DUPLICATE') {
              fieldA?.setErrors(null);
            }
          }
        });
        repeat = 0;
      });
      return null;
    };
  }
  repeatTwoFields(field1: string, field2: string) {
    return (array: FormArray): Validation | null => {
      let repeat = 0;
      array?.controls?.forEach((group) => {
        const fieldA = group?.get(field1);
        const fieldB = group?.get(field2);
        array?.controls?.forEach((groups) => {
          const fielda = groups?.get(field1);
          const fieldb = groups?.get(field2);
          // console.log(fieldA.errors?.key)
          if (
            fieldA?.value == fielda?.value &&
            fieldB?.value == fieldb?.value &&
            (fieldA?.valid || fieldA?.errors?.key == 'DUPLICATE') &&
            (fieldB?.valid || fieldB?.errors?.key == 'DUPLICATE')
          ) {
            repeat++;
          }
          if (repeat > 1) {
            fieldA?.setErrors(VAL.DUPLICATE);
            fieldB?.setErrors(VAL.DUPLICATE);
            return VAL.DUPLICATE;
          } else {
            if (fieldA?.errors?.key == 'DUPLICATE') {
              fieldA?.setErrors(null);
            }
            if (fieldB?.errors?.key == 'DUPLICATE') {
              fieldB?.setErrors(null);
            }
          }
          return null;
        });
        repeat = 0;
      });
      return null;
    };
  }
  _matchValidator(firstControl, secondControl, groupone, grouptwo) {
    return (group: FormGroup): UnionValidation => {
      if (group.get(groupone) && group.get(grouptwo)) {
        let repeat = 0;
        const fieldA = group.get([groupone, firstControl]);
        const fieldB = group.get([groupone, secondControl]);
        const fielda = group.get([grouptwo, firstControl]);
        const fieldb = group.get([grouptwo, secondControl]);
        if (fieldA?.value && fieldB?.value && fielda?.value && fieldb?.value) {
          if (
            fieldA?.value == fielda?.value &&
            fieldB?.value == fieldb?.value &&
            (fieldA?.valid || fieldA?.errors?.key == 'DUPLICATE') &&
            (fieldB?.valid || fieldB?.errors?.key == 'DUPLICATE')
          ) {
            repeat++;
          }
          if (repeat >= 1) {
            fieldA?.setErrors(VAL.DUPLICATE);
            fieldB?.setErrors(VAL.DUPLICATE);
            fielda?.setErrors(VAL.DUPLICATE);
            fieldb?.setErrors(VAL.DUPLICATE);
            return VAL.DUPLICATE;
          } else if (
            fieldA?.errors?.key == 'DUPLICATE' ||
            fieldB?.errors?.key == 'DUPLICATE'
          ) {
            fieldA?.setErrors(null);
            fieldB?.setErrors(null);
            fielda?.setErrors(null);
            fieldb?.setErrors(null);
            return null;
          }
        }
      }
    };
  }
  _passwordMatchValidator(field1: string, field2: string) {
    return (group: FormGroup): UnionValidation => {
      const fieldA = group?.get(field1);
      const fieldB = group?.get(field2);
      if (fieldA !== null && fieldB !== null) {
        if (fieldB.value == '') {
          fieldB.setErrors(VAL.CONFIRM);
          return VAL.CONFIRM;
        } else if (fieldA.value != fieldB.value) {
          fieldB.setErrors(VAL.MATCH);
          return VAL.MATCH;
        } else {
          fieldB.setErrors(null);
          return null;
        }
      }
    };
  }
  // FOR LOGGING FORM ERRORS AND WARNINGS
  logForm(
    group: FormGroup | FormArray = this._fs._form,
    groupName = '_fs._form{}'
  ) {
    if (group.invalid) {
      console.group(groupName);
      Object.keys(group.controls).forEach((key: string) => {
        const acc = group.get(key); // Abstract Control
        if (acc instanceof FormGroup || acc instanceof FormArray) {
          const suffix = acc instanceof FormGroup ? '{}' : '[]';
          this.logForm(acc, key + suffix);
        } else if (acc instanceof FormControl) {
          if (acc.status == 'INVALID' || acc.status == 'PENDING') {
            if (this.showWarning) {
              this._toastr.warning(
                this.handleRequired(acc),
                'Validation Error'
              );
            }
            console.error({
              field: key,
              errors: { ...this._error_control(acc) },
            });
          } else if (acc.status == 'VALID') {
            console.warn({
              field: key,
              message: 'No Validator Error',
            });
          }
        }
      });
      console.groupEnd();
    }
  }
}
type UnionValidation = Validation | null | void;
// SERVER SIDE VALIDATION ERROR HANDLING PATTERN
export interface ServerValidationMessage {
  key: VALIDATION_KEY;
  lbl: string; // Business Group, Legal Entity
  violation: string; // (Min / Max) Values => Maximum _100_ characters allowed
}
export enum VALIDATION_KEY {
  SELECT = 'SELECT',
  ENTER = 'ENTER',
  MIN = 'MIN',
  MAX = 'MAX',
  MIN_CHAR = 'MIN_CHAR',
  MAX_CHAR = 'MAX_CHAR',
  HYPHEN = 'HYPHEN',
  NUM = 'NUM',
  NUM_POS = 'NUM_POS',
  ALPHA = 'ALPHA',
  ALPHANUM = 'ALPHANUM',
  PATTERN = 'PATTERN',
  EMAIL = 'EMAIL',
  PASSWORD = 'PASSWORD',
  DATE_EQUAL = 'DATE_EQUAL',
  DATE_MIN = 'DATE_MIN',
  MAX_DATE = 'MAX_DATE',
  DUPLICATE = 'DUPLICATE',
  CONFIRM = 'CONFIRM',
  MATCH = 'MATCH',
}
