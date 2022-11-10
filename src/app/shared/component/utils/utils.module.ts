import { NgModule } from '@angular/core';
import { NGX_NGB_Other_Module } from '../../modules/ngx-ngb-other.module';
import { LoaderComponent } from './loader/loader.component';
import { AngularzModule } from '../../modules/angularz.module';
import { MatzModule } from '../../modules/matz.module';
import { FormActionComponent } from './form-action/form-action.component';

const Utils = [
  LoaderComponent, 
  FormActionComponent
  ];

@NgModule({
  declarations: Utils,
  imports: [
    AngularzModule,
    MatzModule,
    // RootzModule,
    NGX_NGB_Other_Module,
  ],
  exports: [Utils],
})
export class UtilsModule {}
