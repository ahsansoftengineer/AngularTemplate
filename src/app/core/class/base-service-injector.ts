import { Component, Injector } from '@angular/core';
import { IMG_URL } from '../constant/image';
import { URLz } from '../enums/url.enum';
import { HttpServiceParam } from '../interface/common/http-service-param';
import { FormService } from '../service/form.service';
import { HTTPService } from '../service/http.service';
import { StateService } from '../service/state.service';
import { SwalService } from '../service/swal.service';
import { ControlStateService } from '../service/control.state.service';
import { Subscription } from 'rxjs';
import { ACTION } from '../enums/action.enum';
import { FormSubmitService } from '../service/form-submit.service';
import { AngularServiceInjector } from './angular-service-injector';
import { ValidatorService } from '../service/base.validator.service';
import { FormHelperService } from '../service/form-helper.service';
import { AppInjector } from '../static/AppInjector';
// In Base Class append all the properties / methods with _ (underscore)

// # 1 SOLID PRINCIPLE (Single Responsibility Principle)
// 1. Single responsibility principle: a class should have one, and only one, reason to change;
// 2. When you only want to Inject a Service
@Component({ template: '' })
export abstract class BaseServiceInjector extends AngularServiceInjector {
  public _http: HTTPService;
  public _fs: FormService;
  public _vs: ValidatorService;
  public _fhs: FormHelperService;
  public _fss: FormSubmitService;
  public _ss: StateService;
  public _css: ControlStateService;
  public _swl: SwalService;

  // Enum Global Property for HTML Template
  public URLz = URLz; // For Template
  public IMG_URL = IMG_URL; // For Template
  public ACTION = ACTION; // For Template (Route Permission)
  public param: HttpServiceParam = {}; // Override this Property for Default Behaviour of HTTP Request

  // Guard Related Properties
  public _activeId: string;
  public _isExist: boolean;
  public _component = 'Override _component property in Component ngOnInit';
  public subscriptionArray: Subscription[] = [];
  constructor() {
    super();
    this._http = AppInjector.get(HTTPService);
    this._fs = AppInjector.get(FormService);
    this._vs = AppInjector.get(ValidatorService);
    this._fhs = AppInjector.get(FormHelperService);
    this._swl = AppInjector.get(SwalService);
    this._css = AppInjector.get(ControlStateService);
    this._ss = AppInjector.get(StateService);
    this._fss = AppInjector.get(FormSubmitService);
  }

  // Future Reference for using ngOnChanges
  // ngOnChanges(changes: SimpleChanges) {
  //   for (const propName in changes) {
  //     if (changes.hasOwnProperty(propName)) {
  //       switch (propName) {
  //         case 'myFirstInputParameter': {
  //           this.doSomething(change.currentValue)
  //         }
  //       }
  //     }
  //   }
  // }
}
