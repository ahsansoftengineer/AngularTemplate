import { NgModule } from '@angular/core';
import { NGX_NGB_Other_Module } from '../../modules/ngx-ngb-other.module';
import { TblACComponent } from './tbl-ac/tbl-ac.component';
import { TblDDComponent } from './tbl-dd/tbl-dd.component';
import { TblTxtComponent } from './tbl-txt/tbl-txt.component';
import { DiPaginatorComponent } from './di-paginator/di-paginator.component';
import { TblDateComponent } from './tbl-date/tbl-date.component';
import { MatzModule } from '../../modules/matz.module';
import { AngularzModule } from '../../modules/angularz.module';

const control = [
  TblACComponent,
  TblDDComponent,
  TblTxtComponent,
  DiPaginatorComponent,
  TblDateComponent
];
@NgModule({
  declarations: [control],
  imports: [AngularzModule, MatzModule, NGX_NGB_Other_Module],
  exports: [control],
})
export class TableModule {}
