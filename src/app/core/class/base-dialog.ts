import { Component, Injector } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { HTTPService } from '../service/http.service';
import { StateService } from '../service/state.service';
import { AppInjector } from '../static/AppInjector';
@Component({ template: '' })
export abstract class BaseDialog {
  // Services Injection
  _ss: StateService;
  _http: HTTPService;
  _router: Router;
  // dialogRef: MatDialogRef<BaseDialog>

  constructor() {
    this._ss = AppInjector.get(StateService);
    this._http = AppInjector.get(HTTPService);
    this._router = AppInjector.get(Router);
    // this.dialogRef = AppInjector.get(MatDialogRef<BaseDialog>)
  }
}
