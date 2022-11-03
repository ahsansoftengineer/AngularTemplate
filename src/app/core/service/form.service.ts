import { Injectable, Injector } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AngularServiceInjector } from '../class/angular-service-injector';

@Injectable({
  providedIn: 'root',
})
export class FormService extends AngularServiceInjector {
  _form: FormGroup;
  constructor() {
    super();
    this._form = this._fb.group({});
  }
}
