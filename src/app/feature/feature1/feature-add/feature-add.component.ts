import { Component, Injector, OnInit } from '@angular/core';
import { BaseForm } from 'src/app/core/class/base.form';

@Component({
  selector: 'aam-feature-add',
  templateUrl: './feature-add.component.html',
  styleUrls: ['./feature-add.component.scss'],
})
export class FeatureAddComponent extends BaseForm implements OnInit {
  constructor(injector: Injector) {
    super(injector);
    // this.param.endpoint = URLz.DEFAULT;
  }
  ngOnInit() {
    this.initForm();
    this._activeId = this._fhs._getURLParam('id');
    this.patchData();
  }
  initForm() {
    this._fs._form = this._fb.group({
      title: [
        '',
        this._vs._val('', {
          minChar: 4,
          maxChar: 100,
          alpha: 1,
        }),
      ],
    });
  }
  patchData() {
    if (this._activeId != null && Number(this._activeId) > 0) {
      this._http
        .get({ ...this.param, resource: this._activeId })
        .subscribe((res: any) => {
          const data = res.data.row;
          this._fs._form.patchValue({
            title: data.title,
          });
        });
    }
  }
}
