import {
  Component,
  EventEmitter,
  Injector,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { StateService } from 'src/app/core/service/state.service';
import { SwalService } from 'src/app/core/service/swal.service';
import { AppInjector } from 'src/app/core/static/AppInjector';

@Component({
  selector: 'di-btn',
  templateUrl: './di-btn.component.html',
  styleUrls: ['./di-btn.component.css'],
})
export class DiBtnComponent implements OnInit {
  _swl: SwalService;
  _ss: StateService;
  @Input() type = 'submit';
  @Input() text = 'Save';
  @Output() handleAction: EventEmitter<any> = new EventEmitter<any>();
  constructor(public injector: Injector) {
    this._swl = AppInjector.get(SwalService);
    this._ss = AppInjector.get(StateService);
  }
  ngOnInit(): void {}
  hndlAction(event) {
    this.handleAction.emit(event);
  }
}
