import { Injector } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { MatDialogConfig } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BaseJoinAction } from '../base-join-actions';
import { of, Observable } from 'rxjs'
import { HttpServiceParam } from '../../interface/common/http-service-param';
import { ServerMultipleResponse } from '../../interface/common/server-multiple-response';
import { Server_Errors } from '../../interface/common/errors';

// List Builder
// @Injectable()
export class LB extends BaseJoinAction {
  query = Object.assign({}) // Any Query Parameter that wants to be attached
  _path: string;
  // Table Properties
  ds = new MatTableDataSource([]);// Data Source
  tbl: TableSettings = Object.assign({}); // Table
  fh: FormGroup = new FormGroup({}) // Form Header
  ff: FormGroup = new FormGroup({}) // Form Filter
  // Not Figured out how to use
  fa: FormArray = this._fb.array([]) // Form Body of Table
  constructor(
    injector: Injector,
    override param: HttpServiceParam,
    public cols: string[]
  ) {
    super(injector)
  }
  init() {
    this.resetProperties();
    this.fhCreator();
    this.refresh();
    return this
  }
  reset = () => {
    this.tbl =
    {
      length: 0,
      index: 0,
      prevIndex: 0,
      size: 10,
      sizes: [5, 10, 20],
      orderBy: '',
      orderType: ''
    }
    this.fh.reset();
    this.fa.reset();
  }
  fresh = () => {
    this._vs._toastr.clear();
    this.param.query = {
      ...this.fh?.value,
      ...this.ff?.value,
      ...this.query,
      limit: this.tbl?.size,
      page: (this.tbl.index + 1),
      order_by: this.tbl?.orderBy,
      order_type: this.tbl?.orderType
    }
    this.hitApi()
  }
  refresh = () => {
    this.reset();
    this.fresh();
  }
  sort = (sort: Sort) => {
    this.tbl.orderBy = sort.active
    this.tbl.orderType = sort.direction
    this.fresh();
  }
  paginate = (event: PageEvent): PageEvent => {
    this.tbl.index = event.pageIndex;
    this.tbl.length = event.length;
    this.tbl.size = event.pageSize;
    // this.tbl.prevIndex = event.previousPageIndex;
    this.fresh();
    return event;
  }
  hitApi = (
    next = this.next,
    error = this.error,
    complete = this.complete,
    beforeHit = this.beforeHit) => {
    beforeHit().subscribe({
      next: () => {
        this._http.gets(this.param).subscribe({ next, error, complete });
      }
    })
  }
  beforeHit = (): Observable<LB> => {
    return of(this)
  }
  next = (res: ServerMultipleResponse) => {
    this.ds.data = res.data.records as any;
    this.tbl.length = res.data.totalRecords;
  }
  error = (err: Server_Errors) => { /* console.log(err) */ }
  complete = () => { /* console.log('Complete Called') */ }
  fhCreator() {
    this.cols.forEach(control => {
      this.fh.addControl(control, new FormControl(''))
    })
  }
  _switch(id: any) {
    if (id) this._router.navigate([this._path, { id }]);
    else this._router.navigate([this._path]);
  }
  status = (param: HttpServiceParam) => {
    if (!param.endpoint) param.endpoint = this.param.endpoint;
    this._swl.status(
      param,
      () => { this.fresh() })
  }
  // may be not required
  openImage(data: any, title: any) {
    const config: MatDialogConfig = {
      panelClass: "dialog-responsive",
      data: { source: data, title }
    }
    // const dialogRef = this._dialog.open(ImgViewComponent, config);
    // dialogRef.afterClosed().subscribe();
  }
}
export interface TableSettings {
  length: number;
  index: number;
  prevIndex: number;
  size: number;
  sizes: number[];
  orderBy?: string;
  orderType?: string;
}
