import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import Swal, { SweetAlertOptions, SweetAlertResult } from 'sweetalert2';
import { HttpServiceParam } from '../interface/common/http-service-param';
import { FormService } from './form.service';
import { HTTPService } from './http.service';
import { TranslateService } from '@ngx-translate/core';
import { AngularServiceInjector } from '../class/angular-service-injector';
import { AppInjector } from '../static/AppInjector';
@Injectable({
  providedIn: 'root',
})
export class SwalService extends AngularServiceInjector {
  _http: HTTPService;
  _fs: FormService;
  constructor() {
    super();
    this._fs = AppInjector.get(FormService);
    this._http = AppInjector.get(HTTPService);
    this._translate = AppInjector.get(TranslateService);
  }
  public handleError(error: HttpErrorResponse): Observable<never> {
    return throwError(() => error);
  }
  public swal(
    title: string,
    text: string,
    icon: 'success' | 'error' | 'warning' = 'success'
  ) {
    title = title ? this._translate.instant(title) : title;
    text = text ? this._translate.instant(text) : text;
    return Swal.fire({
      title,
      text,
      icon,
      confirmButtonColor: '#3085d6',
      confirmButtonText: '<i class="fas fa-thumbs-up"></i>',
      reverseButtons: true,
    });
  }
  public noDataFound() {
    this.swal('Warning', 'No Data Available', 'warning');
  }
  public prompts(options: SweetAlertOptions): Promise<SweetAlertResult<any>> {
    const title = this._translate.instant(options.title.toString());
    const text = this._translate.instant(options.text);
    return Swal.fire({
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#cfcfcf',
      confirmButtonColor: '#3085d6',
      cancelButtonText: '<i class="fas fa-times"></i>',
      confirmButtonText: '<i class="fas fa-thumbs-up"></i>',
      reverseButtons: true,
      ...options,
      title,
      text,
    });
  }
  public get formLeave() {
    return this.prompts({
      title: 'Are you sure?',
      text: 'The Changes will be disregard',
    });
  }
  public statusChange(
    status: boolean,
    param: HttpServiceParam,
    handleCondition: (success: boolean) => void
  ) {
    // let statuss = status.activate == 0 ? false : true;
    this.prompts({
      title: 'Are you sure?',
      text: 'Record will be ' + (status ? 'Activated' : 'De-Activated'),
    }).then((result) => {
      if (result.isConfirmed) {
        this._http.status(param).subscribe((res: any) => {
          this.swal(status ? 'Activated' : 'De-Activated', res.message);
          handleCondition(true);
        });
      } else {
        handleCondition(false);
      }
    });
  }
  // Specific to List Build Class Utlized in Next Version
  public status(
    param: HttpServiceParam,
    handleCondition: (success: boolean) => void
  ) {
    this.prompts({
      title: 'Are you sure?',
      text:
        'Record will be ' +
        (param?.body?.activate ? 'Activated' : 'De-Activated'),
    }).then((result) => {
      if (result.isConfirmed) {
        this._http.status(param).subscribe((res: any) => {
          this.swal(
            param?.body?.activate ? 'Activated' : 'De-Activated',
            res.message
          );
          handleCondition(true);
        });
      } else {
        handleCondition(false);
      }
    });
  }
  public UpdateObject(items, item) {
    items.forEach((element, index) => {
      if (element.id === item.id) {
        items[index] = item;
      }
    });
    return items;
  }
}
