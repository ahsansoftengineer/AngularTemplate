import { NgModule } from '@angular/core';
import { DirectiveModule } from '../../directives/directive.module';
import { AngularzModule } from '../../modules/angularz.module';
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
    AngularzModule,
    MatzModule,
    ControlModule,
    NGX_NGB_Other_Module,
    ControlModule,
    DirectiveModule
  ],
  exports:[
    CommonComponents,
  ]
})
export class FiltersModule { }
