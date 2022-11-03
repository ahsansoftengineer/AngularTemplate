import { Injector, Pipe, PipeTransform } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ValidatorService } from 'src/app/core/service/base.validator.service';
import { AppInjector } from 'src/app/core/static/AppInjector';

@Pipe({
  name: 'errorMsg',
})
// Not in Use
export class ErrorMessagePipe implements PipeTransform {
  _vs: ValidatorService;
  constructor(injector: Injector) {
    this._vs = AppInjector.get(ValidatorService);
  }
  transform(control: FormControl, ...args: unknown[]): string {
    return '';
    // return this._vs._error_control(control)?.message;
  }
}
