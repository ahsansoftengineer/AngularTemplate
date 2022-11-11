import {
  animate,
  keyframes,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component } from '@angular/core';
import { Toast, ToastPackage, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-ngx-toastr-error',
  styleUrls: ['./ngx-toastr-error.component.css'],
  templateUrl: './ngx-toastr-error.component.html',
  animations: [
    trigger('flyInOut', [
      state(
        'inactive',
        style({
          opacity: 0,
        })
      ),
      transition(
        'inactive => active',
        animate(
          '400ms ease-out',
          keyframes([
            style({
              transform: 'translate3d(100%, 0, 0) skewX(-30deg)',
              opacity: 0,
            }),
            style({
              transform: 'skewX(20deg)',
              opacity: 1,
            }),
            style({
              transform: 'skewX(-5deg)',
              opacity: 1,
            }),
            style({
              transform: 'none',
              opacity: 1,
            }),
          ])
        )
      ),
      transition(
        'active => removed',
        animate(
          '400ms ease-out',
          keyframes([
            style({
              opacity: 1,
            }),
            style({
              transform: 'translate3d(100%, 0, 0) skewX(30deg)',
              opacity: 0,
            }),
          ])
        )
      ),
    ]),
  ],
  preserveWhitespaces: false,
})
// Not in Use
export class NgxToastrErrorComponent extends Toast {
  // used for demo purposes
  undoString = 'undo';

  // constructor is only necessary when not using AoT
  constructor(
    protected override toastrService: ToastrService,
    public override toastPackage: ToastPackage
  ) {
    super(toastrService, toastPackage);
  }
  action(event: Event) {
    event.stopPropagation();
    this.undoString = 'undid';
    this.toastPackage.triggerAction();
    return false;
  }
}
// Utilization in Components
// Forget it for Now
// private lastInserted: number[] = [];
// openPinkToast() {
//   // (click)="openPinkToast()
//   this.options.autoDismiss = true;
//   this.options.closeButton = true;
//   this.options.progressBar = true;
//   const opt = cloneDeep(this.options);
//   opt.toastComponent = NgxToastrErrorComponent;
//   opt.toastClass = 'pinktoast';
//   // const { message, title } = this.getMessage();
//   const inserted = this.toastr.show('Message', 'title');
//   if (inserted && inserted.toastId) {
//     this.lastInserted.push(inserted.toastId);
//   }
//   return inserted;
// }
// imports

//   import { cloneDeep, random } from 'lodash-es';
// import { NgxToastrErrorComponent } from '../components/ngx-toastr-error/ngx-toastr-error.component';
