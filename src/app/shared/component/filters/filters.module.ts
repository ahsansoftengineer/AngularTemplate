import { NgModule } from '@angular/core';
import { DirectiveModule } from '../../directives/directive.module';
import { MatzModule } from '../../modules/matz.module';
import { NGX_NGB_Other_Module } from '../../modules/ngx-ngb-other.module';
import { ControlModule } from '../control/control.module';
import { TransactionDialogComponent } from './transaction-dialog/transaction-dialog.component';

const CommonComponents = [
  TransactionDialogComponent,
]

@NgModule({
  declarations: [
    CommonComponents,
  ],
  imports: [
    MatzModule,
    NGX_NGB_Other_Module,
    ControlModule,
    DirectiveModule
  ],
  exports:[
    CommonComponents,
  ]
})
export class FiltersModule { }
