import { Component, OnInit } from '@angular/core';
import { SelectOption } from 'src/app/core/interface/common/select';
import { BaseControlACComponent } from '../base-control-ac.component';
import { CONTROL_HOST_CSS_CLASS } from '../base-control-z.component';

@Component({
  selector: 'di-ac',
  templateUrl: './ac.component.html',
  styleUrls: ['./ac.component.css'],
  host: { class: CONTROL_HOST_CSS_CLASS },
  // For ngOnChanges
  // inputs:['search', 'updateValidity']
})
// AutoComplete
export class AcComponent extends BaseControlACComponent implements OnInit  {
  override ngOnInit(): void {
    if(!this.preobj){
      this.param.query = {
        limit: 10,
        page: 1,
        organisation_id: this._http.org_id,
        system_id: this._http.sys_id,
      }
      this.param.query[this.key_parent_id] = this.parent_id;
    }

    super.ngOnInit();
    if (this.oneTimeLoad &&
        this.load &&
        this.prelist?.length < 1 &&
        !this.preobj) {
      this.onceLoad();
    }
  }
  get itemInList(){
    if(this.preobj?.id){
      const check = (list: SelectOption[]) => {
        return list.findIndex(x => x.id == this.preobj.id) != -1
      }
      if(this.temp){
        return check(this.temp)
      }else if(this._css._ddOneTimeLoad[this.field]){
        return check(this._css._ddOneTimeLoad[this.field])
      }
    }
    return false;
  }

}
