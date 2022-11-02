import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { catchError } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, switchMap, throttleTime } from 'rxjs/operators';
import { SelectOption } from 'src/app/core/interface/common/select';
import { BaseControlBridgeComponent } from './base-control-w-temp-ref-var.component';

@Component({
  selector: 'di-base-control-ac',
  template: '',
})
//Dropdown
export class BaseControlACComponent extends BaseControlBridgeComponent implements OnInit {
  @Input() length = 3
  @Input() oneTimeLoad: boolean;
  searching: boolean;
  searchControl: FormControl = new FormControl()
  temp: SelectOption[];
  listForTemp = []
  totalRecords: number;
  // ACDepcurrentValue = '';
  override ngOnInit(): void {
    super.ngOnInit();
    if(this.parentFC) this.loadByParentFormControl()
    else if (this.load) this._AutoCompleteSubscription()
    else if (this.prelist){
      this.list = [...this.prelist];
    }
  }
  _AutoCompleteSubscription() {
    const subs = this.searchControl.valueChanges.pipe(
      debounceTime(450),
      distinctUntilChanged(),
      filter((val) => val?.length > this.length),
      // Stop mean while new request arrives
      // switchMap((val) => {

      // })
    ).subscribe(val => {

      let filteredRecord: SelectOption[];
      this.param.query.limit = 200;
      // Here needs working for Special Character to use
      const str = val.replace(/[^A-Za-z0-9(),-_.,]/ig, " ")
      const regex = new RegExp(`/*${str}/*`, 'ig');
      if (this.listForTemp?.length) {
        filteredRecord = this.listForTemp.filter(
          (res) => res.title.search(regex) != -1
        );
      }
      // Continue
      if (filteredRecord?.length) {
        this.temp = [...filteredRecord];
      } else {
        //#region
          this.param.query = {
            // ...this.defaultParam.query,
            ...this.param.query,
            title: val,
            organisation_id: this._http.org_id,
            system_id: this._http.sys_id,
          }
          if(this.parent_id) {
            this.param.query[this.key_parent_id] = this.parent_id
          }
          // this.param.query = {
          //   ...this.defaultParam.query,
          //   ...this.param.query
          // }
        //#endregion
        this._http.gets({...this.mergeParam(this.param)})
        .pipe(
          catchError(() => this.temp = []),
          map(
            (res) => {
            this.totalRecords = res.data.totalRecords;
            this.listForTemp = res.data.records;
            this.temp =  [...this.listForTemp];
          }),
        ).subscribe()
      }
    })
    this.subscriptionArray.push(subs)
  }
  loadByParentFormControl() {
    this._AutoCompleteSubscription();
    const subs = this.parentFC.valueChanges?.
      pipe(throttleTime(250))?.subscribe(val => {
        this.parent_id = val
          if(this.parentFC.dirty){
            this.control.patchValue('')
            this.group?.get(this.key_select)?.patchValue(null)
            this.temp = []
            this.list = []
            this.listForTemp = []
            this.totalRecords = 0
          }

      })
    this.subscriptionArray.push(subs)
  }

}
