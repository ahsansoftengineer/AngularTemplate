import { NgModule } from '@angular/core';
import { NGX_NGB_Other_Module } from '../../modules/ngx-ngb-other.module';
import { AcComponent } from './ac/ac.component';
import { CellComponent } from './cell/cell.component';
import { CurrencyComponent } from './currency/currency.component';
import { DateComponent } from './date/date.component';
import { DdComponent } from './dd/dd.component';
import { DddComponent } from './ddd/ddd.component';
import { ImageComponent } from './image/image.component';
import { TxtComponent } from './txt/txt.component';
import { FileUploaderComponent } from './file-uploader/file-uploader.component';
import { PipesModule } from '../../pipes/pipes.module';
import { AcOffComponent } from './ac-off/ac-off.component';
import { MultiAcComponent } from './multi-ac/multi-ac.component';
import { DdMultiComponent } from './dd-multi/dd-multi.component';
import { DdMultiIiComponent } from './dd-multi-ii/dd-multi-ii.component';
import { MatzModule } from '../../modules/matz.module';


const CommonFields = [
  TxtComponent,
  DdComponent,
  DddComponent,
  AcComponent,
  MultiAcComponent,
  CellComponent,
  CurrencyComponent,
  DateComponent,
  ImageComponent,
  FileUploaderComponent,
  AcOffComponent,
  DdMultiComponent,
  DdMultiIiComponent,
]
@NgModule({
  declarations: [
    CommonFields,
  ],
  imports: [
    MatzModule,
    NGX_NGB_Other_Module,
    PipesModule
  ],
  exports:[
    CommonFields,
  ]
})
export class ControlModule { }
