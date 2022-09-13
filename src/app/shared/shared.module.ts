import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularzModule } from './modules/angularz.module';

import { NGX_NGB_Other_Module } from './modules/ngx-ngb-other.module';
import { PipesModule } from './pipes/pipes.module';
import { MatzModule } from './modules/matz.module';
import { DirectiveModule } from './directives/directive.module';


const CommonModules = [
  CommonModule,
  AngularzModule,
  MatzModule,
  NGX_NGB_Other_Module,
  PipesModule,
  DirectiveModule
]
@NgModule({
  imports: [ CommonModules],
  exports: [ CommonModules],
  declarations: [
  ],
})
export class SharedModule { }
