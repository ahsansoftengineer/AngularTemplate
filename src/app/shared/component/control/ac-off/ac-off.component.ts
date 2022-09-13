import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { SelectOption } from 'src/app/interface/common/select';
import { BaseControlSubscriptionComponent } from '../base-control-x-subscription.component';
import { CONTROL_HOST_CSS_CLASS } from '../base-control-z.component';

@Component({
  selector: 'di-ac-off',
  templateUrl: './ac-off.component.html',
  styleUrls: ['./ac-off.component.css'],
  host: { class: CONTROL_HOST_CSS_CLASS },
})
export class AcOffComponent extends BaseControlSubscriptionComponent implements OnInit {
  searchControl: FormControl = new FormControl();
  temp: SelectOption[] = []
  @Input() oneTimeLoad: boolean;
  search  = '';
  offset = 0;
  limit = 10;
  ngOnInit() {
    super.ngOnInit();
    if(this.load) this.getDataFirstTime();
    else if (!this.load && this.parentFC) {
      this.loadByParentFormControl()
    }
    if(this.both){
      this.loadByParentFormControl()
    }
    this._AutoCompleteSubscription();
  }
  getDataFirstTime(){
    this._http.select(this.mergeParam(this.param))
    .subscribe(res => {
      this.offset = 0
      const data = res.data.records;
      this.list = data;
      this.temp = []
      let hasCurrentValue = false
      this.list.forEach(val => {
        if(val.id == this.control.value) hasCurrentValue = true
      })
      if(this.list.length == 1) this.control.patchValue(this.list[0].id)
      else if(!hasCurrentValue) this.control.patchValue('');
      this.getNextBatch();
    })
  }
  getNextBatch(): void {
    const results = this.list.slice(this.offset, this.offset + this.limit);
    this.temp = [
      ...this.temp,
      ...results
    ]
    const ids = this.temp.map(o => o.id)
    this.temp = this.temp.filter(({id}, index) => !ids.includes(id, index + 1))
    this.offset += this.limit;
  }
  _AutoCompleteSubscription() {
    const subs = this.searchControl.valueChanges.pipe(
      debounceTime(10),
      distinctUntilChanged()
    ).subscribe(val => {
      this.offset = 0
      this.search = val;
      let filteredRecord: SelectOption[];
      if(this.searchControl.value){
        this.control.patchValue('')
      }
      // Here needs working for Special Character to use
      const str = val.replace(/[^A-Za-z0-9(),-_.,]/ig, " ")
      const regex = new RegExp(`/*${str}/*`, 'ig');
      if (this.list?.length) {
        filteredRecord = this.list.filter(
          (res) => res.title.search(regex) != -1
        )
      }
      if (filteredRecord?.length && val != '') {
        this.temp = filteredRecord.slice(this.offset, this.offset + this.limit);
      } else if (!val && this.control.value){
          this.offset = 0
          this.getNextBatch()
          // this.temp = [...this.list]
        // this empty conditiona is required
      } else {
        this.getNextBatch();
        // this.temp = []
      }

    })
    this.subscriptionArray.push(subs);
  }
  // For Form Control Parent
  loadByParentFormControl() {
    const subscription = this.parentFC?.valueChanges?.pipe(
      debounceTime(50) // For Param Object to be Set
    ).subscribe(val => {
      if (this.emptyCheck(val) && !this.stopHit){
        this.param = {
          ...this.param,
          query: {
            ...this.param.query,
          }
        }
        this.param.query[this.key_parent_id] = val;
        this.offset = 0
        this.getDataFirstTime()
      }
      else {
        this.control?.patchValue('')
        this.search = ''
        this.list = [];
        this.temp = [];
        this.getNextBatch();
      }
    })
    this.subscriptionArray.push(subscription)
  }
  hasIteminTemp(): boolean{
    let result = false
    this.temp.forEach(item =>{
      if(item.id == this.control.value){
        result =  true;
      }
    })
    return result
  }
}
