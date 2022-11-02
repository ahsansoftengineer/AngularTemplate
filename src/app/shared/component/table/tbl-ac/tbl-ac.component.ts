import { Component, Injector, OnInit } from '@angular/core';
import { Custom } from 'src/app/core/static/custom';
import { BaseControlACComponent } from '../../control/base-control-ac.component';

@Component({
  selector: 'di-tbl-ac',
  templateUrl: './tbl-ac.component.html',
  styleUrls: ['./tbl-ac.component.css']
})
export class TblACComponent extends BaseControlACComponent implements OnInit {
  override ngOnInit(): void {
    super.ngOnInit();
    this.searchControl.valueChanges.subscribe(x => {
      if(!Custom.emptyCheck(x)){
        this.control.patchValue(null)
      }
    })
    this.param.query = {
      limit: 200,
      page: 1,
      organisation_id: this._http.org_id,
      system_id: this._http.sys_id,
    }

  }
  setFormValue(item: {id: string, title: string}){
    this.control.patchValue(item.id)
  }
}
