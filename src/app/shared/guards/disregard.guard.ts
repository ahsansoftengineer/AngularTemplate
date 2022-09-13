/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  ActivatedRouteSnapshot,
  CanActivateChild,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { FormService } from 'src/app/core/service/form.service';
import { SwalService } from 'src/app/core/service/swal.service';

@Injectable({
  providedIn: 'root',
})
export class DisregardGuard implements CanActivateChild {
  constructor(
    private _fs: FormService,
    private _swl: SwalService,
    private _dialog: MatDialog
  ) {}
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<any> | Promise<boolean> {
    // this._ss?.permission?.find(x => x == ACTION.ADD || x == ACTION.EDIT)
    if (this._fs?._form?.dirty && this._fs?._form?.touched) {
      return this._swl.formLeave.then((x) => {
          if (x.isConfirmed) {
            this._fs._form.reset();
            this._dialog.closeAll();
          }
          return x.isConfirmed;
        });
    } else {
      this._fs._form.reset();
      this._dialog.closeAll();
      return of(true);
    }
  }
}
