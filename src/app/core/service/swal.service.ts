import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import Swal, { SweetAlertOptions, SweetAlertResult } from 'sweetalert2';
import { HttpServiceParam } from '../interface/common/http-service-param';
import { FormService } from './form.service';
import { HTTPService } from './http.service';
import { TranslateService } from '@ngx-translate/core';
import { Cash } from '../model/transaction/cash.form';
import { RECEIPT_TYPE } from '../model/transaction/enum';
import { environment } from 'src/environments/environment';
import { URLz } from '../enums/url.enum';
import { AngularServiceInjector } from '../class/angular-service-injector';
@Injectable({
  providedIn: 'root',
})
export class SwalService extends AngularServiceInjector {
  _http: HTTPService;
  _fs: FormService;
  constructor(injector: Injector) {
    super(injector)
    this._fs = injector.get(FormService);
    this._http = injector.get(HTTPService);
    this._translate = injector.get(TranslateService);
  }
  public handleError(error: HttpErrorResponse): Observable<never> {
    return throwError(() => error);
  }
  public swal(
    title: string,
    text: string,
    icon: 'success' | 'error' | 'warning' = 'success'
  ) {
    title = title ? this._translate.instant(title) : title
    text = text ?  this._translate.instant(text)  : text
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
    this.swal(
      'Warning',
      'No Data Available',
      'warning'
    );
  }
  public prompts(options: SweetAlertOptions): Promise<SweetAlertResult<any>> {
    const title = this._translate.instant(options.title.toString())
    const text = this._translate.instant(options.text)
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
      text
    })
  }
  public get formLeave() {
    return this.prompts({
      title: 'Are you sure?',
      text: 'The Changes will be disregard',
    })
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
          this.swal(
            status ? 'Activated' : 'De-Activated',
            res.message)
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
      text: 'Record will be ' + (param?.body?.activate ? 'Activated' : 'De-Activated'),
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
  public cashDepositBankWajiba(type: any, amount: any) {
    this.swal(
      'Error',
      this._translate.instant('DEPOSIT_BANK_WAJIBA', {amount, type}),
      'error'
    );
  }
  // REPLACE THIS WITH swl.swal();
  public genericSwal(text: any = '', icon: any = '', title: any = '') {
    this.swal(title, text, icon)
  }
  public transCancel(
    item: Cash,
    receipt_type: RECEIPT_TYPE
  ) {
    return this.prompts({
      title:  'Are you sure?',
      text: 'Record will be cancel!'
    }).then((result) => {
      if (result.isConfirmed) {
        return this._http
          .modify({
            query: {
              code: item.code,
              row_id: item.row_id,
              receipt_type,
            },
            url: environment.TRANSACTION,
            endpoint: URLz.TRANSACTION,
          })
          .subscribe(() => {
            this.swal(
              'Entry Cancel!',
              'Record cancelled successfully',
            )
            return true;
          });
      } else {
        return false;
      }
    });
  }
  public transBatch(
    batchNumber,
    profileName,
    callBack
  ) {
    if(!batchNumber) ++batchNumber
    this.swal(
      'Warning?',
      this._translate.instant('TRANSACTION_BATCH', {batchNumber, profileName}),
      'warning'
    ).then((result) => {
      if (result.isConfirmed) {
        this._http
          .create({ endpoint: URLz.BATCH_NUM })
          .subscribe(() => {
            this.swal(
              'Success',
              'Batch generated successfully!'
            ).then( ()=> {
              callBack();
            })
          });
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
