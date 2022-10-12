import { NgModule } from '@angular/core';
import { NGX_NGB_Other_Module } from '../../modules/ngx-ngb-other.module';
import { ControlModule } from '../control/control.module';
import { ImgViewComponent } from './img-view/img-view.component';
import { NgxToastrErrorComponent } from './ngx-toastr-error/ngx-toastr-error.component';
import { TablePurposeComponent } from './table-purpose/table-purpose.component';
import { TransactionDetailComponent } from './transaction-detail/transaction-detail.component';
import { TableModule } from '../table/table.module';
import { MatzModule } from '../../modules/matz.module';

const Dialogs = [
  ImgViewComponent,
  TransactionDetailComponent,
  TablePurposeComponent,
  NgxToastrErrorComponent,
];
@NgModule({
  declarations: [
    Dialogs,
  ],
  imports: [
    MatzModule,
    NGX_NGB_Other_Module,
    ControlModule,
    TableModule
  ],
  exports:[
    Dialogs,
  ]
})
export class DialogsModule { }
