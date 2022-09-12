import { Component, Injector } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { HTTPService } from '../service/http.service';
import { StateService } from '../service/state.service';
@Component({template: ''})
export abstract class BaseDialog {
  // Services Injection
  _ss: StateService
  _http: HTTPService
  _router: Router
  // dialogRef: MatDialogRef<BaseDialog>

  constructor(public injector: Injector) {
    this._ss = injector.get(StateService)
    this._http = injector.get(HTTPService)
    this._router = injector.get(Router)
    // this.dialogRef = injector.get(MatDialogRef<BaseDialog>)
  }
}
