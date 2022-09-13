import { Injectable } from '@angular/core';
import { MatDialogConfig } from '@angular/material/dialog';
import { CanActivateChild } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { debounceTime } from "rxjs/operators";
import { HTTPService } from 'src/app/core/service/http.service';
import { StateService } from 'src/app/core/service/state.service';
import { URLz } from 'src/app/core/enums/url.enum';
import { Custom } from 'src/app/core/static/custom';
@Injectable({
  providedIn: 'root',
})
export class StatesGuard  implements CanActivateChild {
  constructor(
    private _http: HTTPService,
    private _ss: StateService,
    private cookieService: CookieService,
    private _dialog: MatDialog
  ) {}
  canActivateChild(): boolean | Observable<any> {
    if (!this.cookieService.check('local_user')) {
      document.location.href = environment.production + 'Login/logout';
    }
    // 1.1 Incase Hierarchy of Server already Saved
    const storedData = localStorage.getItem('permission_data_server');
    let data;
    if (Custom.emptyCheck(storedData)) {
      data = JSON.parse(atob(storedData));
      // To Set Cookie
    }
    // 1.2 Incase Hierarchy of Server Not Saved
    if (!storedData && !data?.profile?.username) {
      return this._http.get({ endpoint: URLz.NO_SET }).pipe(
        tap((res) => {
          const d = res.data.row;
          localStorage.setItem(
            'permission_data_server',
            btoa(JSON.stringify(d))
          );
          // this.openTospopup();
          // 1.3 Incase Hierarchy data Found in Server
          if (d?.profile?.username) {
            this._ss.hierarchy = d;
            // 2.0
            this.savingHierarchyDefault();
            return d;
          }
          // 1.4 Incase Hierarchy data Not Found in Server
          else return of(false);
        })
      );
    }
    else{
      // 2.0
      this.savingHierarchyDefault();
      // 1.1 Incase Hierarchy of Server already Saved
      return of((this._ss.hierarchy = data));
    }
  }
  public targetData;
  openTospopup() {
    if (localStorage["tosPopupData"] == undefined) {
      this._http.get({ endpoint: URLz.NO_SET })
      .pipe(debounceTime(500))
        .subscribe((res) => {
          this.targetData = res?.data?.row;
          if (this.targetData?.target != 0 && this.targetData?.target != null) {
            const config: MatDialogConfig = {
              panelClass: "dialog-responsive",
              data: { source: this.targetData }
            }
            // const dialogRef = this._dialog.open(
            //   MonthlyTargetComponent, config
            // );
            // dialogRef.afterClosed().subscribe();
          }
          localStorage["tosPopupData"] = false;
        })
    }
  }
  // 2.1 Default Selected Hiearachy Set
  savingHierarchyDefault() {
    // 2.1 Default Selected Hiearachy Set
    const storedData = localStorage.getItem('permission_data_local');
    let data;
    if (Custom.emptyCheck(storedData)) {
      data = JSON.parse(atob(storedData));
      this._ss.permission_data_local = data;
    }

    // 1.5 If Only Hierarchy && OU PREFIX STATUS OK
    if (!this._ss?.hierarchy?.status && this._ss.hierarchy?.ou_prefix_status) {
      const h = this._ss.hierarchy;
      this._ss.permission_data_local = {
        organisation_id: h.organisation_id,
        system_id: h.system_id,
        bg: h.bg,
        le: h.le,
        ou: h.ou,
        su: h.su,
        days_limit: h.days_limit,
        display_receipt_date: h.display_receipt_date,
        transaction_receipt_date: h.transaction_receipt_date,
        // Watch it later
        ou_prefix_status: h.ou_prefix_status,
        currency_id: h.currency_id,
        currency: h.currency,
      };
      if (h?.dco) {
        this._ss.permission_data_local.dco = h.dco;
      }
      localStorage.setItem(
        'permission_data_local',
        // Buffer.from(JSON.stringify(this._ss.permission_data_local), 'base64')
        btoa(JSON.stringify(this._ss.permission_data_local))
      );
    }
  }
}
