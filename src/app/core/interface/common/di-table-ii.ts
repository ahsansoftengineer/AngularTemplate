import { HttpErrorResponse } from "@angular/common/http";
import { FormArray, FormGroup } from "@angular/forms";
import { PageEvent } from "@angular/material/paginator";
import { Sort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { HttpServiceParam } from "./http-service-param";
import { ServerMultipleResponse } from "./server-multiple-response";

export interface DI_Table_II {
  FuncTableBuilder:  (dt: DI_Table_II) => void;
  param: HttpServiceParam;
  defaultParam: HttpServiceParam;
  f?: FormGroup; // External Form
  fh: FormGroup; // FormHead Searching Functionaility
  fa?: FormArray; // FormArray
  dataSource: MatTableDataSource<any>;
  settingProvide?: SettingProvide; // Must Provide
  settingConst?: SettingConstant;
  settingDefault?: SettingDefault;
  settingChanged: SettingChanged
  ActionSetDataSource: (dt: DI_Table_II) => void;

  ActionSortPre?: (dt: DI_Table_II, sort: Sort) => void;
  ActionSort?: (dt: DI_Table_II, sort: Sort) => void; // Default is Required
  ActionSortAfter?: (dt: DI_Table_II, sort: Sort) => void;

  ActionPaginatePre?: (dt: DI_Table_II, event: PageEvent) => void;
  ActionPaginate?: (dt: DI_Table_II, event: PageEvent) => PageEvent; // Default is Required
  ActionPaginateAfter?: (dt: DI_Table_II, event: PageEvent) => void;

  ActionRestPre?: (dt: DI_Table_II) => void;
  ActionRest?: (dt: DI_Table_II) => void; // Default is Required
  ActionRestAfter?: (dt: DI_Table_II) => void;

  ActionParamPre?: (dt:  DI_Table_II) => void;
  ActionParam?: (dt:  DI_Table_II) => void; // Default is Required
  ActionParamAfter?: (dt:  DI_Table_II) => void;


  ActionHttpRequest?: (dt:  DI_Table_II) => void; // Default is Required
  ActionHttpNext?: (dt:  DI_Table_II, res: ServerMultipleResponse) => void;
  ActionHttpError?: (dt:  DI_Table_II, error: HttpErrorResponse) => void;
  ActionHttpComplete?: (dt:  DI_Table_II) => void;
  // Sort Out Later
  ActionSubmitPre?: (dt: DI_Table_II) => void;
  ActionSubmit?: (dt: DI_Table_II) => void;
  ActionSubmitAfter?: (dt: DI_Table_II) => void;
}
export interface SettingChanged{
  size: number;
  orderBy: string;
  orderType: string;
  index: number;
  prevIndex: number;
}
export interface SettingConstant {
  sizes: number[];
}
export interface SettingProvide{
  columns: string[];
  length: number, // Received from User
}
export interface SettingDefault {
  size: number;
  orderBy: string;
  orderType: string;
  index: number;
  prevIndex: number;
}

