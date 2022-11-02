import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { ACTION } from 'src/app/core/enums/action.enum';
import {
  FlattenSideBarMenus,
  Permission,
} from 'src/app/core/interface/common/router-module';
import { StateService } from 'src/app/core/service/state.service';

@Injectable({
  providedIn: 'root',
})
export class PermissionGuard implements CanActivateChild {
  constructor(private _ss: StateService, private _router: Router) {}
  private path: string;
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    const pd: ACTION[] = childRoute.data?.permission;
    this.path = state.url;
    // No Check Conditions
    if (
      !pd ||
      state.url.indexOf('error') != -1 ||
      pd?.findIndex((x) => x == ACTION.EVERY) != -1
    ) {
      this._ss.permission = [];
      return true;
    } else if (pd && pd?.findIndex((x) => x == ACTION.NO_ACTION) != -1) {
      this._ss.permission = [];
      return false;
    }
    this.setPermissionToRoute(this._ss['flattenSideBarMenus']);
    // console.log(this._ss?.permission)
    // PREPARE AUTH CONDITIONS
    const intersection: Permission[] = this._ss?.permission.filter((element) =>
      pd?.includes(element.name)
    );
    const editCase = state.url.toLowerCase().indexOf('id=') != -1;
    const checkCase = (action: ACTION) => {
      return intersection?.find((x) => x.name == action);
    };
    // REDIRECT BASE ON CONDITIONS
    if (checkCase(ACTION.VIEW)) return of(true);
    if (editCase && checkCase(ACTION.EDIT)) return of(true);
    else if (!editCase && checkCase(ACTION.ADD)) return of(true);
    else {
      // Check Whether the Route Exsist then go a head other wise 404
      return this.navigateTo404();
    }
  }
  setPermissionToRoute(arr: FlattenSideBarMenus[]) {
    this._ss.permission = [];
    let oneTime = true;
    arr?.forEach((itm) => {
      if (itm.path && this.path?.indexOf(itm.path) != -1 && oneTime) {
        oneTime = false;
        this._ss.permission = JSON.parse(JSON.stringify(itm.permission));
      }
    });
  }
  navigateTo404() {
    this._router.navigate(['/error/unauthorized']);
    return of(false);
  }
}
