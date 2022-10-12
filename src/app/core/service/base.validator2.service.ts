import { Injectable, Injector } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors } from '@angular/forms';
import { MAX_VALIDATOR } from '../constant/constant';
import { RegExps } from '../static/regex';
import { VAL } from '../static/validation-message';

@Injectable({
  providedIn: 'root',
})
export class ValidatorService2 {
  _submitted = false;
  showWarning = false;
  constructor(injector: Injector) {
  }
  // BELOW METHODS IS TO ADD VALIDATION TO CONTROLS
  public AMOUNT(param?: Partial<ValidatorNum>) {
    param = setDefaultNum(param);
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control) return null
      const val = control?.value;
      if (this.emptyCheck(val) && param.required) return VAL.ENTER('');
      else if(!this.emptyCheck(val)){
        if(isNaN(val)) return VAL.NUM
        // else if (param.decimal === 0 && !RegExps.NUM.test(val)) return VAL.NUM;
        else if (Number(val) < param.min) return VAL.MIN(val);
        else if (Number(val) > param.max) return VAL.MAX(val);
        else if (param.decimal !== 0 && !RegExps.DECIMAL(param.decimal).test(val)) {
            return VAL.DECIMAL;
        }
      }
      return null;
    }
  }
  // BELOW METHODS IS TO ADD VALIDATION TO CONTROLS
  public TEXT(param?: Partial<ValidatorText>) {
    param = setDefaultText(param);
    return (control: AbstractControl): any | null => {
      const val = control?.value;
      if (!control) return null
      if (this.emptyCheck(val) && param.required) return VAL.ENTER('')
      else if (!this.emptyCheck(val)) {
        if (param.max && val.length > param.max) return VAL.MAX_CHAR(param.max)
        else if (param.min && val.length < param.min) return VAL.MIN_CHAR(param.min)
        else if (!RegExps.WHITE_SPACE.test(val)) return VAL.WHITE_SPACE
        else if (param.alpha && !RegExps.ALPHA.test(val)) return VAL.ALPHA
        else if (param.alphaNum && !RegExps.ALPHANUM.test(val)) return VAL.ALPHANUM
        else if (param.special != 0 && RegExps.SPECIALCHARS.test(val)) return VAL.PATTERN
        else return null;
      }
    };
  }
  public NUM(param?: Partial<ValidatorNum>) {
    param = { required: 1, min: 11, max: 12, ...param }
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control) return null
      const val = control?.value?.toString();
      if (this.emptyCheck(val) && param.required) return VAL.ENTER('');
      else if(!this.emptyCheck(val)){
        if (isNaN(val)) return VAL.NUM;
        // else if (!RegExps.NUM.test(val)) return VAL.NUM;
        else if (!RegExps.NO_DECIMAL.test(val)) return VAL.DECIMAL;
        else if (val?.length < param.min) return VAL.MIN_CHAR(param.min);
        else if (val?.length > param.max) return VAL.MAX_CHAR(param.max);
      }
      return null;
    }
  }
  public errAMOUNT(
    item: FormGroup,
    field: string,
    label?: string | Partial<ValidatorNum>,
    param?: Partial<ValidatorNum>) {

    if(typeof(label) === 'object') param = label
    param = setDefaultNum(param);
    const control = item?.get(field) as FormControl
    if (control?.touched) {
      const err = control?.errors
      return [
        {
          condition: err?.required,
          error: label + ' is required'
        },
        {
          condition: err?.min,
          error: `Minimum value ${param.min} is allowed`
        },
        {
          condition: err?.max,
          error: `Maximum value ${param.max} is allowed`
        },
        {
          condition: err?.decimal,
          error: `Decimal Precision ${param.decimal} is allowed`
        },
        {
          condition: err?.num,
          error: 'Only numeric values allowed'
        },
      ]
    }
  }
  public errTEXT(
    item: FormGroup,
    field: string,
    label?: string | Partial<ValidatorText>,
    param?: Partial<ValidatorText>) {

    if(typeof(label) === 'object') param = label
    param = setDefaultText(param);
    const control = item?.get(field) as FormControl
    if (control?.touched) {
      const err = control?.errors
      return [
        {
          condition: err?.required,
          error: label + ' is required'
        },
        {
          condition: err?.min,
          error: `Minimum character ${param.min} is allowed`
        },
        {
          condition: err?.max,
          error: `Maximum character ${param.max} is allowed`
        },
        {
          condition: err?.space,
          error: 'White Spaces are not allowed'
        },
        {
          condition: err?.special,
          error: 'Special characters are not allowed'
        },
        {
          condition: err?.alpha,
          error: 'Only alphabets are allowed'
        },
        {
          condition: err?.alphaNum,
          error: 'Only alpha numeric values allowed'
        },

      ]
    }
  }
  public errNUM(
    item: FormGroup,
    field: string,
    label?: string | Partial<ValidatorNum>,
    param?: Partial<ValidatorNum>) {

    if(typeof(label) === 'object') param = label
    param = { required: 1, min: 11, max: 12, ...param }
    const control = item?.get(field) as FormControl
    if (control?.touched) {
      const err = control?.errors
      return [
        {
          condition: err?.required,
          error: label + ' is required'
        },
        {
          condition: err?.min,
          error: `Minimum character ${param.min} is allowed`
        },
        {
          condition: err?.max,
          error: `Maximum character ${param.max} is allowed`
        },
        {
          condition: err?.num,
          error: 'Only numeric values allowed'
        },
        {
          condition: err?.decimal,
          error: `Only whole number is allowed`
        },
      ]
    }
  }
  emptyCheck(val) {
    return (val === '' || val === undefined || val === null)
  }
}
function setDefaultNum(param: Partial<ValidatorNum>) {
  if (!param) param = {};
  if(param.required === undefined) param.required = 1
  if (param.min === undefined) param.min = 0;
  if (param.max === undefined) param.max = MAX_VALIDATOR;
  if (param.decimal === undefined) param.decimal = 2;
  return param;
}
function setDefaultText(param: Partial<ValidatorText>) {
  if (!param) param = {};
  if (param.max === undefined) param.max = 100;
  if (param.pattern === undefined) param.pattern = 1
  if (param.special === undefined) param.special = 1
  if (param.required === undefined) param.required = 1
  if (param.min === undefined && param.required === 1) param.min = 3;
  // if (param.alpha === undefined) param.alpha = 1
  return param;
}
export interface ValidatorNum {
  required: Zero_One
  min: number
  max: number
  decimal: number
}
export interface ValidatorText {
  required: Zero_One
  min: number
  max: number
  special: Zero_One
  alpha: Zero_One
  alphaNum: Zero_One
  pattern: Zero_One

}
type Zero_One = 0 | 1
