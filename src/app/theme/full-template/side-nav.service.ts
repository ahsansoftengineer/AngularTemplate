import { Injectable } from '@angular/core'
import { MatSidenav } from '@angular/material/sidenav'
import { SideBarMenus } from 'src/app/core/interface/common/router-module'

@Injectable({
  providedIn: 'root'
})
export class SideNavService {
  flatSideBarMenus: SideBarMenus[] = [];
  public Left: Partial<MatSidenav> = {
    mode: 'push',
    position: 'start',
    opened: true,
    disableClose: true
  }
  public Right: Partial<MatSidenav> = {
    mode: 'over',
    position: 'end',
    opened: false
  }
  constructor() { }
}
