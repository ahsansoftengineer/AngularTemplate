import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { AngularServiceInjector } from '../class/angular-service-injector';
import { HttpServiceParam } from '../interface/common/http-service-param';
import { PartialSubmit } from '../interface/common/partial-submit';
import { ValidatorService } from './base.validator.service';
import { FormHelperService } from './form-helper.service';
import { FormService } from './form.service';
import { HTTPService } from './http.service';
import { SwalService } from './swal.service';
// This service is dependent on below service
// _http: HTTPService;
// _fs: FormService;
// _vs: ValidatorService;
// _fhs: FormHelperService;
@Injectable({
  providedIn: 'root',
})
// Pure Function Service
export class FormSubmitService extends AngularServiceInjector{
  _http: HTTPService;
  _fs: FormService;
  _vs: ValidatorService;
  _fhs: FormHelperService;
  _swl: SwalService
  constructor(injector: Injector) {
    super(injector)
    this._http = injector.get(HTTPService)
    this._fs = injector.get(FormService)
    this._vs = injector.get(ValidatorService)
    this._fhs = injector.get(FormHelperService)
    this._swl = injector.get(SwalService)
  }
  _onSubmity(ps: PartialSubmit = this.defaultBehaviour): boolean | void {
    ps = this.mergeSubmitParam(ps)
    ps.before(ps);
    ps.mergeHTTPParam(ps);
    if (ps.validate(ps)) return false;
    ps.body(ps);
    ps.confirmation(ps);
  }
  beforeSubmit = (): void => {
    this._fs._form.markAllAsTouched();
    this._vs._submitted = true;
    this._vs._toastr.clear();
    this._vs.logForm();
  }
  validate = (): boolean => {
    return this._fs._form.invalid
  }
  confirmationMessage = (ps: PartialSubmit) => {
    this._swl.prompts({
      title: 'Confirm ' + (ps._activeId ? 'Edit' : 'Save'),
      text: 'Are you sure the information is correct?'
    }).then(result => {
      if (result.isConfirmed) {
        ps.confirmationAction(ps)
      } else {
        ps.confirmationDeny(ps)
      }
    });
  }
  confirmationAction = (ps: PartialSubmit) => {
    ps.modify = ps.modifyCondition(ps) ? ps.update(ps) : ps.create(ps)
    ps.httpCall(ps)
  }
  confirmationDeny = (ps: PartialSubmit) => {}
  modifyCondition = (ps: PartialSubmit): boolean => {
    return (
      ps._activeId != '' &&
      ps._activeId != null &&
      ps._activeId != undefined
    )
  }
  setBody = (ps: PartialSubmit) => {
    ps.param.body = this._fs._form.value;
  }
  update = (ps: PartialSubmit): Observable<any> => {
    this._fs._form.addControl(ps.id, new FormControl(ps._activeId));
    if(ps._activeId) {
      if(!ps.param?.query) ps.param.query = {}
      ps.param.query[ps.id] = ps?._activeId
    }
    return this._http.update(ps.param);
  }
  create = (ps: PartialSubmit): Observable<any> => {
    return this._http.create(ps.param);
  }
  httpCall = (ps: PartialSubmit) => {
    ps.modify.subscribe({
      next: (res) =>{ ps.next(ps, res)},
      error: (errorz: HttpErrorResponse) => {
        ps.error(ps, errorz)
      },
      complete: () => ps?.complete(ps)
    });
  }
  httpNextHandler = (ps: PartialSubmit, res: any) => {
    Swal.fire({
      title: this._translate.instant(ps._activeId ? 'Updated' : 'Created'),
      text:  this._translate.instant(res.message),
      icon: 'success',
      confirmButtonColor: '#3085d6',
      confirmButtonText: '<i class="fas fa-thumbs-up"></i>',
    }).then(() => {
      ps.httpResultAction(ps, res)
    });
  }
  httpErrorHandler = (
    ps: PartialSubmit,
    httpErrorResponse: HttpErrorResponse
  ) => {
    this._vs._error_server(httpErrorResponse);
  }
  httpCompleteHandler = (ps: PartialSubmit) => {}
  swalAction = () => {
    this._fs._form.reset();
    this._fhs._switch();
  }
  mergeSubmitParam = (ps: PartialSubmit) => {
    return {...this.defaultBehaviour, ...ps}
  }
  mergeHTTPParamForm = (ps: PartialSubmit) => {
    ps.param = this.mergeParam(ps);
  }
  defaultBehaviour: PartialSubmit = {
    // param: this.param, //: HttpServiceParam
    before: this.beforeSubmit,
    mergeHTTPParam: this.mergeHTTPParamForm,
    validate: this.validate,
    body: this.setBody,
    confirmation: this.confirmationMessage,
    confirmationAction: this.confirmationAction,
    confirmationDeny: this.confirmationDeny,
    modifyCondition: this.modifyCondition,
    update: this.update,
    create: this.create,
    httpCall: this.httpCall,
    next: this.httpNextHandler,
    error: this.httpErrorHandler,
    complete: this.httpCompleteHandler,
    httpResultAction: this.swalAction,
    id:'id'
  }
  mergeParam(ps: PartialSubmit): HttpServiceParam {
    return { ...ps.defaultHttpParam, ...ps.param };
  }
}
