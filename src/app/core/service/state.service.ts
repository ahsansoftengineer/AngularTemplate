import { Injectable, Injector } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ACTION } from '../enums/action.enum';
import { Permission, SideBarMenus } from '../interface/common/router-module';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  // TRANSACTION
  sideBarMenus: SideBarMenus[];
  permission: Permission[];
  transBatch = true;
  public isLoading = new BehaviorSubject(false);
  lng: string;
  constructor(public injector: Injector) {
    this.lng = 'en';
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
