import { Injectable, Injector } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SelectOption } from '../../interface/common/select';
import { ValidatorService } from '../../service/base.validator.service';
import { FormService } from '../../service/form.service';

@Injectable()
export class DonorInfoForm {
  _fs: FormService;
  _vs: ValidatorService;
  constructor(injector: Injector) {
    this._fs = injector.get(FormService);
    this._vs = injector.get(ValidatorService);
  }
  initForm(): FormGroup {
    return this._fs._fb.group({
      name: [
        '',
        this._vs._val('Donor Name', { minChar: 3, maxChar: 100, alpha: 1 }),
      ],
      mobile: ['', this._vs._val('Mobile No', { minChar: 11, maxChar: 15 })],
      donor_type_id: ['', this._vs._vals('Donor Type')],
      organisation_id: ['', this._vs._vals('Organization')],
      country_id: ['', this._vs._vals('Country')],
      state_id: ['', this._vs._vals('State')],
      city_id: ['', this._vs._vals('City')],
      organisation: [{ value: '', disabled: true }],
      country: [{ value: '', disabled: true }],
      state: [{ value: '', disabled: true }],
      city: [{ value: '', disabled: true }],
    });
  }
}
// Interface Segregation Principle
export interface DonorInfo {
  id?: number;
  name: string;
  mobile: string;
  organisation_id: string;
  donor_type_id: number;
  country_id: string;
  state_id: string;
  city_id: string;
  city: SelectOption;
  state: SelectOption;
  country: SelectOption;
  organisation: SelectOption;
  donor_type: SelectOption;
}
