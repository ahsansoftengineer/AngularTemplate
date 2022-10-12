import { NgModule } from '@angular/core';
import { ControlModule } from './control/control.module';
import { DialogsModule } from './dialogs/dialogs.module';
import { FiltersModule } from './filters/filters.module';
import { TableModule } from './table/table.module';
import { UtilsModule } from './utils/utils.module';

const CommonModulez = [
  ControlModule,
  DialogsModule,
  FiltersModule,
  UtilsModule,
  TableModule
]
@NgModule({
  declarations: [
  ],
  imports: [
    CommonModulez
  ],
  exports:[
    CommonModulez
  ]
})
export class ComponentModule { }
