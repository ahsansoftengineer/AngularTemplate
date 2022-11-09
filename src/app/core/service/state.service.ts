import { Injectable, Injector } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ROUTEZ } from '../constant/menu-items';
import { ACTION } from '../enums/action.enum';
import { Permission, SideBarMenus } from '../interface/common/router-module';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  // TRANSACTION
  sideBarActive: string = '';
  sideBarMenus: SideBarMenus[];
  sideBarMenusFlat: SideBarMenus[] = [];
  permission: Permission[];
  transBatch = true;
  public isLoading = new BehaviorSubject(false);
  lng: string;
  constructor(public injector: Injector) {
    this.lng = 'en';
    ROUTEZ.forEach(x => {
      this.flatSideBarMenu(x);
    })
  }
  flatSideBarMenu(menu: SideBarMenus){
    this.sideBarMenusFlat.push(menu)
    if(menu.submenu.length) {
      menu.submenu.forEach(y => {
        this.flatSideBarMenu(y)
      })
    }
  }
  public checkPermission(action: ACTION) {
    return this.permission?.find((a) => a.name == action);
  }
  public EDUCTION = [
    { id: 'middle', title: 'Middle' },
    { id: 'matric', title: 'Matric' },
    { id: 'inter', title: 'Inter' },
    { id: 'graduation', title: 'Graduation' },
    { id: 'masters', title: 'Masters' },
  ];
  public GENDER = [
    { id: 'male', title: 'Male' },
    { id: 'female', title: 'Female' },
  ];
}
