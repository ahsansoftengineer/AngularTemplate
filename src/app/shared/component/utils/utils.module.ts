import { NgModule } from '@angular/core';
import { NGX_NGB_Other_Module } from '../../modules/ngx-ngb-other.module';
import { LoaderComponent } from './loader/loader.component';
import { DiBtnComponent } from './di-btn/di-btn.component';
import { DiFormActionsComponent } from './di-form-actions/di-form-actions.component';
import { AngularzModule } from '../../modules/angularz.module';
import { MatzModule } from '../../modules/matz.module';

const Utils = [LoaderComponent, DiBtnComponent, DiFormActionsComponent];

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
