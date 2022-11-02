import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormHelperService } from 'src/app/core/service/form-helper.service';

@Component({
  selector: 'di-form-action',
  templateUrl: './di-form-actions.component.html',
  styleUrls: ['./di-form-actions.component.css'],
})
export class DiFormActionsComponent implements OnInit {
  @Output() handleSave: EventEmitter<any> = new EventEmitter<any>();
  @Output() handleCancel: EventEmitter<any> = new EventEmitter<any>();

  constructor(public _fhs: FormHelperService) {}

  ngOnInit(): void {}
  hndlSave(event) {
    this.handleSave.emit(event);
  }
  hndlCancel(event) {
    this.handleCancel.emit(event);
  }
}
