// import { HttpErrorResponse } from "@angular/common/http";
// import { FormControl } from "@angular/forms";
// import { PageEvent } from "@angular/material/paginator";
// import { Sort } from "@angular/material/sort";
// import { Observable, of } from "rxjs";
// export function TableDecorator(options?: TableConfig) {
//   return (
//     target: any,
//     propertyKey
//   ) => {
//     target[propertyKey] = {}
//     const config: Partial<TableClass> = {
//       // ff: new FormGroup({}), // Form Filter
//       // fa: new FormArray([]),
//       reset: () => {
//         target[propertyKey].tbl =
//         {
//           length: 0,
//           index: 0,
//           prevIndex: 0,
//           size: 10,
//           sizes: [5, 10, 20],
//           orderBy: null,
//           orderType: null
//         }
//         target[propertyKey]?.fh?.refresh()
//       },
//       fresh: () => {
//         target[propertyKey].param.query = {
//           ...target[propertyKey].fh?.value,
//           ...target[propertyKey].ff?.value,
//           ...target[propertyKey].query,
//           limit: target[propertyKey].tbl?.size,
//           page: (target[propertyKey].tbl.index + 1),
//           order_by: target[propertyKey].tbl?.orderBy,
//           order_type: target[propertyKey].tbl?.orderType
//         }
//         target[propertyKey].hitApi()
//       },
//       refresh: () => {
//         target[propertyKey].reset();
//         target[propertyKey].fresh();
//       },
//       sort: (sort: Sort) => {
//         target[propertyKey].tbl.orderBy = sort.active
//         target[propertyKey].tbl.orderType = sort.direction
//         target[propertyKey].fresh();
//       },
//       paginate: (event?: PageEvent): PageEvent => {
//         target[propertyKey].tbl.index = event.pageIndex;
//         target[propertyKey].tbl.length = event.length;
//         target[propertyKey].tbl.size = event.pageSize;
//         target[propertyKey].tbl.prevIndex = event.previousPageIndex;
//         target[propertyKey].fresh();
//         return event;
//       },
//       hitApi: (
//         next = target[propertyKey].next,
//         error: (error: HttpErrorResponse) => void,
//         complete: () => void,
//         beforeHit = target[propertyKey].beforeHit) => {
//         beforeHit().subscribe({
//           next: () => {
//             target[propertyKey]._http.gets(target[propertyKey].param).subscribe({ next, error, complete })
//           },
//           error,
//           complete
//         })
//       },
//       beforeHit: (): Observable<any> => {
//         return of(target[propertyKey])
//       },
//       next: (res: ServerMultipleResponse) => {
//         target[propertyKey].ds.data = res.data.records;
//         target[propertyKey].tbl.length = res.data.totalRecords;
//       },
//       _switch: (id) => {
//         if (id) target._router.navigate([target._path, { id }]);
//         else target._router.navigate([target._path]);
//       },
//       status: (param: HttpServiceParam) => {
//         if (!param.endpoint) param.endpoint = target[propertyKey].param.endpoint;
//         target[propertyKey]._swl.status(
//           param,
//           () => { target[propertyKey].fresh() })
//       },
//       fhCreator: () => {
//         this[propertyKey]?.cols?.forEach(columnName => {
//           this[propertyKey].fh.addControl(columnName, new FormControl(''))
//         })
//       }
//     }
//     // overwrite any keys passed in to our decorator in the config object
//     if (options) {
//       Object.keys(options).forEach(x => {
//         config[x] = {
//           value: () => options[x],
//           enumerable: true,
//           writable: true,
//           configurable: true
//         }
//       });
//     }
//     Object?.keys(config)?.forEach(x => {
//       Object?.defineProperty(target[propertyKey], x, {
//         value: config[x],
//         enumerable: true,
//         writable: true,
//         configurable: true
//       })
//     });
//     target[propertyKey].reset()
//     // target[propertyKey].fhCreator()
//     if (target._ss.checkPermission(ACTION.STATUS)) {
//       target[propertyKey].cols.splice(2, 0, 'activate')
//     }
//     return target;
//   };
// }
