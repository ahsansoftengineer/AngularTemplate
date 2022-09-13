/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import {
  ActivatedRouteSnapshot,
  CanActivateChild,
  RouterStateSnapshot,
} from '@angular/router';
import { last, map, mergeMap, Observable, of } from 'rxjs';
import { URLz } from '../enums/url.enum';
import { HTTPService } from '../service/http.service';
import { MonthlyTargetComponent } from '../shared/components/dialogs/monthly-target/monthly-target.component';

@Injectable({
  providedIn: 'root',
})
export class MonthlyTargetGuard implements CanActivateChild {
  constructor(
    private _http: HTTPService,
    private _dialog: MatDialog
  ) {}
  canActivateChild():  Observable<any> {
    if (localStorage.tosPopupData == undefined) {
      return this._http.get({ endpoint: URLz.MONTHLY_TARGET })
      .pipe(
        // This is the main part we are interest in last result set
        last(),
        // flatMap is deprecated alternate
        // mergeMap returns simple object not observable
        mergeMap(res => {
          const targetData = res.data.row
          if (targetData?.target != 0 && targetData?.target != null) {
            const config: MatDialogConfig = {
              panelClass: "dialog-responsive",
              data: { source: targetData }
            }
            let dialogRef: MatDialogRef<MonthlyTargetComponent, any>
            dialogRef =  this._dialog.open(MonthlyTargetComponent, config);
            // It is returning Observable
            return dialogRef.afterClosed().pipe(
              // map returns Observable
              map(res => this.returnable))
          } else  return this.returnable
        })
      )
    } else return this.returnable
  }
  get returnable() {
    localStorage.tosPopupData = false;
    return of(true);
  }
}
