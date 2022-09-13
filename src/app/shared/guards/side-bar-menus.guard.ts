import { Injectable } from '@angular/core';
import { CanActivateChild, RouterModule } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { ROUTES } from '../constant/vertical-menu-items';
import { URLz } from '../enums/url.enum';
import { SideBarMenus } from '../interface/common/router-module';
import { HTTPService } from '../service/http.service';
import { StateService } from '../service/state.service';
import { Custom } from '../static/custom';


@Injectable({
  providedIn: 'root',
})
export class SideBarMenusGuard implements CanActivateChild {
  items = new BehaviorSubject<RouterModule[]>(ROUTES);
  constructor(
    private _http: HTTPService,
    private _ss: StateService,
    private cookie: CookieService
  ) {}
  canActivateChild(): boolean | Observable<any> {
    // # DEV
    return this.items.pipe(
      tap(res => {
        this.setSideBarMenus(res)
        return this._ss.sideBarMenus = res
      }
    ))
    // 1.1 Incase Hierarchy of Server already Saved
    const storedData = localStorage.getItem('sideBarMenus');
    let data: SideBarMenus[];
    if (Custom.emptyCheck(storedData)) {
      data = JSON.parse(atob(storedData));
    }
    if (!data) {
      return this.getAll().pipe(
        tap((res) => {
          data = res?.data?.records;
          this.setSideBarMenus(data);
          localStorage.setItem('sideBarMenus', btoa(JSON.stringify(data)));
        })
      );
    } else {
      this.setSideBarMenus(data);
      return of(true);
    }
  }
  getAll() {
    const current_module = this.cookie.get('current_module');
    return this._http.gets({
      endpoint: URLz.MODULE_LIST,
      query: {
        current_module,
      },
    });
  }
  setSideBarMenus(arr: SideBarMenus[]) {
    this._ss.sideBarMenus = arr;
    if (!this._ss.flattenSideBarMenus) {
      this.transformedArray = [];
      this.flatten(arr);
      this.transformedArray
        .sort((a, b) => {
          const x = a.path.toLowerCase();
          const y = b.path.toLowerCase();
          if (x < y) return -1;
          if (x > y) return 1;
          return 0;
        })
        .reverse();
      this._ss.flattenSideBarMenus = this.transformedArray;
      // console.log(this._ss.flattenSideBarMenus)
    }
  }
  transformedArray: SideBarMenus[] = [];
  // Function Hoisting Example
  public flatten(arr: SideBarMenus[]) {
    arr?.forEach((itm) => {
      if (itm?.submenu?.length > 0) this.flatten(itm.submenu);
      itm?.permission?.forEach((tm) => {
        if (tm?.subPermission) this.flatten(tm?.subPermission);
      });
      if(itm.path){
        this.transformedArray.push({
          title: itm.title,
          path: itm.path,
          permission: itm.permission,
        });
      }
    });
  }
}
