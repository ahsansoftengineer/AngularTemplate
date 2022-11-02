import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, Injector } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseForm } from 'src/app/core/class/base.form';
import { URLz } from 'src/app/core/enums/url.enum';

@Component({
  selector: 'app-transaction-dialog',
  templateUrl: './transaction-dialog.component.html',
  styleUrls: ['./transaction-dialog.component.css'],
  host: { class: 'col-lg-6 col-sm-12 p-0' }
})
export class TransactionDialogComponent extends BaseForm{
  systemSubscription: any;
  btnDisable = false;
  url = window.location.href;
  constructor(
    public dialogRef: MatDialogRef<TransactionDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    injector: Injector
  ) {
    super(injector);
    dialogRef.disableClose = true;
  }
  _close(): void {
    const hierarchy = this._fs._form.get('hierarchy').value
    if(isList){
      this.dialogRef.close();
    }else {
      this._http.get({
        endpoint: URLz.DEFAULT,
        query: hierarchy
      }).subscribe({
        next: (res) => {
          const data: OU_PREFIX = res?.data?.row
          if(data){
            this.savingPermissionDataLocally(data);
            this.dialogRef.close();
          } else{
            this._vs._toastr_error('Operating Unit', 'Please create prefix for selected OU')
          }
        }
      });
    }
  }
  savingPermissionDataLocally(data: OU_PREFIX){
    // this._ss.permission_data_local = {
    //   ...this._fs._form.get('hierarchy').value,
    //   days_limit: data.days_limit,
    //   display_receipt_date: data.display_receipt_date,
    //   transaction_receipt_date: data.transaction_receipt_date,
    //   ou_prefix_status: data.status,
    //   currency_id: data?.currency_id,
    //   currency: data?.currency
    // }
    // if(this._ss.permission_data_local_status){
    //   // Saving the Current State in local Storage
    //   localStorage.setItem(
    //     'permission_data_local',
    //     btoa(JSON.stringify(this._ss.permission_data_local))
    //   );
    // }else {
    //   localStorage.removeItem('permission_data_local')
    // }
  }
  _disabledButton() : boolean | void {
    if(this._fs._form.get('hierarchy')) return this._fs._form.get('hierarchy').invalid;
  }

  _storePlacement(su){
    if (this.url.indexOf('material') != -1){
      if(su){
        this._http.get({
          endpoint:URLz.DEFAULT,
          query: {su}
        }).subscribe({
          next: () => {
            this.btnDisable = false;
          },
          error: (err: HttpErrorResponse) => {
            this._vs._error_server(err);
            this.btnDisable = true;
          }
         })
      }
    }
  }


  applyClass = { 'col-lg-3': false, 'col-md-4': false, 'col-md-12': true };
  applyDate = { 'col-lg-3': false, 'col-md-4': false, 'col-md-6': true };
}
const isList = window.location.href.indexOf('add') == -1;
interface OU_PREFIX{
  days_limit: number,
  currency_id: string
  currency: {id: string, title: string, symbol: string}
  display_receipt_date: boolean
  status: true
  transaction_receipt_date: Date
}
