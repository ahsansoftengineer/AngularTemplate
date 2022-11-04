import { Injectable } from '@angular/core'
import { MatSidenav } from '@angular/material/sidenav'

@Injectable({
  providedIn: 'root'
})
export class SideNavService {
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
