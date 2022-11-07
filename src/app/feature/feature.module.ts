import { NgModule } from '@angular/core';

import { FeatureRoutingModule } from './feature-routing.module';
import { FeatureComponent } from './feature.component';
import { AngularzModule } from '../shared/modules/angularz.module';
import { MatzModule } from '../shared/modules/matz.module';

@NgModule({
  declarations: [
    FeatureComponent
  ],
  imports: [
    FeatureRoutingModule,
    AngularzModule,
    MatzModule
  ],
})
export class FeatureModule {}
