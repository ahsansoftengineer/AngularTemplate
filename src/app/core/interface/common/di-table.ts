import { FormArray, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { URLz } from '../../enums/url.enum';

export interface DI_Table {
  tableName: string;
  columns: string[];
  url: string;
  endpoint: URLz;
  query: {};
  form: FormGroup; // for Header Search
  formFilter?: FormGroup;
  formBody?: FormArray; // For Body purpose
  dataSource: MatTableDataSource<any>;
  search: {};
  length: number;
  index: number;
  prevIndex: number;
  size: number;
  sizes: number[];
  orderBy: string;
  orderType: string;
}
export declare interface DI_Tables {
  [tableName: string]: DI_Table;
}
