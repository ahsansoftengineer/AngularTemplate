import { Injectable, Injector } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';
import { ACTION } from '../enums/action.enum';
import { Hierarchy, TransactionHierarchyState } from '../interface/common/hierarchy';
import { MonthlyTarget } from '../interface/common/monthly-target';
import { FlattenSideBarMenus, Permission, SideBarMenus } from '../interface/common/router-module';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  // TRANSACTION
  hierarchy: Hierarchy; // Server State Stored Here
  permission_data_local_status = false;
  permission_data_local: TransactionHierarchyState
  sideBarMenus: SideBarMenus[];
  flattenSideBarMenus: FlattenSideBarMenus[];
  permission: Permission[];
  transBatch = true;
  monthlyTarget: MonthlyTarget;
  userId: string;
  // For Ngx Loading Spinner
  public isLoading = new BehaviorSubject(false);
  lng: string;
  constructor(public injector: Injector) {
    this.lng = 'en'
  }
  public checkPermission(action: ACTION) {
    return this.permission?.find(a => a.name == action)
  }
  public DONATION_CATEGORY = [
    { id: "wajiba", title: "Wajiba" },
    { id: "nafila", title: "Nafila" },
  ]
  public ACCOUNT_TYPE = [
    { id: 'wajiba', title: 'Wajiba' },
    { id: 'nafila', title: 'Nafila' },
    { id: 'both', title: 'Both' }
  ]
  public EDUCTION = [
    { id: "middle", title: "Middle" },
    { id: "matric", title: "Matric" },
    { id: "inter", title: "Inter" },
    { id: "graduation", title: "Graduation" },
    { id: "masters", title: "Masters" }
  ]
  public ISLAMIC_EDUCATION = [
    { id: "aalim", title: "Aalim" },
    { id: "hifz-e-quran", title: "Hifz-e-Quran" },
    { id: "nazra", title: "Nazra" }
  ]
  public GENDER = [
    { id: "male", title: "Male" },
    { id: "female", title: "Female" }
  ]
  public HIERARCHY = [
    { id: 'LE', title: 'Legal Entity' },
    { id: 'OU', title: 'Operating Unit' },
    { id: 'SU', title: 'Sub Unit' },
  ]
  public YES_NO = [
    { id: 'yes', title: 'Yes' },
    { id: 'no', title: 'No' }
  ]
  public VERIFY = [
    { id: 1, title: 'Un-verify' },
    { id: 2, title: 'Verify' }
  ]
  public SEARCH_BY = [
    { id: "1", name: "User ID" },
    { id: "2", name: "Acknowledgement No." },
  ]
  public PAYMODE_TYPE = [
    {id:1, title: "Cash"},
    {id:"FC", title: "FC Cash"},
    {id:2, title: "Cheque"},
    {id:3, title: "Direct"}
  ]
  public PAYMODE_TYPE_MAT = [
    ...this.PAYMODE_TYPE,
    {id: 4, title: 'Material'}
  ]
  public DONATION_MODE = [
    {id:1, title: "Cash"},
    {id:2, title: "Cheque"},
    {id:3, title: "Direct Deposit"},
    {id:4, title: "Material"}
  ]
  public REPORT_STATUS = [
    {id:"1", title: "Un-Transferred"},
    {id:"2", title: "Transferred"},
  ]
  public LEVELS = [
    {id:"5", title: "Level 5"},
    {id:"4", title: "Level 4"},
    {id:"3", title: "Level 3"},
    {id:"2", title: "Level 2"},
    {id:"1", title: "Level 1"},
  ]
  public DONATION_OPTION = [
    {
      id: 'family',
      title: 'کیا آپ اپنے گھریلو صدقہ بکس کے عطیات جمع کروانا چاہیں گے'
    },
    {
      id: 'individual',
      title: 'کیا آپ اپنی جانب سے کوئی رقم منتخب کرنا چاہیں گے'
    },
    {
      id: 'late',
      title: 'اپنے مرحوم کے ایصال ثواب کے لئے عطیات دینا چاہیں گے۔'
    }
  ]

}
