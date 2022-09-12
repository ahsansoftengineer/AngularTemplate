import { Injectable, Injector } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ValidatorService } from '../../service/base.validator.service';
import { FormService } from '../../service/form.service';

@Injectable()
export class DonorAddInfoForm {
  _fs: FormService
  _vs: ValidatorService;
  constructor(injector: Injector) {
  this._fs = injector.get(FormService)
  this._vs = injector.get(ValidatorService);
  }
  initForm(): FormGroup {
    return this._fs._fb.group({
      email: ['', this._vs._val('', {email: 1})],
      gender: ['male'],
      address: ['', this._vs._val('', {specialChar: 1})],
    });
  }
}
// Interface Segregation Principle
// Basic Donor Info
export interface DonorAddInfo {
  gender?: string;
  email?: string;
  address?: string;
}
